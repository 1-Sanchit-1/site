---
title: "5 · Attention: The Architecture Side"
description: "MHA, MQA, GQA, MLA, sliding windows, attention sinks, hybrids, and KV cache model-selection math."
lastUpdated: true
prev:
  text: "← 4 · Batching & scheduling"
  link: "/Learning/Inference Optimization/04-batching-scheduling"
next:
  text: "6 · Attention kernels →"
  link: "/Learning/Inference Optimization/06-attention-kernels"
---

# 🧠 Chapter 5 — Attention: The Architecture Side

*Episodes 22 – 24*

## 1. One number explains MHA, MQA, GQA and MLA

Write out decode attention's FLOPs ÷ bytes and almost everything cancels: layers, sequence length, batch size, head size. What's left:

::: tip ⭐ The group size G
```
Decode attention arithmetic intensity ≈ G = query_heads / kv_heads
```
FP8 KV cache halves the bytes, so **2 × G**.
:::

```mermaid
flowchart TB
    subgraph MHA["MHA · G = 1"]
      direction LR
      q1((Q)) --- k1[KV]
      q2((Q)) --- k2[KV]
      q3((Q)) --- k3[KV]
      q4((Q)) --- k4[KV]
    end
    subgraph GQA["GQA · G = 2 here (Llama: 8)"]
      direction LR
      g1((Q)) --- gk1[KV]
      g2((Q)) --- gk1
      g3((Q)) --- gk2[KV]
      g4((Q)) --- gk2
    end
    subgraph MQA["MQA · G = all heads"]
      direction LR
      m1((Q)) --- mk[KV]
      m2((Q)) --- mk
      m3((Q)) --- mk
      m4((Q)) --- mk
    end
    subgraph MLA["MLA · cache a latent, rebuild K/V"]
      direction LR
      l1((Q)) --- lat["latent<br/>512 + 64 RoPE"]
      l2((Q)) --- lat
      l3((Q)) --- lat
      l4((Q)) --- lat
    end
```

| Variant | Year / lab | Idea | Result | Catch |
| --- | --- | --- | --- | --- |
| **MHA** | original | each head has its own K,V | G=1 → AI≈1 | huge cache (70B: 2.5 MB/token) |
| **MQA** | 2019 · Shazeer | **1** KV head for all queries | decoder 46 → **3.8 µs/token (12×)**, BLEU ≈ unchanged | **training instability**, worse on long-input fine-tunes |
| **GQA** | 2023 · Google | groups of queries share a KV head | T5-XXL 1.5 s → < 0.3 s (**−81%**), quality within noise | needs **uptraining: 5%** of pretrain steps (mean-pool the KV heads in each group) |
| **MLA** | DeepSeek V2/V3 | cache one compressed latent per token | KV **−93%**, peak gen throughput **~5.8×** vs their own GQA-67B; quality *stronger* than MHA | extra math; one latent → duplicated across TP cards |

### 🤔 Why does Llama 3 have 8 KV heads at every size?

```mermaid
flowchart LR
    A["One server box = 8 GPUs<br/>on fast NVLink"] --> B["Tensor parallel = 8"]
    B --> C["KV heads split across cards"]
    C --> D{"KV heads?"}
    D -->|"1 (MQA)"| E["Must be COPIED to all 8 cards<br/>→ saving evaporates"]
    D -->|"8 (GQA)"| F["Exactly 1 per card<br/>→ zero duplication ✅"]
```

Query heads go 32 → 64 → 128 (8B → 70B → 405B), while KV heads stay **8**. That 8 reflects **the deployment**, not the model. (Meta never says this outright; the GQA paper makes the duplication argument.)

### 🧩 MLA's absorb trick

```mermaid
flowchart TB
    subgraph NAIVE["❌ Naive: unpack every cached latent, every step"]
      direction LR
      n1["latent × W_up<br/>× 100K tokens"] --> n2["K"] --> n3["q · K"]
    end
    subgraph ABS["✅ Absorbed: fold W_up into W_q once, offline"]
      direction LR
      a1["W_q · W_up_K<br/>(precomputed)"] --> a2["q' reads latent directly"]
      a3["W_up_V folded into W_o"] --> a4["weight-sum latents, then unpack once"]
    end
```

Matrix multiplication is **associative**, so fold the up-projection onto the **one** query instead of the **100K** cached latents. Decode traffic then looks like MQA while the model keeps MHA's capacity. vLLM uses both paths: **compute-friendly** for prefill, **data-movement-friendly** (absorbed) for decode.

### 📊 Where each variant lands on an H100 (decode, FP16)

```mermaid
xychart-beta
    title "Decode attention: % of H100 compute usable (ridge 295)"
    x-axis ["MHA (G=1)", "GQA 70B (G=8)", "MQA (G=64)", "MLA absorbed"]
    y-axis "% of peak" 0 --> 25
    bar [0.34, 2.7, 22, 22]
```

> After seven years, three labs and three architectures, the best one still uses only **~⅕ of the card**. To go further you have to cut **memory trips** → FlashAttention.

---

## 2. Sparse attention: the attention you don't compute

Every technique here **gives something up**, and it's never the same thing.

```mermaid
flowchart LR
    S["Sparse / approximate attention"] --> W["1️⃣ Sliding window<br/>don't look far back"]
    S --> L["2️⃣ Learned sparsity<br/>pick top-k tokens"]
    S --> E["3️⃣ Eviction + sinks<br/>drop tokens as you go"]
    S --> H["4️⃣ Hybrids<br/>layers with no KV cache"]
```

### 1️⃣ Sliding window attention

- Each token only attends to the last **W** tokens (Mistral: 4096). Information still travels back **one window per layer**, so 32 layers × 4096 reaches about **131K**.
- KV becomes a **rolling buffer** of W slots, so **8× less cache** at 32K. **2× faster** at 16K, with a window-aware kernel.

**The config line's history:**

```mermaid
timeline
    title "sliding_window" in model configs
    2023 Mistral v0.1 : 4096
    Mistral Instruct v0.2 : null (RoPE θ 10K → 1M solved the length problem)
    Gemma 2 : interleaved local/global layers
    Gemma 3 : 5 local : 1 global, window 1024 (KV memory is the constraint now)
```

Each change was right when it was made, because **the binding constraint kept moving**. Google: all-global layers cost about 60% KV overhead at 32K; interleaving brings it **< 15%** (measured at 3:1 local:global, so treat it as a direction, not the shipped number).

### 2️⃣ DeepSeek Sparse Attention (V3.2)

```mermaid
flowchart LR
    Q["New query"] --> IDX["⚡ Lightning indexer<br/>FP8 + ReLU · scores ALL past tokens"]
    IDX --> TOP["Select top-2048"]
    TOP --> ATT["Real (MLA) attention<br/>on 2048 tokens only"]
```

- Attention cost goes from O(L²) to O(L·k). The indexer only needs a **roughly right ranking**, hence FP8 + ReLU "for throughput."
- Costs: a second cache (**128 values/token** next to the latent's 576), and the indexer is **still O(L²)** during prefill. The quadratic term is cheaper but not gone, so speedups land below the complexity math.
- Benchmarks on par; **API prices cut > 50%** on launch day.

### 3️⃣ Eviction & attention sinks (StreamingLLM)

```mermaid
flowchart LR
    subgraph KEEP["KV cache layout"]
      direction LR
      S1["🔒 sink 0"] --- S2["🔒 1"] --- S3["🔒 2"] --- S4["🔒 3"] --- GAPX["… evicted …"] --- RW["🔄 rolling window of recent tokens"]
    end
```

- A pure rolling window **collapses** (perplexity explodes) once the first token slides out. Why? **Softmax must sum to 1**, so the model dumps unneeded attention on the **first tokens**, the only ones visible to everyone under the causal mask.
- Fix: **pin 4 sink tokens** + a rolling window. Up to **22.2×** faster per token than sliding window with recomputation.
- Those same first tokens carry **massive activations** (Llama-2-7B: max ~2000 vs median ~0.2), which matters for quantization.

::: danger ❌ Myth: "StreamingLLM gives 4M tokens of context"
Paper: *it does not extend the models' context window.* You get **infinite stable streaming**, not long-range memory. Anything 2M tokens back is **gone**.
:::

### 4️⃣ Hybrids: layers with no KV cache

Linear attention / state-space (Mamba) layers keep a **fixed-size state**, so only the attention fraction of layers grows the cache.

```mermaid
xychart-beta
    title "KV cache at 256K tokens (GB)"
    x-axis ["Jamba (1 attn : 7 Mamba)", "Mixtral", "Llama-2-70B"]
    y-axis "GB" 0 --> 130
    bar [4, 32, 128]
```

Remember the **ratio**, not the model name.

| Technique | What it gives up |
| --- | --- |
| Window | distant tokens |
| Eviction | whatever left the cache |
| Learned sparsity | trusts a score that can be wrong |
| Hybrid | no attention in most layers |

> Ask whether **your workload needs the far end**. Long-document QA or summarization → a window is the wrong tool. A long chat that mostly needs recent context → a window is nearly free.

---

## 3. 🩺 Clinic: which LLM can you actually serve?

**Setup:** 128K-token conversations, the same **30 GB** KV budget for each model, FP16, one copy.

| Model | KV/token | 1 × 128K convo | Fits in 30 GB |
| --- | --- | --- | --- |
| Llama 3.1 **8B** (32 L × 8 KV × 128) | ~131 KB | ~17 GB | **1** |
| Llama 3.1 **405B** (126 L × 8 KV × 128) | ~516 KB | ~66 GB | **0** ❌ |
| DeepSeek V3 **671B** (MLA, 512 + 64) | ~70 KB | ~9 GB | **3** ✅ |

> The **biggest** model holds the **most** conversations: 3× as many as a model **80× smaller**. You can't read KV cost off the parameter count.

**Why did your quick benchmark say all three were fine?** It used 1 request, a short prompt and a short answer. 1K tokens on Llama-8B is about **130 MB** of KV against 16 GB of weights, so the KV cache barely showed up. **Benchmark at your real operating point.**

::: tip ✅ Monday checklist
1. Open `config.json` → compute **G = heads / kv_heads** and **KV bytes/token**
2. The attention design is **fixed at training time**. Converting needs about 5% of pretraining, so choose it when you choose the model.
3. Check the **KV cache precision** (FP8 doubles G's effective value)
:::

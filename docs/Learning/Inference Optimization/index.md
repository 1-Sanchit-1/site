---
title: "Inference Optimization"
description: "Visual notes on LLM inference optimization — from first principles to production."
lastUpdated: true
---

# ⚡ **LLM Inference Optimization — Notes**

::: tip 📺 Source
Notes from the YouTube course **[Inference Optimization: From First Principles to Production](https://www.youtube.com/playlist?list=PLXV1pCewfApE)** by Mani Khanuja (*The Agentic Enterprise*). 29 episodes, covering Modules 0 – 7.
:::

> **Training is buying the car. Inference is the taxi meter** — it starts with your first user and never stops.

---

## 🧭 The whole course on one page

```mermaid
mindmap
  root((Inference<br/>Optimization))
    Module 0-1 · Vocabulary
      Request lifecycle
      Prefill vs Decode
      TTFT · ITL · TPOT · E2EL
      Throughput vs Goodput
      Latency–throughput curve
      Honest benchmarking
    Module 2 · Two walls
      Arithmetic intensity
      Ridge point
      Memory hierarchy
      KV cache sizing
      MFU vs MBU
    Module 3 · Observability
      Server metrics dashboard
      DCGM counters
      Nsight profiling
      Clock throttling
    Module 4 · Batching
      Continuous batching
      PagedAttention
      Chunked prefill
      Prefix caching
      Scheduler knobs
    Module 5 · Attention architecture
      MHA · MQA · GQA · MLA
      Sliding window · sinks
      Hybrid models
    Module 6 · Attention kernels
      FlashAttention 1
      FlashAttention 2 · 3 · 4
      Flash-Decoding
    Module 7 · Quantization
      FP16 · BF16 · FP8
      NVFP4 · MXFP4
      Block scales
```

---

## 🎛️ The two rules that hold everything together

### 1. You can optimize only **two of three**

```mermaid
flowchart LR
    L["⏱️ Latency<br/>how long a user waits"] <--> T["🚚 Throughput<br/>users served per GPU"]
    T <--> C["💰 Cost<br/>per token"]
    C <--> L
```

They're **one budget**, not three separate goals. Push latency down and you serve fewer users per GPU, so cost goes up. Pack more users in and everyone waits longer.

### 2. Every technique pulls one of **four levers**

| Lever | Examples in this course |
| --- | --- |
| 📦 **Move fewer bytes** | Quantization, GQA/MLA, KV-cache compression, FlashAttention |
| 🧮 **Do fewer calculations** | Sparse attention, sliding windows, prefix caching |
| 🤝 **Share work across requests** | Batching, continuous batching, prefix caching, copy-on-write |
| 🔀 **Overlap work** | Chunked prefill, FlashAttention 3 ping-pong, API/engine process split |

::: info 💸 Why it matters — DeepSeek's real meter (Feb 2025)
One day of production cost **$87,072**. At their list R1 pricing the same tokens would have been worth **more than 6×** that (DeepSeek themselves call this figure theoretical). Engineering closes most of that gap. Pricing doesn't.
:::

---

## 📚 Chapters

| # | Chapter | Episodes |
| --- | --- | --- |
| 0 | [🚕 Orientation & the request map](./00-orientation.md) | 00 – 01 |
| 1 | [🛣️ Request lifecycle, metrics & benchmarking](./01-lifecycle-metrics.md) | 02 – 07 |
| 2 | [🧱 The two walls: compute vs memory](./02-two-walls.md) | 08 – 13, 17 |
| 3 | [🔭 Observability: what to measure](./03-observability.md) | 14 – 16 |
| 4 | [🧺 Batching & scheduling](./04-batching-scheduling.md) | 18 – 21 |
| 5 | [🧠 Attention: the architecture side](./05-attention-architecture.md) | 22 – 24 |
| 6 | [⚙️ Attention: the kernel side](./06-attention-kernels.md) | 25 – 27 |
| 7 | [🔢 Quantization & numerics](./07-quantization.md) | 28 |

---

## 🩺 The master diagnosis tree

Start from the **symptom**, then find the cause:

```mermaid
flowchart TD
    S{"What's slow?"} -->|"First token slow"| A["Look at QUEUE + PREFILL<br/>admission, capacity, prompt length,<br/>prefix cache hit rate"]
    S -->|"Gaps between tokens"| B["Look at BANDWIDTH + BATCH SIZE<br/>MBU, KV cache, chunked-prefill budget"]
    S -->|"Both fine, bill is scary"| C["SCHEDULING + UTILIZATION<br/>batch fill, goodput, operating point"]
    S -->|"Everything dropped together"| D["🔥 HARDWARE FIRST<br/>clock throttle reason, XID, PCIe retries"]
```

::: warning 🧠 The one number the course leans on
**Arithmetic intensity** (FLOPs per byte moved) vs the GPU's **ridge point**. If you remember one idea, remember this one → [Chapter 2](./02-two-walls.md).
:::

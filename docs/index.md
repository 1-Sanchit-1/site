---
lastUpdated: true
next:
  text: "Experience →"
  link: "/Experience/index"
layout: home
---

<div class="status-bar">
  <span class="pulse"></span>
  <span class="status-text">AI infrastructure engineer</span>
  <span class="status-sep">·</span>
  <span class="status-text">LLM inference on GPU</span>
  <span class="status-sep">·</span>
  <span class="status-text">Air-gapped deployments</span>
</div>

<div class="terminal">
<div class="terminal-header">
<div class="buttons">
<span class="red"></span>
<span class="yellow"></span>
<span class="green"></span>
</div>
<div class="title">~/whoami</div>
</div>

```bash
$ whoami

Sanchit Gupta
AI Infrastructure Engineer @ Neuralix.ai
B.Tech CSE, IIIT Lucknow '25

$ cat what_i_do.txt

I keep large language models running on GPUs
that have no internet connection.

$ ./highlights.sh

• Core engineer on EKAM AI — an indigenous Defence
  AI-as-a-Service platform under the MoD iDEX ADITI 2.0
  initiative, launched at the Chanakya Defence Dialogue 2025

• Model serving on vLLM and NVIDIA Triton across GPU nodes
  — continuous batching, KV-cache sizing, request scheduling

• Instrumented telemetry, profiled hot paths, tuned async
  execution and caching → cut average API latency by 40%

• Delivery into secure air-gapped and VDI sites, where every
  package and model weight has to be carried in offline
```

</div>

<div class="terminal">
<div class="terminal-header">
<div class="buttons">
<span class="red"></span>
<span class="yellow"></span>
<span class="green"></span>
</div>
<div class="title">~/infra/request-path</div>
</div>

```bash
$ cat architecture.txt

                          ┌────────────────────────────────┐
      client  ───────────▶│   FastAPI gateway  ·  React    │
                          └────────────────┬───────────────┘
                                           │
                ┌──────────────────────────┼──────────────────────────┐
                ▼                          ▼                          ▼
       ┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
       │  vLLM           │        │  NVIDIA Triton  │        │  Qdrant         │
       │  LLMs · SLMs    │        │  OCR · VLM      │        │  vector search  │
       │  cont. batching │        │  reranking      │        │  RAG retrieval  │
       └────────┬────────┘        └────────┬────────┘        └─────────────────┘
                └────────────┬─────────────┘
                             ▼
                    ┌─────────────────┐        ┌──────────────────────────┐
                    │   NVIDIA GPU    │◀──────▶│ Prometheus · Grafana     │
                    └─────────────────┘        └──────────────────────────┘

                  ── no egress · no package mirror · no second chances ──
```

</div>

<div class="terminal">
<div class="terminal-header">
<div class="buttons">
<span class="red"></span>
<span class="yellow"></span>
<span class="green"></span>
</div>
<div class="title">~/stack</div>
</div>

```bash
$ cat stack.txt

serving      vLLM · NVIDIA Triton · Ollama · CUDA
models       LLMs · SLMs · VLMs · OCR · embedding · reranking
retrieval    Qdrant · RAG pipelines
backend      Python · FastAPI · PostgreSQL · Redis · C++
platform     Docker · Kubernetes · Linux · NGINX · Git
observe      Prometheus · Grafana · Loki · Tempo · OpenTelemetry
frontend     React · JavaScript

$ ls ~/projects

AI-inference/        self-hosted GPU platform on Kubernetes
url-shortener/       distributed, sub-100ms under load
AgroSmart/           soil and yield prediction, Django + ML
CampusConnect/       MERN admissions portal

$ echo $CONTACT

sanchitguptaghj@gmail.com
```

</div>

<style>
.status-bar{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  flex-wrap:wrap;
  max-width:900px;
  margin:50px auto 0;
  padding:10px 18px;
  border-radius:999px;
  background:var(--vp-c-bg-soft);
  border:1px solid var(--vp-c-divider);
  font-family:Menlo,Consolas,monospace;
  font-size:13px;
  color:var(--vp-c-text-2);
}

.pulse{
  width:8px;
  height:8px;
  border-radius:50%;
  background:#28c840;
  box-shadow:0 0 0 rgba(40,200,64,.6);
  animation:pulse 2s infinite;
  flex-shrink:0;
}

@keyframes pulse{
  0%{box-shadow:0 0 0 0 rgba(40,200,64,.5);}
  70%{box-shadow:0 0 0 8px rgba(40,200,64,0);}
  100%{box-shadow:0 0 0 0 rgba(40,200,64,0);}
}

.status-sep{opacity:.4;}

.terminal{
margin:24px auto;
max-width:900px;
background:#0d1117;
border-radius:14px;
overflow:hidden;
border:1px solid rgba(255,255,255,.08);
box-shadow:0 30px 60px rgba(0,0,0,.35);
}

.terminal:last-of-type{
margin-bottom:70px;
}

.terminal-header{
display:flex;
align-items:center;
justify-content:space-between;
padding:14px 20px;
background:#161b22;
border-bottom:1px solid #30363d;
}

.buttons{
display:flex;
gap:8px;
}

.buttons span{
width:12px;
height:12px;
border-radius:50%;
display:block;
}

.red{background:#ff5f57;}
.yellow{background:#febc2e;}
.green{background:#28c840;}

.title{
color:#8b949e;
font-size:14px;
font-family:monospace;
}

.terminal pre{
margin:0;
padding:28px;
font-size:15px;
line-height:1.9;
color:#d2d8df;
overflow:auto;
font-family:Menlo,Consolas,monospace;
}

</style>
---
lastUpdated: true

prev:
  text: "← Back to Home"
  link: "/index"

next:
  text: "Skills →"
  link: "/Skills/index"
---

# 💼 Experience

---

## AI Infrastructure & Full-Stack Engineer — Neuralix.ai

**April 2025 – Present** · Delhi, India · On-site

::: info 🛡️ EKAM AI
An indigenous **Defence AI-as-a-Service** platform, built under the Ministry of Defence
**iDEX ADITI 2.0** initiative and launched nationally at the **Chanakya Defence Dialogue 2025**.
It runs inside secure air-gapped sites, so every package, model weight and upgrade has to be
carried in offline.
:::

### What I own

**Model serving**
Production inference on **vLLM** and **NVIDIA Triton Inference Server** across GPU nodes, serving
LLMs, SLMs, VLMs, OCR, embedding and reranking models. Tuning continuous batching, KV-cache sizing
and request scheduling so a fixed number of GPUs serves more users at lower latency.

**Model lifecycle**
Benchmarking candidate open-source models on latency, cost and task accuracy, validating their
outputs, then promoting them from evaluation through staging into production serving.

**Air-gapped delivery**
Offline package mirrors, model-weight distribution, dependency resolution, version upgrades and
on-site incident support with no external network path. Standalone desktop distributions and VDI
deployments for restricted sites.

**Application layer**
The platform's backend in **Python** and **FastAPI**, with **React** interfaces, **PostgreSQL**,
**Redis** and **NGINX** behind AI-powered document and retrieval workflows.

**Reliability**
Telemetry with **Prometheus** and **Grafana**, profiling application hot paths, then tuning async
execution, caching and database access — cutting average API response latency by **40%**.

**GPU coordination**
Primary interface between the AI platform team and the GPU hardware and infrastructure teams,
running root-cause analysis across application, CUDA driver, network and hardware layers.

**Documentation**
The SOPs, runbooks and architecture documents used for on-site deployment, troubleshooting and
knowledge transfer at client sites.

---

::: tip 🧰 Stack
`Python` · `FastAPI` · `React` · `vLLM` · `NVIDIA Triton` · `CUDA` · `Docker` · `Kubernetes` ·
`Linux` · `PostgreSQL` · `Redis` · `NGINX` · `Prometheus` · `Grafana` · `Qdrant`
:::

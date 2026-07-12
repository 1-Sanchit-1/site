---
lastUpdated: true
next:
  text: "Experience →"
  link: "/Experience/index"
layout: home
---

<div class="status-bar">
  <span class="pulse"></span>
  <span class="status-text">All systems operational</span>
  <span class="status-sep">·</span>
  <span class="status-text">99.9% uptime, last 90 days</span>
  <span class="status-sep">·</span>
  <span class="status-text">Production since 2023</span>
</div>

<div class="terminal">
<div class="terminal-header">
<div class="buttons">
<span class="red"></span>
<span class="yellow"></span>
<span class="green"></span>
</div>
<div class="title">~/production</div>
</div>

```bash
$ whoami

Sanchit Gupta
Software Engineer — AI Infrastructure & Backend Systems

$ ./deploy_history.sh --last 4

✓ Migrated inference stack to vLLM        → +3.0x throughput
✓ Rewrote hot-path caching layer          → -40% p99 latency
✓ Stood up on-prem GPU deployment         → zero external data egress
✓ auth + rate-limiting layer      → sustained 0 downtime incidents

$ cat tech-stack.txt 

• Python • FastAPI • Docker • PostgreSQL
• Redis • vLLM • NGINX • Linux • Git • GitHub
• Prometheus • Grafana • Monitoring 
```

</div>

<div class="terminal">
<div class="terminal-header">
<div class="buttons">
<span class="red"></span>
<span class="yellow"></span>
<span class="green"></span>
</div>
<div class="title">~/api/backend-debug</div>
</div>

```bash
$ docker logs api-gateway --since 10m | grep ERROR

2026-07-12T09:14:02Z ERROR db.pool: connection timeout after 5000ms
2026-07-12T09:14:02Z ERROR db.pool: retrying (attempt 1/3)

$ docker exec -it postgres bash
root@postgres:/# psql -U user -d aiaas

aiaas=> SELECT count(*) FROM pg_stat_activity;
 count
-------
   187
(1 row)

aiaas=> \q
root@postgres:/# exit

$ redis-cli INFO clients | grep connected_clients

connected_clients:342

$ pytest tests/ -k "rate_limit" -v

tests/test_middleware.py::test_rate_limit_burst PASSED
tests/test_middleware.py::test_rate_limit_reset PASSED
tests/test_middleware.py::test_rate_limit_per_ip PASSED

3 passed in 1.42s

$ git commit -am "fix: increase db pool size to handle traffic spike"

[main 7c2e1a9] fix: increase db pool size to handle traffic spike
 1 file changed, 2 insertions(+), 1 deletion(-)
```

</div>

<div class="terminal">
<div class="terminal-header">
<div class="buttons">
<span class="red"></span>
<span class="yellow"></span>
<span class="green"></span>
</div>
<div class="title">~/ci-cd/release-pipeline</div>
</div>

```bash
$ git log --oneline -5 --grep="perf"

a3f9c1e perf: batch inference requests, +18% throughput
7bd2e40 perf: connection pooling for postgres, -12ms avg
c910af3 perf: redis pipeline for hot-key lookups
1e6a8b7 perf: async request queue, reduce lock contention
f402d9c perf: precompute embeddings on write path

$ docker build -t registry.internal/api:v2.4.1 .

[+] Building 42.3s (14/14) FINISHED
 => exporting to image                                    0.4s
 => => writing image sha256:9f2a1c...                     0.0s
 => => naming to registry.internal/api:v2.4.1              0.0s

$ ./run_tests.sh --coverage

Ran 214 tests in 38.7s
Coverage: 91%
All tests passed ✓

$ kubectl rollout status deployment/api-gateway -n prod

Waiting for rollout to finish: 2 of 3 updated replicas are available...
deployment "api-gateway" successfully rolled out

$ cat postmortems/*.md | grep -c "root cause"

0   # no unresolved incidents on record
```
</div>
</div>
<div class="terminal">
<div class="terminal-header">
<div class="buttons">
<span class="red"></span>
<span class="yellow"></span>
<span class="green"></span>
</div>
<div class="title">~/infra/inference-cluster</div>
</div>

```bash
$ systemctl status ai.service
● ai.service
   Active: active (running)

$ kubectl get pods
api                  Running
vllm-server-01       Running
redis-master         Running
postgres             Running

$ nvidia-smi --query-gpu=index,utilization.gpu,memory.used --format=csv

index, utilization.gpu [%], memory.used [MiB]
0, 91 %, 22140 MiB
1, 88 %, 21870 MiB

$ curl localhost:8000/metrics

Throughput : 3.0×
Latency    : -40%
Status     : Production
```

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
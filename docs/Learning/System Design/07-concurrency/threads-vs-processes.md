# Threads vs Processes

## What Problem Does It Solve?

You need to run code concurrently — either to speed things up or to keep the application responsive while doing I/O. A **process** is an independent execution environment with its own memory, while a **thread** is a lightweight unit of execution that shares memory within a process. Think of a restaurant: the whole restaurant is a **process** (has its own kitchen, staff, seating, and supplies), while each **chef** in the kitchen is a **thread** — they share the same kitchen, ingredients, and tools but work on separate orders concurrently.

In Python, the **Global Interpreter Lock (GIL)** allows only one thread to execute Python bytecode at a time. This means threads are useless for CPU-bound work (pure computation) but still work well for I/O-bound work (waiting for network, disk, databases). Processes bypass the GIL because each gets its own Python interpreter.

## How to Identify When to Use It

- Task is **CPU-bound** (heavy math, video encoding, image processing, data crunching) → use **multiprocessing**
- Task is **I/O-bound** (HTTP requests, file reads, database queries, sleeping) → use **threading** or **asyncio**
- You need true parallel execution across CPU cores → use **multiprocessing**
- You need to share state between concurrent work → use **threading** (shared memory) or **explicit IPC** for processes
- You're writing a web server or scraping tool → use **threading** or **asyncio**

**Questions to ask yourself:** Does the task spend most of its time computing or waiting? Can the work be split into independent chunks? Do I need shared state?

**Red flags:** Using threads for heavy numeric computation and seeing no speedup; spawning a process per task for a lightweight I/O workload; not considering the GIL in Python.

## How to Apply It

1. Identify whether the work is CPU-bound or I/O-bound.
2. For **CPU-bound**: use `ProcessPoolExecutor` or `multiprocessing.Pool`.
3. For **I/O-bound**: use `ThreadPoolExecutor` or `threading.Thread`.
4. Design tasks as independent functions. Avoid shared mutable state where possible.
5. Submit tasks, collect results, measure performance.

```python
import time
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor


def cpu_work(n: int) -> int:
    """CPU-bound: pure computation (no GIL benefit for threads)."""
    total = 0
    for i in range(n):
        total += i * i
    return total


def io_work(_: int) -> str:
    """I/O-bound: simulates waiting (threads shine here)."""
    time.sleep(1)
    return "done"


def compare_executors(work_fn, items, label: str) -> None:
    for name, Executor in [("Threads", ThreadPoolExecutor), ("Processes", ProcessPoolExecutor)]:
        start = time.perf_counter()
        with Executor(max_workers=4) as pool:
            list(pool.map(work_fn, items))
        elapsed = time.perf_counter() - start
        print(f"{label} — {name}: {elapsed:.3f}s")


if __name__ == "__main__":
    # CPU-bound: processes are ~4× faster on a 4-core machine
    compare_executors(cpu_work, [5_000_000] * 8, "CPU-bound")

    # I/O-bound: threads and processes perform similarly
    compare_executors(io_work, list(range(8)), "I/O-bound")
```

## Real-World Example

```python
import time
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor
from typing import List


def download_snapshot(url: str) -> str:
    """Simulate downloading a JSON snapshot from an API."""
    time.sleep(1.5)  # network I/O
    return f'{{"source": "{url}", "status": "ok"}}'


def process_snapshot(data: str) -> dict:
    """CPU-bound: parse and transform the JSON payload."""
    n = 2_000_000
    total = sum(i * i for i in range(n))  # heavy computation
    return {"data": data, "checksum": total & 0xFFFF}


def pipeline(urls: List[str]) -> List[dict]:
    """I/O stage with threads, CPU stage with processes."""
    # Stage 1 — I/O-bound: download concurrently via threads
    with ThreadPoolExecutor(max_workers=8) as pool:
        raw = list(pool.map(download_snapshot, urls))

    # Stage 2 — CPU-bound: process concurrently via processes
    with ProcessPoolExecutor(max_workers=4) as pool:
        return list(pool.map(process_snapshot, raw))


if __name__ == "__main__":
    urls = [f"https://api.example.com/snapshots/{i}" for i in range(8)]

    start = time.perf_counter()
    results = pipeline(urls)
    elapsed = time.perf_counter() - start

    print(f"Processed {len(results)} snapshots in {elapsed:.2f}s")
    for r in results:
        print(r)
```

## Common Mistakes / Pitfalls

- **Using threads for CPU-bound work in Python**: the GIL prevents parallel execution, so you'll see no performance gain (often worse due to overhead).
- **Using processes for I/O-bound work**: process creation is expensive; threads are much lighter for waiting tasks.
- **Ignoring serialization cost**: `ProcessPoolExecutor` pickles data between processes. Large objects incur significant overhead.
- **Not handling `if __name__ == "__main__"`**: multiprocessing on Windows and macOS requires this guard to avoid infinite spawning.
- **Oversubscribing CPU cores**: setting `max_workers` higher than the number of CPU cores for CPU-bound work causes context-switching overhead.

## Related Concepts

- **Async/Await (asyncio)** — alternative to threading for I/O-bound work with lower overhead ([async-await.md](async-await.md))
- **Synchronization (Locks, Mutex, Semaphore)** — required when threads share mutable state ([synchronization.md](synchronization.md))
- **Deadlock & Starvation** — concurrency hazards that arise from improper synchronization ([deadlock-starvation.md](deadlock-starvation.md))
- **GIL** — Python-specific limitation that affects threading performance

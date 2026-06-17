# Async/Await (asyncio)

## What Problem Does It Solve?

I/O-bound tasks (HTTP requests, database queries, file operations) spend most of their time waiting — the CPU is idle while the thread blocks on I/O. Threading solves this but adds overhead: each thread consumes memory (∼8 MB per thread on Linux), and context switching between threads is expensive when you have thousands of them. **asyncio** solves this with a single-threaded event loop that multiplexes tasks: when one task waits for I/O, the loop switches to another task. Think of a coffee shop: instead of standing at the counter waiting for your latte (blocking), you get a buzzer (a future/promise). You sit down, and when the buzzer vibrates, you pick up your drink. Meanwhile, the barista serves other customers.

`async def` declares a coroutine (an async function). `await` yields control back to the event loop until the awaited operation completes. `asyncio.gather` runs multiple coroutines concurrently.

## How to Identify When to Use It

- The workload is **I/O-bound** and involves many concurrent operations (hundreds or thousands)
- You're making many HTTP requests, database queries, or file reads
- You need a web server, chat server, or real-time application handling many connections
- You're already using an async library (e.g., `aiohttp`, `asyncpg`, `aioboto3`)

**Questions to ask yourself:** Is the bottleneck CPU time or wall-clock waiting time? Will I be managing >100 concurrent tasks? Do I have an async-compatible library for my I/O?

**Red flags:** CPU-bound computation in async (blocks the event loop for everyone); mixing blocking calls with async (e.g., `time.sleep` instead of `asyncio.sleep`); using asyncio when you only have 2–3 concurrent tasks (threading is simpler).

## How to Apply It

1. Define a coroutine with `async def`.
2. Use `await` for each I/O operation inside the coroutine.
3. Use `asyncio.gather` to run multiple coroutines concurrently.
4. Use `asyncio.run(main())` to bootstrap the event loop.
5. **Never** call blocking functions (like `time.sleep`, `requests.get`) inside a coroutine — use their async equivalents (`asyncio.sleep`, `aiohttp.ClientSession.get`).

```python
import asyncio
import time


async def fetch_data(url: str, delay: float) -> str:
    """Simulate an async HTTP request."""
    await asyncio.sleep(delay)  # non-blocking wait
    return f"Data from {url}"


async def main() -> None:
    # Sequential: takes ~6 seconds
    start = time.perf_counter()
    r1 = await fetch_data("url1", 2)
    r2 = await fetch_data("url2", 2)
    r3 = await fetch_data("url3", 2)
    seq_time = time.perf_counter() - start
    print(f"Sequential: {seq_time:.2f}s")

    # Concurrent with gather: takes ~2 seconds (max delay)
    start = time.perf_counter()
    results = await asyncio.gather(
        fetch_data("url1", 2),
        fetch_data("url2", 2),
        fetch_data("url3", 2),
    )
    conc_time = time.perf_counter() - start
    print(f"Concurrent: {conc_time:.2f}s")
    print(f"Speedup: {seq_time / conc_time:.1f}x")


if __name__ == "__main__":
    asyncio.run(main())
```

## Real-World Example

```python
import asyncio
import aiohttp
import time
from typing import List


async def fetch_status(session: aiohttp.ClientSession, url: str) -> tuple[str, int]:
    """Fetch a URL and return (url, status_code)."""
    try:
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=5)) as response:
            return (url, response.status)
    except Exception as e:
        return (url, -1)


async def check_sites(urls: List[str]) -> List[tuple[str, int]]:
    """Check multiple websites concurrently."""
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_status(session, url) for url in urls]
        return await asyncio.gather(*tasks)


def main() -> None:
    urls = [
        "https://httpbin.org/delay/1",
        "https://httpbin.org/delay/2",
        "https://httpbin.org/delay/3",
        "https://httpbin.org/delay/1",
        "https://httpbin.org/delay/2",
    ]

    # Threading version
    import threading

    def thread_check(urls: List[str]) -> List[tuple[str, int]]:
        import requests

        results = []
        def _get(url: str) -> None:
            try:
                r = requests.get(url, timeout=5)
                results.append((url, r.status_code))
            except Exception:
                results.append((url, -1))

        threads = [threading.Thread(target=_get, args=(u,)) for u in urls]
        for t in threads:
            t.start()
        for t in threads:
            t.join()
        return results

    start = time.perf_counter()
    asyncio.run(check_sites(urls))
    async_time = time.perf_counter() - start
    print(f"asyncio: {async_time:.3f}s")

    start = time.perf_counter()
    thread_check(urls)
    thread_time = time.perf_counter() - start
    print(f"threading: {thread_time:.3f}s")


if __name__ == "__main__":
    main()
```

## Comparison: asyncio vs Threading

| Aspect | asyncio | threading |
|--------|---------|-----------|
| Concurrency model | Single-threaded event loop | Multiple OS threads |
| Memory per task | ~few KB | ~8 MB per thread |
| Max concurrent tasks | 10,000+ | A few hundred (practical limit) |
| Locking needed? | Rarely (no shared state) | Often (shared memory) |
| Debugging | Easy (deterministic) | Hard (race conditions) |
| Blocking library support | Requires async libraries | Works with any library |
| CPU-bound work | **No** (blocks event loop) | Limited by GIL |
| Context switch cost | Very low (cooperative) | High (preemptive) |

**Use asyncio when**: you have many concurrent I/O tasks (hundreds+), you control the libraries, and you want deterministic, lock-free concurrency.

**Use threading when**: you're using blocking libraries that have no async equivalent, you have a moderate number of tasks, or you need to share state between tasks.

## Common Mistakes / Pitfalls

- **Blocking the event loop**: calling `time.sleep()`, `requests.get()`, or any CPU-bound computation inside a coroutine blocks all other tasks. Use `asyncio.sleep()` and async libraries.
- **Not awaiting a coroutine**: forgetting `await` returns a coroutine object, not the result — no error until the coroutine is garbage collected.
- **Mixing async and sync code incorrectly**: use `asyncio.to_thread()` or `loop.run_in_executor()` to offload blocking code without freezing the event loop.
- **Creating too many tasks without throttling**: `asyncio.gather(*[task() for _ in range(10000)])` can overwhelm external services. Use `asyncio.Semaphore` to limit concurrency.
- **Forgetting `asyncio.run()` creates a new event loop each time**: call it once at the top level, not inside a loop.
- **Using asyncio for CPU-bound work**: the event loop is single-threaded — CPU-heavy code blocks all concurrency. Use `ProcessPoolExecutor` instead.

## Related Concepts

- **Threads vs Processes** — understanding the differences helps choose between asyncio, threading, and multiprocessing ([threads-vs-processes.md](threads-vs-processes.md))
- **Synchronization (Locks)** — asyncio reduces the need for locks since there is no shared-memory preemption ([synchronization.md](synchronization.md))
- **Deadlock & Starvation** — asyncio avoids deadlocks entirely (single-threaded, cooperative multitasking) ([deadlock-starvation.md](deadlock-starvation.md))
- **Event Loop** — the core of asyncio that schedules and runs coroutines

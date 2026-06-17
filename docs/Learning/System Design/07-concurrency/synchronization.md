# Synchronization (Locks, Mutex, Semaphore)

## What Problem Does It Solve?

When multiple threads access and modify the same data concurrently, the result depends on the unpredictable interleaving of thread execution — a **race condition**. Without synchronization, you get corrupted state, crashes, or silent data loss. Think of a kitchen: a **mutex** is like a single spatula — only one chef can use it at a time, ensuring they don't accidentally stir each other's pots. A **semaphore** is like having 3 ovens — up to 3 chefs can bake simultaneously, and anyone who wants an oven waits until one is free.

Python's `threading` module provides `Lock` (mutex), `RLock` (reentrant lock), and `Semaphore` to protect critical sections of code.

## How to Identify When to Use It

- Multiple threads read and write a shared variable, list, dict, or file
- You see non-deterministic bugs — the program works sometimes, fails other times
- A counter, balance, or accumulator ends up with an unexpected value
- You're iterating over a collection in one thread while another thread modifies it

**Questions to ask yourself:** Is there shared mutable state? Can the operation be interrupted between the read and the write? Would a transaction or atomic operation help?

**Red flags:** "Heisenbugs" that disappear when you add print statements or a debugger; inconsistent totals in counters; `list.remove()` raising `ValueError` for an element you checked exists.

## How to Apply It

1. Identify the **critical section** — the code that reads and writes shared state.
2. Choose the right primitive:
   - **`Lock`** — basic mutual exclusion (non-reentrant). Use for simple critical sections.
   - **`RLock`** — reentrant lock. Same thread can acquire multiple times (useful when a function calls another function that needs the same lock).
   - **`Semaphore(N)`** — allows up to N threads into the section (e.g., limiting database connections).
3. Protect the critical section with a `with lock:` block (always prefer context managers over manual `acquire()`/`release()`).

```python
import threading
from concurrent.futures import ThreadPoolExecutor


# --- Race Condition Example (Broken) ---

counter = 0

def increment_bad(n: int) -> None:
    global counter
    for _ in range(n):
        # READ, then WRITE — interleaving causes lost updates
        counter += 1


# --- Fixed with Lock ---

lock = threading.Lock()
counter_safe = 0

def increment_good(n: int) -> None:
    global counter_safe
    for _ in range(n):
        with lock:          # acquire mutex
            counter_safe += 1  # critical section
        # released automatically on exit


if __name__ == "__main__":
    n = 10_000

    with ThreadPoolExecutor(max_workers=4) as pool:
        pool.map(increment_bad, [n] * 4)
    print(f"Without lock: {counter}  (expected {n * 4})")

    with ThreadPoolExecutor(max_workers=4) as pool:
        pool.map(increment_good, [n] * 4)
    print(f"With lock:    {counter_safe}  (expected {n * 4})")
```

## Real-World Example

```python
import threading
import time
import random
from typing import List


class OrderBook:
    """Thread-safe order book matching buy and sell orders."""

    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._buy_orders: List[tuple] = []
        self._sell_orders: List[tuple] = []
        self._trades: List[dict] = []

    def add_order(self, order_type: str, price: float, qty: int) -> None:
        with self._lock:
            if order_type == "buy":
                self._buy_orders.append((price, qty))
                self._buy_orders.sort(reverse=True)  # highest price first
            else:
                self._sell_orders.append((price, qty))
                self._sell_orders.sort()  # lowest price first
        self._match()

    def _match(self) -> None:
        with self._lock:
            while self._buy_orders and self._sell_orders:
                buy_price, buy_qty = self._buy_orders[0]
                sell_price, sell_qty = self._sell_orders[0]

                if buy_price >= sell_price:
                    trade_qty = min(buy_qty, sell_qty)
                    self._trades.append({
                        "price": sell_price,
                        "qty": trade_qty,
                    })

                    # Reduce or remove orders
                    if buy_qty == trade_qty:
                        self._buy_orders.pop(0)
                    else:
                        self._buy_orders[0] = (buy_price, buy_qty - trade_qty)

                    if sell_qty == trade_qty:
                        self._sell_orders.pop(0)
                    else:
                        self._sell_orders[0] = (sell_price, sell_qty - trade_qty)
                else:
                    break

    def summary(self) -> dict:
        with self._lock:
            return {
                "trades": len(self._trades),
                "volume": sum(t["qty"] for t in self._trades),
                "buy_depth": len(self._buy_orders),
                "sell_depth": len(self._sell_orders),
            }


def trader(book: OrderBook, trader_id: int) -> None:
    for _ in range(100):
        order_type = random.choice(["buy", "sell"])
        price = round(random.uniform(90, 110), 2)
        qty = random.randint(1, 20)
        book.add_order(order_type, price, qty)
        time.sleep(random.uniform(0.001, 0.005))


if __name__ == "__main__":
    book = OrderBook()
    threads = [
        threading.Thread(target=trader, args=(book, i))
        for i in range(10)
    ]

    for t in threads:
        t.start()
    for t in threads:
        t.join()

    print(book.summary())
```

## Common Mistakes / Pitfalls

- **Deadlock from nested locks**: if two threads each hold one lock and wait for the other, they freeze. Always acquire locks in a consistent order.
- **Forgetting to release a lock**: always use `with lock:` context managers instead of manual `acquire()`/`release()`.
- **Using `Lock` when you need `RLock`**: if a function holding a lock calls another function that tries to acquire the same lock, a plain `Lock` will deadlock your own thread. Use `RLock` for reentrancy.
- **Locking too much (coarse-grained)**: guarding the entire data structure with one lock kills concurrency. Consider fine-grained locking or lock-free data structures.
- **Locking too little (race conditions)**: not protecting compound operations (check-then-act, read-modify-write) is the most common bug.
- **Semaphore count mismatch**: releasing a semaphore more times than you acquired it can allow too many threads into the critical section.

## Related Concepts

- **Deadlock & Starvation** — synchronization hazards that result from improper lock usage ([deadlock-starvation.md](deadlock-starvation.md))
- **Threads vs Processes** — choosing the right concurrency model ([threads-vs-processes.md](threads-vs-processes.md))
- **Async/Await (asyncio)** — an alternative model that avoids locks by not sharing state ([async-await.md](async-await.md))
- **Atomic Operations** — some operations (like `queue.Queue.put`) are thread-safe without explicit locks

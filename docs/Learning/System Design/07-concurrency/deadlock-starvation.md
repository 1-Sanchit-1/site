# Deadlock & Starvation

## What Problem Does It Solve?

Threads can get stuck forever waiting for resources held by each other (**deadlock**) or perpetually denied access to a resource because higher-priority threads keep taking it (**starvation**). The classic analogy is the **Dining Philosophers problem**: five philosophers sit at a round table with a fork between each pair. Each needs both forks to eat. If everyone picks up the left fork simultaneously, nobody can pick up the right fork — everyone starves (deadlock). Starvation is different: it's when one philosopher is too slow to grab forks and the others always eat first.

**Deadlock** = threads blocked forever, each waiting for a resource the other holds. **Starvation** = a thread is ready but never gets CPU time or resource access because others keep cutting in line.

## How to Identify When to Use It

- Program freezes or hangs indefinitely (deadlock)
- Some tasks never complete while others finish quickly (starvation)
- CPU usage drops to near zero when the program is "stuck" (deadlock)
- Thread dumps show threads in a `WAITING` or `BLOCKED` state holding locks
- Adding more threads makes the problem worse instead of better

**Questions to ask yourself:** Are there multiple locks being acquired? Is there a fixed order of acquisition? Could a low-priority thread be perpetually preempted?

**Red flags:** Nested `with lock:` blocks; threads that acquire lock A then lock B while other threads acquire B then A; thread priorities that could cause indefinite postponement.

## How to Apply It (Deadlock Prevention)

Deadlock requires **four conditions** to hold simultaneously:
1. **Mutual exclusion** — resources are non-shareable
2. **Hold and wait** — threads hold resources while waiting for others
3. **No preemption** — resources cannot be forcibly taken away
4. **Circular wait** — a cycle of threads each waiting for the next

Break **any one** of these to prevent deadlock:

**Strategy 1 — Lock ordering**: always acquire locks in a consistent global order (e.g., always lock A before B).
**Strategy 2 — Timeout**: use `lock.acquire(timeout=...)` to back off instead of waiting forever.
**Strategy 3 — Try-lock**: acquire a lock only if immediately available; release all locks and retry if not.

```python
import threading
import time
from concurrent.futures import ThreadPoolExecutor


# --- Deadlock Example (Broken) ---

fork_a = threading.Lock()
fork_b = threading.Lock()

def philosopher_bad(name: str, left: threading.Lock, right: threading.Lock) -> None:
    with left:
        print(f"{name}: got left fork")
        time.sleep(0.05)  # make deadlock more likely
        with right:
            print(f"{name}: eating (got both forks)")


# --- Fix 1: Lock Ordering ---

def philosopher_good(name: str, left: threading.Lock, right: threading.Lock) -> None:
    # Always acquire the "lower" lock first (e.g., compare id)
    first, second = (left, right) if id(left) < id(right) else (right, left)
    with first:
        print(f"{name}: got first fork")
        with second:
            print(f"{name}: eating (got both forks)")


# --- Fix 2: Timeout & Retry ---

def philosopher_with_timeout(name: str, left: threading.Lock, right: threading.Lock) -> None:
    while True:
        if left.acquire(timeout=1):
            if right.acquire(timeout=1):
                print(f"{name}: eating")
                right.release()
                left.release()
                return
            left.release()  # back off
        time.sleep(0.01)  # wait before retry


if __name__ == "__main__":
    print("=== Deadlock (will hang) ===")
    with ThreadPoolExecutor(max_workers=2) as pool:
        pool.submit(philosopher_bad, "Plato", fork_a, fork_b)
        pool.submit(philosopher_bad, "Socrates", fork_b, fork_a)
    # Both threads are stuck — this line never runs

    print("=== Lock ordering (safe) ===")
    with ThreadPoolExecutor(max_workers=2) as pool:
        pool.submit(philosopher_good, "Plato", fork_a, fork_b)
        pool.submit(philosopher_good, "Socrates", fork_b, fork_a)
```

## Real-World Example

```python
import threading
import time
import random
from typing import List


class BankTransfer:
    """Deadlock-free bank transfers using consistent lock ordering."""

    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._accounts: dict[str, float] = {}
        self._account_locks: dict[str, threading.Lock] = {}

    def create_account(self, name: str, balance: float) -> None:
        with self._lock:
            self._accounts[name] = balance
            self._account_locks[name] = threading.Lock()

    def transfer(self, sender: str, recipient: str, amount: float) -> bool:
        # Lock ordering: always lock the account with the smaller name first
        first, second = (sender, recipient) if sender < recipient else (recipient, sender)

        with self._account_locks[first]:
            with self._account_locks[second]:
                if self._accounts[sender] < amount:
                    return False  # insufficient funds
                self._accounts[sender] -= amount
                self._accounts[recipient] += amount
                return True

    def balance(self, name: str) -> float:
        with self._account_locks[name]:
            return self._accounts[name]


def random_transfer(bank: BankTransfer, names: List[str]) -> None:
    for _ in range(50):
        sender = random.choice(names)
        recipient = random.choice([n for n in names if n != sender])
        amount = random.uniform(1, 100)
        success = bank.transfer(sender, recipient, amount)
        time.sleep(random.uniform(0.001, 0.01))


if __name__ == "__main__":
    bank = BankTransfer()
    names = ["Alice", "Bob", "Charlie", "Diana"]
    for n in names:
        bank.create_account(n, 1000.0)

    threads = [threading.Thread(target=random_transfer, args=(bank, names)) for _ in range(10)]

    for t in threads:
        t.start()
    for t in threads:
        t.join()

    total = sum(bank.balance(n) for n in names)
    print(f"Total in system: {total:.2f} (expected 4000.00)")
```

### Starvation Example

```python
import threading
import time

counter = 0
lock = threading.Lock()

def high_priority_worker() -> None:
    global counter
    for _ in range(100):
        with lock:
            counter += 1

def low_priority_worker() -> None:
    global counter
    for _ in range(10):
        time.sleep(0.01)  # low-priority thread is constantly preempted
        with lock:
            counter += 100  # important but rarely gets the lock

# In practice, Python threads don't have reliable priority support,
# but the pattern above shows how a thread that yields frequently
# can be starved of lock access by a tight-looping thread.
```

## Common Mistakes / Pitfalls

- **Inconsistent lock ordering**: the #1 cause of deadlock. Always document and enforce a global order.
- **Forgetting that `Lock` is not `RLock`**: if a function that holds a lock calls another function that needs the same lock, a plain `Lock` causes self-deadlock.
- **Relying on thread priorities**: most operating systems don't guarantee priority scheduling, and Python doesn't expose it reliably.
- **Timeout too short**: a short timeout causes "busy waiting" (retrying in a tight loop), wasting CPU. Add exponential backoff.
- **Confusing deadlock with starvation**: deadlock = no thread makes progress (all blocked). Starvation = some threads make progress, but one or more never do.
- **Assuming deadlock is deterministic**: deadlocks often depend on timing and may not reproduce every run — making them especially insidious.

## Related Concepts

- **Synchronization (Locks, Mutex, Semaphore)** — the primitives that enable deadlock and starvation ([synchronization.md](synchronization.md))
- **Threads vs Processes** — processes don't share memory, so they avoid many lock-related hazards ([threads-vs-processes.md](threads-vs-processes.md))
- **Async/Await (asyncio)** — single-threaded concurrency that sidesteps deadlocks entirely ([async-await.md](async-await.md))
- **Dining Philosophers Problem** — classic synchronization problem illustrating deadlock and starvation

# System Design Cheat Sheet

---

## 1. OOPs Concepts

| Concept | Analogy | Problem Solved | Real-World Example |
|---------|---------|---------------|-------------------|
| **Encapsulation** | ATM — you see the screen/buttons, not the internal cash mechanism | Hides internal state, protects data integrity | BankAccount class with private `_balance`, public `deposit()`/`withdraw()` |
| **Inheritance** | Child inherits traits from parent + has their own | Code reuse, hierarchical relationships | `Vehicle` → `Car`, `Bike`, `Truck` |
| **Polymorphism** | Same remote button (power) works on TV, AC, Soundbar | One interface, multiple implementations | `Shape.draw()` → `Circle.draw()`, `Square.draw()` |
| **Abstraction** | Driving a car — you know steering + pedals, not engine internals | Hide complexity, expose essentials | `sort()` method hiding TimSort/QuickSort logic |

**Python snippet:**
```python
# Encapsulation
class BankAccount:
    def __init__(self):
        self._balance = 0

    def deposit(self, amt):
        if amt > 0:
            self._balance += amt

    def withdraw(self, amt):
        if 0 < amt <= self._balance:
            self._balance -= amt

# Polymorphism
from abc import ABC, abstractmethod
class Shape(ABC):
    @abstractmethod
    def draw(self): pass

class Circle(Shape):
    def draw(self): print("🔵 Circle")
class Square(Shape):
    def draw(self): print("🟦 Square")
```

---

## 2. Design Principles

### SOLID

| Principle | What it means | Analogy | Violation Example |
|-----------|--------------|---------|------------------|
| **S** — Single Responsibility | One class = one job | A chef cooks; a waiter serves; a cashier bills | `Invoice` class that also `saveToDB()`, `sendEmail()`, `print()` |
| **O** — Open/Closed | Open for extension, closed for modification | Power outlet — add adapter for new device, don't rewire house | Adding a new payment type requires editing `PaymentProcessor` class |
| **L** — Liskov Substitution | Subclass must work wherever parent is used | If `Bird` can `fly()`, `Penguin` should NOT inherit `Bird` | `Square` inheriting `Rectangle` breaks `setWidth()/setHeight()` |
| **I** — Interface Segregation | Don't force classes to implement unused methods | Restaurant menu — separate drink menu, food menu, dessert menu | `Worker` interface with `code()`, `eat()`, `sleep()` forces Robot to implement `eat()` |
| **D** — Dependency Inversion | Depend on abstractions, not concretions | Wall outlet expects a plug (abstract), not a specific device | `EmailService` directly instantiating `GmailClient()` instead of `Mailer` interface |

**Python snippets:**
```python
# S — Single Responsibility ✅
class InvoiceCalculator:
    def calculate(self, invoice): ...
class InvoiceRepository:
    def save(self, invoice): ...
class InvoicePrinter:
    def print(self, invoice): ...

# D — Dependency Inversion ✅
from abc import ABC, abstractmethod
class Mailer(ABC):
    @abstractmethod
    def send(self, msg): pass

class GmailClient(Mailer):
    def send(self, msg): print("Sending via Gmail")

class NotificationService:
    def __init__(self, mailer: Mailer):  # depends on abstraction
        self.mailer = mailer
```

### KISS, DRY, YAGNI, SoC, Composition over Inheritance

| Principle | Meaning | Example |
|-----------|---------|---------|
| **KISS** — Keep It Simple, Stupid | Simplest solution wins | `if x: return True` instead of `return True if x else False` |
| **DRY** — Don't Repeat Yourself | Extract repeated code | Extract `validate_email()` once, call everywhere |
| **YAGNI** — You Ain't Gonna Need It | Don't build for hypothetical future | Don't add caching layer "just in case" traffic grows |
| **SoC** — Separation of Concerns | Each module handles one concern | Controller (HTTP) → Service (logic) → Repository (DB) |
| **Composition > Inheritance** | Has-a vs Is-a | `Car` has `Engine` has `Piston` (instead of `Car` inheriting `Engine`) |

---

## 3. Design Patterns (LLD)

### 🏭 Creational Patterns

| Pattern | Analogy | Problem Solved | Real Example |
|---------|---------|---------------|--------------|
| **Singleton** | One security guard for entire building | Global access to single instance | DB connection, Logger, Config manager |
| **Factory** | Sandwich shop — you order "Veggie", they make it | Object creation logic is complex/conditional | Parser factory: `JSONParser`, `XMLParser` |
| **Abstract Factory** | Furniture store — get "Victorian" set (chair+table+sofa) | Creating families of related objects | UI toolkit: WinFactory, MacFactory |
| **Builder** | Subway sandwich — choose bread, veggies, sauce step-by-step | Object has many optional parts | SQL query builder, HTML builder |
| **Prototype** | Cloning a sheep (Dolly) | Creating object is expensive; clone instead | Caching complex objects, game assets |

**Python snippets:**
```python
# Singleton (already shown) ✅

# Factory
class Pizza:
    @staticmethod
    def order_pizza(pizza_type):
        if pizza_type == "veg":   return VegPizza()
        if pizza_type == "nonveg": return NonVegPizza()
        raise ValueError("Unknown pizza")

# Builder
class Burger:
    def __init__(self):
        self.bun = self.patty = self.sauce = None

class BurgerBuilder:
    def __init__(self):
        self.burger = Burger()
    def add_bun(self, bun):     self.burger.bun = bun;   return self
    def add_patty(self, patty):  self.burger.patty = patty; return self
    def add_sauce(self, sauce):  self.burger.sauce = sauce; return self
    def build(self):             return self.burger

burger = BurgerBuilder().add_bun("sesame").add_patty("chicken").add_sauce("BBQ").build()
```

### 🧱 Structural Patterns

| Pattern | Analogy | Problem Solved | Real Example |
|---------|---------|---------------|--------------|
| **Adapter** | Travel plug adapter — converts US plug to EU socket | Incompatible interfaces | Legacy system wrapper, API version adapter |
| **Decorator** | Pizza toppings — base pizza + cheese + olives + pepperoni | Add responsibilities dynamically without subclassing | Middleware (logging, auth, compression) |
| **Facade** | Hotel receptionist — one person handles booking, cleaning, food | Simplify complex subsystem | `OrderService` hiding `Inventory`, `Payment`, `Shipping` |
| **Proxy** | Credit card (proxy for bank account) | Control access, lazy init, logging | Lazy loading, auth proxy, cache proxy |
| **Composite** | Folder containing files + sub-folders (same interface) | Treat single & group objects uniformly | UI tree: Label, Panel, Button all have `render()` |
| **Bridge** | Remote (Sony × Basic, Samsung × Advanced) | Decouple abstraction from implementation | Device(R/LED) × Remote(Basic/Advanced) |

**Python snippets:**
```python
# Adapter
class EuropeanSocket:
    def voltage(self): return 230
class USPlug:
    def connect(self): return 110

class Adapter(USPlug):
    def __init__(self, socket: EuropeanSocket):
        self.socket = socket
    def connect(self):
        return self.socket.voltage()  # adapts 230 → 110

# Decorator
def log_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_decorator
def process(data): ...

# Facade
class OrderFacade:
    def place_order(self, items, user):
        Inventory().check(items)
        Payment().charge(user, items)
        Shipping().schedule(items, user.address)
```

### 🔄 Behavioral Patterns

| Pattern | Analogy | Problem Solved | Real Example |
|---------|---------|---------------|--------------|
| **Observer** | YouTube subscriber — bell 🔔 → all subs get notified | One-to-many dependency, state change notification | Event listeners, pub/sub systems, React state |
| **Strategy** | GPS navigation — car vs bike vs walking routes | Family of algorithms, interchangeable at runtime | Payment strategies (UPI, Card, NetBanking), sort algorithms |
| **Command** | Restaurant order — waiter takes slip → chef cooks → cashier bills | Encapsulate request as object | Undo/redo, task queue, macro recording |
| **State** | Traffic light — Red→Green→Yellow→Red | Object changes behavior when state changes | Order status (New→Paid→Shipped→Delivered), vending machine |
| **Template** | Tea/Coffee recipe — boil water + add stuff (boil is same, stuff varies) | Define skeleton, defer steps to subclasses | Data migration framework, CI pipeline steps |
| **Iterator** | TV remote channel surf — next(), prev(), current() | Sequential access without exposing internal structure | `for item in collection` |
| **Chain of Resp.** | ATM dispenser — 2000₹ → 500₹ → 200₹ → 100₹ notes | Pass request along chain until handled | Logging levels (DEBUG→INFO→ERROR), middleware pipeline |

**Python snippets:**
```python
# Observer
class Subject:
    def __init__(self):
        self._observers = []
    def attach(self, obs):  self._observers.append(obs)
    def notify(self, msg):
        for obs in self._observers:
            obs.update(msg)

class EmailSubscriber:
    def update(self, msg): print(f"Email: {msg}")

# Strategy
from abc import ABC, abstractmethod
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amt): pass

class CreditCard(PaymentStrategy):
    def pay(self, amt): print(f"Paid {amt} via Card")

class UPI(PaymentStrategy):
    def pay(self, amt): print(f"Paid {amt} via UPI")

class Checkout:
    def __init__(self, strategy: PaymentStrategy):
        self.strategy = strategy
    def execute(self, amt):
        self.strategy.pay(amt)

Checkout(UPI()).execute(100)  # Paid 100 via UPI

# Chain of Responsibility
class Handler:
    def __init__(self):
        self._next = None
    def set_next(self, handler):
        self._next = handler; return handler
    def handle(self, request):
        if self._next: self._next.handle(request)

class AuthHandler(Handler):
    def handle(self, request):
        if request.get("auth"): print("Auth OK")
        else: print("Auth FAIL"); return
        super().handle(request)

class LoggingHandler(Handler):
    def handle(self, request):
        print(f"Log: {request}")
        super().handle(request)
```

### ✅ Pattern Selection Guide

```
Need exactly one instance?       → Singleton
Creation logic is complex?       → Factory / Builder
Need to add features dynamically?→ Decorator
Hide complex subsystem?          → Facade
Object changes behavior?         → State
Multiple algorithms?             → Strategy
Notify many on change?           → Observer
Incompatible interfaces?         → Adapter
Undo/redo / task queue?          → Command
Whole-part hierarchy?            → Composite
```

---

## 4. Concurrency & Multithreading

### Core Concepts

| Concept | Analogy | Explanation |
|---------|---------|-------------|
| **Process** | A restaurant (has own kitchen, staff, space) | Independent execution unit, isolated memory |
| **Thread** | One chef in the kitchen | Lightweight, shares memory within process |
| **Mutex** | One spatula — only one chef uses it at a time | Lock — prevents race condition |
| **Semaphore** | 3 ovens available — take one, use, return | Limits concurrent access to N resources |
| **Deadlock** | Chef A has knife, Chef B has cutting board; both wait | Circular wait — threads stuck forever |
| **Race Condition** | Two chefs updating same order total | Unpredictable result due to unsynchronized access |
| **Context Switch** | Chef switches from chopping to stirring | CPU switches between threads |
| **GIL** (Python) | One chef in kitchen, others wait (only one works at a time) | Python's Global Interpreter Lock limits true parallelism |

### Python Multithreading

```python
import threading
import time

lock = threading.Lock()
counter = 0

def worker(name):
    global counter
    for _ in range(1000):
        with lock:          # acquire mutex
            counter += 1    # critical section

threads = [threading.Thread(target=worker, args=(f"T{i}",)) for i in range(5)]
for t in threads: t.start()
for t in threads: t.join()
print(f"Counter: {counter}")  # Always 5000 ✅
```

### Deadlock Example

```python
fork_a, fork_b = threading.Lock(), threading.Lock()

def philosopher(left, right):
    with left:
        print("Got left fork")
        with right:      # ⚠️ Can deadlock if both pick left first
            print("Eating")

# Fix: acquire locks in consistent order (always fork_a then fork_b)
```

### Thread Pool (Concurrent.futures)

```python
from concurrent.futures import ThreadPoolExecutor

def fetch_url(url):
    return f"Data from {url}"

with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(fetch_url, ["url1", "url2", "url3"]))
```

### Async/Await (asyncio)

```python
import asyncio

async def fetch_data(url):
    await asyncio.sleep(1)  # simulate I/O
    return f"Data from {url}"

async def main():
    results = await asyncio.gather(
        fetch_data("url1"), fetch_data("url2"), fetch_data("url3")
    )
    print(results)

asyncio.run(main())
```

### Common Concurrency Problems & Solutions

| Problem | Cause | Solution |
|---------|-------|----------|
| **Race Condition** | Unsync'd shared state | Mutex, Lock, Semaphore |
| **Deadlock** | Circular lock wait | Consistent lock ordering, timeout |
| **Starvation** | Low-priority thread never runs | Fair locks, aging |
| **Livelock** | Threads keep yielding to each other | Random backoff |
| **False Sharing** | CPUs invalidate each other's cache lines | Padding / alignment |

### When to use what

```
CPU-bound work (math, video)     → Multiprocessing (parallel)
I/O-bound work (HTTP, DB, files) → Multithreading / asyncio
Thousands of connections         → asyncio (event loop)
Data parallelism                 → multiprocessing.Pool
Task management                  → ThreadPoolExecutor
```

---

## Quick Reference

```
┌────────────────────────────────────────────────────┐
│                  System Design                     │
├────────────────────────────────────────────────────┤
│  OOPs:  Encapsulation | Inheritance | Poly | Abs  │
│  SOLID: S O L I D                                 │
│  Other: KISS DRY YAGNI SoC Comp>Inherit           │
│                                                    │
│  Patterns:                                         │
│  ┌──────────────┬──────────────┬────────────────┐  │
│  │  Creational   │  Structural   │  Behavioral    │  │
│  │──────────────│──────────────│────────────────│  │
│  │ Singleton    │ Adapter      │ Observer       │  │
│  │ Factory      │ Decorator    │ Strategy       │  │
│  │ Builder      │ Facade       │ Command        │  │
│  │ Prototype    │ Proxy        │ State          │  │
│  │ Abstract Fac.│ Composite    │ Chain of Resp. │  │
│  └──────────────┴──────────────┴────────────────┘  │
│                                                    │
│  Concurrency: Mutex | Semaphore | Deadlock | GIL   │
│  Parallel:  Multiprocessing (CPU)                  │
│  Concurrent: Threading / asyncio (I/O)             │
└────────────────────────────────────────────────────┘
```

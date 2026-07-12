# Single Responsibility Principle

## What Problem Does It Solve?
The Single Responsibility Principle (SRP) solves the problem of a class doing too many things — becoming a "god class" that is hard to understand, test, and change. When one class handles persistence, business logic, logging, and notification delivery, a change to any of those responsibilities risks breaking all the others.

Think of a **restaurant** where the chef, waiter, and cashier have distinct jobs. The chef cooks, the waiter serves, the cashier handles payments. If one person did all three, the restaurant would be chaotic. SRP says each class should have exactly one reason to change, just like each restaurant role has one job.

## How to Identify When to Use It
- A class has more than one clear "job" (e.g., it both saves to a database and sends emails)
- The class name is vague or contains "and" (e.g., `OrderManagerAndNotifier`)
- You frequently change the class for different reasons (persistence changes + business logic changes)
- A method on the class uses instance variables it doesn't need
- The class has too many imports from unrelated domains

**Questions to ask yourself:**
- What is the one thing this class does?
- Can I describe its responsibility in a single sentence without using "and"?
- Would a change to this class ever happen for more than one reason?

**Red flags:** Classes named `Manager`, `Helper`, `Processor`, `Utils`, or `Handler` — they often have multiple responsibilities. A class with more than one method that accesses resources (DB, file, network) in unrelated ways.

## How to Apply It
1. List every method in the class and what "domain" it belongs to
2. Group methods by domain (persistence, formatting, business rules, notification)
3. Extract each group into its own class
4. Let the original class compose these smaller classes

```python
# ❌ Before — God class with multiple responsibilities
class OrderService:
    def __init__(self):
        self.orders = []

    def add_order(self, order_data: dict) -> None:
        self.orders.append(order_data)

    def save_to_database(self) -> None:
        import sqlite3
        conn = sqlite3.connect("orders.db")
        for o in self.orders:
            conn.execute("INSERT INTO orders VALUES (?, ?)", (o["id"], o["total"]))
        conn.commit()
        conn.close()

    def send_confirmation_email(self) -> None:
        for o in self.orders:
            print(f"Sending email for order {o['id']}...")

    def generate_invoice(self, order_id: str) -> str:
        o = next(o for o in self.orders if o["id"] == order_id)
        return f"Invoice #{o['id']}: ${o['total']:.2f}"

# ✅ After — Each class has a single responsibility
class Order:
    def __init__(self, order_id: str, total: float):
        self.id = order_id
        self.total = total

class OrderRepository:
    def save(self, order: Order) -> None:
        import sqlite3
        conn = sqlite3.connect("orders.db")
        conn.execute("INSERT INTO orders VALUES (?, ?)", (order.id, order.total))
        conn.commit()
        conn.close()

class EmailService:
    def send_confirmation(self, order: Order) -> None:
        print(f"Sending confirmation for order {order.id}...")

class InvoiceGenerator:
    def generate(self, order: Order) -> str:
        return f"Invoice #{order.id}: ${order.total:.2f}"

# Orchestrator — composes the parts (this is fine; its job IS orchestration)
class CheckoutFlow:
    def __init__(self, repo: OrderRepository, email: EmailService, invoice: InvoiceGenerator):
        self._repo = repo
        self._email = email
        self._invoice = invoice

    def complete_order(self, order: Order) -> str:
        self._repo.save(order)
        self._email.send_confirmation(order)
        return self._invoice.generate(order)
```

## Real-World Example
A **user registration** flow that separates validation, persistence, and notification.

```python
import re
import sqlite3

# --- Responsibility 1: Validation ---
class UserValidator:
    def validate(self, email: str, age: int) -> None:
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Invalid email")
        if age < 13:
            raise ValueError("Must be at least 13")

# --- Responsibility 2: Persistence ---
class UserRepository:
    def __init__(self, db_path: str = "users.db"):
        self._db = db_path
        self._init_db()

    def _init_db(self) -> None:
        conn = sqlite3.connect(self._db)
        conn.execute("CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, age INT)")
        conn.commit()
        conn.close()

    def save(self, email: str, age: int) -> None:
        conn = sqlite3.connect(self._db)
        conn.execute("INSERT OR REPLACE INTO users VALUES (?, ?)", (email, age))
        conn.commit()
        conn.close()

# --- Responsibility 3: Notification ---
class WelcomeEmailSender:
    def send_welcome(self, email: str) -> None:
        print(f"Sending welcome email to {email}...")

# --- Orchestrator ---
class RegistrationService:
    def __init__(self):
        self._validator = UserValidator()
        self._repo = UserRepository()
        self._notifier = WelcomeEmailSender()

    def register(self, email: str, age: int) -> None:
        self._validator.validate(email, age)
        self._repo.save(email, age)
        self._notifier.send_welcome(email)
```

Each class has exactly one reason to change: validation rules, storage format, or email content. They can be tested and developed independently.

## Common Mistakes / Pitfalls
- **Confusing "responsibility" with "function"**: A method is not a responsibility. A class with 5 methods that all relate to the same concept (e.g., all about user authentication) still has one responsibility.
- **Over-splitting**: Extracting every line into its own class creates "class explosion." Split when the responsibility has a *different rate or reason for change*, not just because it could be separate.
- **SRP applied only to classes**: SRP applies to functions and modules too. A function should do one thing.
- **The orchestrator trap**: Having a class that composes smaller classes is fine. But if the orchestrator itself grows to have multiple responsibilities, it needs its own decomposition.
- **Premature splitting**: Don't split until you see the code changing for different reasons. YAGNI (You Ain't Gonna Need It) applies.


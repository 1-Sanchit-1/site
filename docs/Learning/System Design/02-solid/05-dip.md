# Dependency Inversion Principle

## What Problem Does It Solve?
The Dependency Inversion Principle (DIP) solves the problem of high-level code depending directly on low-level implementation details, creating tight coupling that makes the system rigid and hard to change. When business logic imports database drivers, HTTP clients, or file system APIs directly, swapping one implementation for another (or testing in isolation) becomes painful.

Think of a **wall outlet**. Your appliances don't wire themselves directly into the house's electrical system — they plug into a standardized outlet (an abstraction). The outlet lets you swap any compatible appliance without rewiring your house. DIP says the same: both high-level and low-level modules should depend on abstractions, not on each other.

## How to Identify When to Use It
- High-level code imports low-level modules directly (e.g., `from sqlite3 import connect` in business logic)
- Unit tests are slow because they require databases, APIs, or file systems
- You can't swap a component without modifying the code that uses it
- Constructor or factory methods hard-code dependencies instead of accepting them
- Changing a database or third-party service requires changes across the entire codebase

**Questions to ask yourself:**
- Can I unit test this class without spinning up a real database?
- If I switch from PostgreSQL to MongoDB, how many files need to change?
- Does this function create its own dependencies (using `new` or calling constructors directly)?

**Red flags:** `import sqlite3` or `import requests` inside business logic classes; constructors that initialize specific implementations; static method calls to low-level utilities; `new SomeDatabase()` in the middle of business methods.

## How to Apply It
1. Identify the dependencies that vary (database, email, cache, etc.)
2. Define an abstract interface for each dependency
3. Inject dependencies through constructors or setters (Dependency Injection)
4. Let a higher-level "composition root" wire everything together

```python
from abc import ABC, abstractmethod

# ❌ Before — High-level code depends directly on low-level implementation
class UserService:
    def __init__(self):
        # Direct dependency on concrete implementation
        self._db = sqlite3.connect("users.db")

    def get_user(self, user_id: str) -> dict:
        cursor = self._db.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        return {"id": row[0], "name": row[1]}

# ✅ After — Both high and low level depend on abstractions
class UserRepository(ABC):
    @abstractmethod
    def find_by_id(self, user_id: str) -> dict | None:
        pass

class SQLiteUserRepository(UserRepository):
    def __init__(self, db_path: str = "users.db"):
        import sqlite3
        self._conn = sqlite3.connect(db_path)

    def find_by_id(self, user_id: str) -> dict | None:
        cursor = self._conn.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        if not row:
            return None
        return {"id": row[0], "name": row[1]}

class PostgresUserRepository(UserRepository):
    def __init__(self, connection_string: str):
        import psycopg2
        self._conn = psycopg2.connect(connection_string)

    def find_by_id(self, user_id: str) -> dict | None:
        with self._conn.cursor() as cur:
            cur.execute("SELECT id, name FROM users WHERE id = %s", (user_id,))
            row = cur.fetchone()
            if not row:
                return None
            return {"id": row[0], "name": row[1]}

class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self._users: dict[str, dict] = {}

    def find_by_id(self, user_id: str) -> dict | None:
        return self._users.get(user_id)

# High-level code depends on the abstraction, not the concrete implementation
class UserService:
    def __init__(self, repo: UserRepository):  # Dependency Injection via constructor
        self._repo = repo

    def get_user(self, user_id: str) -> dict | None:
        return self._repo.find_by_id(user_id)

# Composition root — wires everything together at startup
def main():
    if config.env == "production":
        repo = PostgresUserRepository("postgresql://...")
    elif config.env == "development":
        repo = SQLiteUserRepository("users.dev.db")
    else:
        repo = InMemoryUserRepository()

    service = UserService(repo)
    user = service.get_user("123")
```

## Real-World Example
A **logging system** where the high-level application code depends on a logger abstraction, and different implementations (file, console, cloud) can be swapped without touching the application logic.

```python
from abc import ABC, abstractmethod
from datetime import datetime

class Logger(ABC):
    @abstractmethod
    def log(self, level: str, message: str) -> None:
        pass

class ConsoleLogger(Logger):
    def log(self, level: str, message: str) -> None:
        print(f"[{datetime.now()}] [{level}] {message}")

class FileLogger(Logger):
    def __init__(self, filepath: str = "app.log"):
        self._filepath = filepath

    def log(self, level: str, message: str) -> None:
        with open(self._filepath, "a") as f:
            f.write(f"[{datetime.now()}] [{level}] {message}\n")

class CloudLogger(Logger):
    def __init__(self, api_key: str, endpoint: str):
        import requests
        self._api_key = api_key
        self._endpoint = endpoint

    def log(self, level: str, message: str) -> None:
        import requests
        requests.post(
            self._endpoint,
            json={"level": level, "message": message, "timestamp": str(datetime.now())},
            headers={"Authorization": f"Bearer {self._api_key}"},
        )

class OrderProcessor:
    def __init__(self, logger: Logger):  # depends on abstraction
        self._logger = logger

    def place_order(self, order_id: str, items: list[str]) -> None:
        self._logger.log("INFO", f"Placing order {order_id}")
        # ... business logic ...
        self._logger.log("INFO", f"Order {order_id} placed successfully")
```

The `OrderProcessor` never imports `requests`, `open`, or `print` directly. All logging dependencies are injected — you can test with a `ConsoleLogger`, run in production with a `CloudLogger`, or pass in a mock for unit tests.

## Common Mistakes / Pitfalls
- **Forgetting the "abstraction" part**: Injecting a concrete class is not DIP. The injected parameter must be an abstract type (interface, ABC, or Protocol).
- **Inversion of Control confusion**: DIP is about *what* depends on what (abstractions, not concretions). IoC is about *who* controls the flow. They often go together but are distinct.
- **Constructor over-injection**: If a class needs 5+ dependencies, it may be doing too much. Consider whether some of those can be grouped or if the class needs SRP first.
- **Leaving the composition root too late**: Dependencies should be wired at the composition root (application entry point). Don't scatter `new` calls throughout the codebase.
- **Using service locator instead of DI**: `ServiceLocator.get("logger")` looks like DI but hides dependencies. Constructor injection makes dependencies explicit.
- **Over-abstracting stable dependencies**: Not every class needs an interface. If a dependency is stable (like Python's `datetime` or standard library math), inverting it adds indirection without benefit.

# Singleton (Creational)

## What Problem Does It Solve?

You need exactly **one instance** of a class globally accessible throughout your application. Every client should share the same object rather than creating their own copies.

**Analogy:** A building has one security guard. Instead of hiring a new guard for every person who enters, everyone checks in with the same guard. If you need to change the guard's schedule, you update it once and everyone sees the change.

## How to Identify When to Use It

- You need a single shared resource (DB connection, logger, config, thread pool)
- You find yourself passing the same object instance through many constructors
- Multiple parts of the system need coordinated access to a resource
- You want lazy initialization — create the instance only when first needed

**Questions to ask yourself:**
- "Would two instances of this class cause problems (race conditions, double writes)?"
- "Is this class managing shared state that must be consistent?"

**Red flags:**
- You're using globals or static class members to share state (consider whether a Singleton formalizes the need)
- You're tempted to pass `db_connection` as a parameter through 5 layers of function calls
- Your code has "just create one and reuse it" comments

## How to Apply It

1. Make the constructor private (or use `__new__` control)
2. Store the single instance as a class-level attribute
3. Provide a static `get_instance()` method that creates the instance on first call and returns it thereafter
4. (Optional) Make the class thread-safe with a lock

```python
class DatabaseConnection:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self, host: str = "localhost", port: int = 5432):
        if self._initialized:
            return
        self.host = host
        self.port = port
        self._connected = False
        self._initialized = True

    def connect(self):
        if not self._connected:
            print(f"Connecting to {self.host}:{self.port}...")
            self._connected = True
        else:
            print("Already connected.")

    def query(self, sql: str):
        if not self._connected:
            raise RuntimeError("Not connected")
        print(f"Executing: {sql}")


db1 = DatabaseConnection("prod.example.com", 5432)
db1.connect()

db2 = DatabaseConnection()
print(db1 is db2)  # True — same instance
db2.query("SELECT * FROM users")
```

## Real-World Example

```python
import threading


class Logger:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._buffer = []
        return cls._instance

    def log(self, level: str, message: str):
        entry = f"[{level}] {message}"
        self._buffer.append(entry)
        print(entry)

    def flush(self):
        with open("app.log", "a") as f:
            for entry in self._buffer:
                f.write(entry + "\n")
        self._buffer.clear()


def worker_a():
    logger = Logger()
    logger.log("INFO", "Worker A started")


def worker_b():
    logger = Logger()
    logger.log("ERROR", "Worker B failed")


t1 = threading.Thread(target=worker_a)
t2 = threading.Thread(target=worker_b)
t1.start()
t2.start()
t1.join()
t2.join()

Logger().flush()
# Both threads share the same logger instance.
```

## Common Mistakes / Pitfalls

- **Singleton as a disguised global:** Globals make testing and reasoning about code harder. If you can pass an instance as a parameter, do that instead.
- **Multithreading race conditions:** Two threads calling `get_instance()` simultaneously can create two instances. Always use a lock (or early initialization).
- **Testing nightmare:** Singletons are hard to mock. Inject the singleton class or provide a `reset()` method for test teardown.
- **Overuse:** Most things don't need to be singletons. A utility function or a module-level constant is often simpler.

## Related Concepts

- Module-level singleton (Python modules are effectively singletons)
- Monostate (Borg pattern) — shares state, not identity
- Dependency injection — an alternative to passing singletons around

# Decorator (Structural)

## What Problem Does It Solve?

You need to add responsibilities to individual objects dynamically without creating a subclass for every possible combination. Subclass explosion makes code rigid and unmaintainable. Think of **pizza toppings**: a plain pizza base can be decorated with cheese, then olives, then pepperoni — any combination at runtime, without needing a `CheeseOlivePepperoniPizza` class for every permutation.

## How to Identify When to Use It

- You have a combinatorial explosion of subclasses (e.g. `LoggedFileWriter`, `CompressedFileWriter`, `LoggedCompressedFileWriter`, `EncryptedLoggedCompressedFileWriter`…)
- You need to add or remove behaviour from an object at runtime
- You want to layer behaviours (logging → compression → encryption) in any order
- You're building a middleware pipeline

**Questions to ask yourself:** Am I creating more subclasses than core classes? Do I need to mix and match behaviours freely?

**Red flags:** Class names that read like alphabet soup (`AuthCachedCompressedRepo`); a `__init__` with 7 optional boolean flags controlling cross-cutting concerns.

## How to Apply It

1. Define a **Component** interface (common to the core object and all decorators).
2. Create a **ConcreteComponent** class that implements the interface (the "pizza base").
3. Create a **BaseDecorator** abstract class that holds a reference to a wrapped Component and delegates to it.
4. Extend the BaseDecorator with **ConcreteDecorators** that add behaviour before/after delegating.

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass


# --- Component ---

class Request(ABC):
    @abstractmethod
    def handle(self, data: bytes) -> bytes:
        ...


# --- ConcreteComponent ---

class BaseHandler(Request):
    def handle(self, data: bytes) -> bytes:
        return data


# --- BaseDecorator ---

class Middleware(Request):
    def __init__(self, wrapped: Request) -> None:
        self._wrapped = wrapped


# --- ConcreteDecorators ---

class LoggingMiddleware(Middleware):
    def handle(self, data: bytes) -> bytes:
        print(f"[LOG] Handling {len(data)} bytes")
        result = self._wrapped.handle(data)
        print(f"[LOG] Response {len(result)} bytes")
        return result


class AuthMiddleware(Middleware):
    def __init__(self, wrapped: Request, token: str) -> None:
        super().__init__(wrapped)
        self._expected_token = token

    def handle(self, data: bytes) -> bytes:
        # Simulate token check embedded in data
        if b"token=" + self._expected_token.encode() not in data:
            raise PermissionError("Invalid token")
        print("[AUTH] Token verified")
        return self._wrapped.handle(data)


class CompressionMiddleware(Middleware):
    def handle(self, data: bytes) -> bytes:
        compressed = b"<compressed>" + data + b"</compressed>"
        print(f"[COMPRESS] {len(data)} → {len(compressed)} bytes")
        return self._wrapped.handle(compressed)

    def _decompress(self, data: bytes) -> bytes:
        return data.replace(b"<compressed>", b"").replace(b"</compressed>", b"")


# --- Usage ---

handler = BaseHandler()
handler = LoggingMiddleware(handler)
handler = AuthMiddleware(handler, token="secret")
handler = CompressionMiddleware(handler)

result = handler.handle(b"Hello, world!")
```

## Real-World Example

```python
# Build an HTTP middleware pipeline — each decorator wraps the next

class HttpHandler(ABC):
    @abstractmethod
    def handle(self, request: dict) -> dict:
        ...


class CoreHandler(HttpHandler):
    def handle(self, request: dict) -> dict:
        return {"status": 200, "body": f"Hello {request['user']}"}


class HttpMiddleware(HttpHandler):
    def __init__(self, inner: HttpHandler) -> None:
        self._inner = inner


class RateLimiter(HttpMiddleware):
    def __init__(self, inner: HttpHandler, max_requests: int = 5) -> None:
        super().__init__(inner)
        self._count = 0
        self._max = max_requests

    def handle(self, request: dict) -> dict:
        self._count += 1
        if self._count > self._max:
            return {"status": 429, "body": "Too Many Requests"}
        return self._inner.handle(request)


class CorsMiddleware(HttpMiddleware):
    def handle(self, request: dict) -> dict:
        response = self._inner.handle(request)
        response["headers"] = {"Access-Control-Allow-Origin": "*"}
        return response


# Build the pipeline
app = CoreHandler()
app = RateLimiter(app, max_requests=10)
app = CorsMiddleware(app)

print(app.handle({"user": "alice"}))
```

## Common Mistakes / Pitfalls

- **Changing the interface**: decorators must conform exactly to the Component interface — adding new methods breaks the pattern.
- **Order dependency**: Logging → Auth → Compression behaves differently from Auth → Compression → Logging. Document the intended order.
- **Too many decorators**: a chain of 20 decorators is hard to debug. Consider grouping related concerns.
- **Shared mutable state** between decorators leads to subtle bugs; keep decorators stateless or pass context explicitly.

## Related Concepts

- **Chain of Responsibility** — similar layered structure, but each link can stop propagation; Decorator always passes through.
- **Proxy** — controls access to an object; Decorator adds behaviour. Same wrapper structure, different intent.
- **Composite** — both rely on recursive composition; Composite aggregates children, Decorator wraps a single object.

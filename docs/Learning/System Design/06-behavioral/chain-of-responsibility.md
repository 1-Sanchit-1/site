# Chain of Responsibility (Behavioral)

## What Problem Does It Solve?

A request needs to be processed by one of several handlers, but the sender shouldn't know which handler will handle it — and the handler should be determined at runtime. Hard-coding handler selection with conditionals leads to rigid code that must change every time a new handler is added. The Chain of Responsibility pattern lets you pass a request along a chain of handlers until one of them handles it. Think of an **ATM money dispenser**: you request ₹3,700. The machine first tries to dispense as many ₹2,000 notes as possible, then ₹500 notes, then ₹200 notes, then ₹100 notes. Each denomination handler either handles the request or passes the remainder to the next handler in the chain.

## How to Identify When to Use It

- More than one handler can process a request, and the handler is determined at runtime
- You want to decouple the sender from multiple potential receivers
- The set of handlers should be configurable or extensible without changing existing code
- You want to implement a pipeline/filter chain where each stage processes or transforms data and optionally passes it on

**Questions to ask yourself:** Can I represent each processing step as a link in a chain? Would adding a new handler require touching a central dispatcher?

**Red flags:** A massive `if/elif` or `switch/match` that dispatches requests based on type or priority; hard-coded handler references coupled together in a single decision method.

## How to Apply It

1. Define a **Handler** interface with a method to handle a request and a reference to the next handler.
2. Each concrete handler decides whether to handle the request or pass it to the next handler.
3. Handlers are linked in a chain — the order matters.
4. Client constructs the chain and sends the first request to the head of the chain.

```python
from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Optional


# --- Handler interface ---

class LogHandler(ABC):
    _next: Optional[LogHandler] = None

    def set_next(self, handler: LogHandler) -> LogHandler:
        self._next = handler
        return handler  # for chaining

    @abstractmethod
    def handle(self, level: str, message: str) -> None:
        ...


# --- Concrete handlers ---

class DebugHandler(LogHandler):
    def handle(self, level: str, message: str) -> None:
        if level == "DEBUG":
            print(f"[DEBUG] {message}")
        elif self._next:
            self._next.handle(level, message)


class InfoHandler(LogHandler):
    def handle(self, level: str, message: str) -> None:
        if level == "INFO":
            print(f"[INFO] {message}")
        elif self._next:
            self._next.handle(level, message)


class WarnHandler(LogHandler):
    def handle(self, level: str, message: str) -> None:
        if level == "WARN":
            print(f"[WARN] {message}")
        elif self._next:
            self._next.handle(level, message)


class ErrorHandler(LogHandler):
    def handle(self, level: str, message: str) -> None:
        if level == "ERROR":
            print(f"[ERROR] {message}")
            # In a real logger, we might also write to stderr, send alert, etc.
        elif self._next:
            self._next.handle(level, message)


if __name__ == "__main__":
    # Build chain: DEBUG → INFO → WARN → ERROR
    chain = DebugHandler()
    chain.set_next(InfoHandler()).set_next(WarnHandler()).set_next(ErrorHandler())

    chain.handle("INFO", "Server started on port 8080")
    chain.handle("DEBUG", "Connection pool initialised")
    chain.handle("WARN", "Memory usage above 80%")
    chain.handle("ERROR", "Out of disk space")
```

## Real-World Example

```python
# Middleware pipeline — HTTP request flows through a chain of middleware.

from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Dict, Optional


@dataclass
class Request:
    path: str
    method: str
    headers: Dict[str, str] = field(default_factory=dict)
    body: Any = None


@dataclass
class Response:
    status: int = 200
    body: str = ""


class Middleware(ABC):
    _next: Optional[Middleware] = None

    def set_next(self, middleware: Middleware) -> Middleware:
        self._next = middleware
        return middleware

    @abstractmethod
    def handle(self, request: Request, response: Response) -> None:
        ...


# --- Concrete middleware ---

class LoggingMiddleware(Middleware):
    def handle(self, request: Request, response: Response) -> None:
        print(f"[LOG] {request.method} {request.path}")
        if self._next:
            self._next.handle(request, response)
        print(f"[LOG] Response: {response.status}")


class AuthMiddleware(Middleware):
    def handle(self, request: Request, response: Response) -> None:
        token = request.headers.get("Authorization")
        if not token:
            response.status = 401
            response.body = "Unauthorized"
            return  # Chain stops here
        if token != "valid-token":
            response.status = 403
            response.body = "Forbidden"
            return
        print("[AUTH] Authenticated")
        if self._next:
            self._next.handle(request, response)


class RateLimitMiddleware(Middleware):
    _request_count: int = 0

    def handle(self, request: Request, response: Response) -> None:
        self._request_count += 1
        if self._request_count > 5:
            response.status = 429
            response.body = "Too Many Requests"
            return
        print(f"[RATE] Request #{self._request_count}")
        if self._next:
            self._next.handle(request, response)


class RouterMiddleware(Middleware):
    def handle(self, request: Request, response: Response) -> None:
        if request.path == "/health":
            response.body = "OK"
        elif request.path == "/hello":
            response.body = "Hello, World!"
        else:
            response.status = 404
            response.body = "Not Found"
        # Router is the terminal handler — does not forward


if __name__ == "__main__":
    # Build chain: Logging → Auth → RateLimit → Router
    chain = LoggingMiddleware()
    chain.set_next(AuthMiddleware()).set_next(RateLimitMiddleware()).set_next(RouterMiddleware())

    req = Request("/hello", "GET", {"Authorization": "valid-token"})
    res = Response()
    chain.handle(req, res)
    print(f"Result: {res.status} {res.body}")

    # Without auth token
    req2 = Request("/health", "GET", {})
    res2 = Response()
    chain.handle(req2, res2)
    print(f"Result: {res2.status} {res2.body}")
```

## Common Mistakes / Pitfalls

- **Broken chain**: forgetting to call `self._next.handle()` in a middleware that should forward the request. This silently terminates the chain.
- **Handler ordering**: the chain's behaviour depends heavily on handler order. Document the expected order and test it (e.g., auth must come before rate-limiting to avoid unauthenticated rate-limit consumption).
- **No terminal handler**: ensure the last handler in the chain either handles all cases or is guaranteed to match. An unhandled request falls through silently.
- **Shared mutable state**: if handlers modify shared state (e.g., request/response objects), ensure the modifications are expected by downstream handlers. Consider immutability or copy-on-forward.
- **Exception swallowing**: handlers that catch broad exceptions and continue the chain can make debugging impossible. Log or re-raise appropriately.

## Related Concepts

- **Decorator** — similar chain structure, but Decorator adds behaviour dynamically around an object, while CoR passes a request through a chain where one handler takes ownership.
- **Command** — often queued and passed through a chain of responsibility for processing (e.g., command pipeline).
- **Observer** — both decouple sender and receiver, but Observer broadcasts to all subscribers, while CoR sends to exactly one handler (or one path).
- **Middleware / Pipeline** — architectural patterns that are direct applications of CoR.

# Abstraction

## What Problem Does It Solve?
Abstraction solves the problem of overwhelming complexity by hiding implementation details and exposing only what's necessary to use a component. Without abstraction, callers would need to understand every internal detail — databases, network protocols, algorithms — just to perform a simple operation.

Think of **driving a car**. You interact with the steering wheel, pedals, and gear shift. You don't need to understand the combustion cycle, fuel injection timing, or transmission gear ratios to drive. The car abstracts all of that behind a simple interface. Abstraction in OOP does the same: it defines *what* an object does, not *how* it does it.

## How to Identify When to Use It
- A component has complex internal logic that callers shouldn't need to understand
- You want to swap implementations without changing callers
- You need to define a contract between different parts of a system
- Multiple developers work on different layers and need clear boundaries
- You want to reduce cognitive load and make the code self-documenting

**Questions to ask yourself:**
- What is the minimum interface this component needs to expose?
- Can a new team member use this class without reading its internals?
- If I rewrite the implementation, would callers even notice?

**Red flags:** A single class that requires reading 500+ lines to use correctly, methods that return raw implementation objects, leaky abstractions that expose internal errors (e.g., `SQLite3.OperationalError` bubbling up to the UI).

## How to Apply It
1. Identify the essential operations a caller needs
2. Define an interface (abstract base class) that captures those operations
3. Implement the interface in concrete classes
4. Write callers against the interface only
5. Keep interfaces small — each method should answer "what, not how"

```python
from abc import ABC, abstractmethod

class Cache(ABC):
    """Abstract cache — caller stores and retrieves data by key."""
    @abstractmethod
    def get(self, key: str) -> str | None:
        pass

    @abstractmethod
    def set(self, key: str, value: str, ttl_seconds: int = 300) -> None:
        pass

    @abstractmethod
    def delete(self, key: str) -> bool:
        pass

class RedisCache(Cache):
    def __init__(self, host: str = "localhost"):
        import redis
        self._client = redis.Redis(host=host)

    def get(self, key: str) -> str | None:
        val = self._client.get(key)
        return val.decode() if val else None

    def set(self, key: str, value: str, ttl_seconds: int = 300) -> None:
        self._client.setex(key, ttl_seconds, value)

    def delete(self, key: str) -> bool:
        return bool(self._client.delete(key))

class InMemoryCache(Cache):
    def __init__(self):
        self._store: dict[str, tuple[str, float]] = {}

    def get(self, key: str) -> str | None:
        if key not in self._store:
            return None
        value, expires = self._store[key]
        import time
        if time.time() > expires:
            del self._store[key]
            return None
        return value

    def set(self, key: str, value: str, ttl_seconds: int = 300) -> None:
        import time
        self._store[key] = (value, time.time() + ttl_seconds)

    def delete(self, key: str) -> bool:
        return self._store.pop(key, None) is not None

# Caller only knows about Cache, never RedisCache or InMemoryCache directly
class UserService:
    def __init__(self, cache: Cache):
        self._cache = cache

    def get_user_display_name(self, user_id: str) -> str:
        cached = self._cache.get(f"user:{user_id}:name")
        if cached:
            return cached
        # Simulate DB fetch
        name = f"User_{user_id}"
        self._cache.set(f"user:{user_id}:name", name)
        return name
```

## Real-World Example
A **payment gateway abstraction** that shields the checkout flow from the specifics of Stripe, PayPal, or Square.

```python
from abc import ABC, abstractmethod

class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: float, currency: str, token: str) -> dict:
        pass

    @abstractmethod
    def refund(self, transaction_id: str) -> dict:
        pass

class StripeGateway(PaymentGateway):
    def __init__(self, api_key: str):
        import stripe
        stripe.api_key = api_key

    def charge(self, amount: float, currency: str, token: str) -> dict:
        charge = stripe.Charge.create(amount=int(amount * 100), currency=currency, source=token)
        return {"id": charge.id, "status": charge.status, "amount": amount}

    def refund(self, transaction_id: str) -> dict:
        refund = stripe.Refund.create(charge=transaction_id)
        return {"id": refund.id, "status": refund.status}

class PayPalGateway(PaymentGateway):
    def __init__(self, client_id: str, client_secret: str):
        # Setup PayPal SDK
        ...

    def charge(self, amount: float, currency: str, token: str) -> dict:
        # PayPal-specific API calls
        return {"id": "pp_123", "status": "completed", "amount": amount}

    def refund(self, transaction_id: str) -> dict:
        return {"id": f"refund_{transaction_id}", "status": "completed"}

class CheckoutService:
    def __init__(self, gateway: PaymentGateway):
        self._gateway = gateway

    def process_order(self, order_total: float, payment_token: str) -> dict:
        result = self._gateway.charge(order_total, "USD", payment_token)
        if result["status"] != "completed":
            raise Exception("Payment failed")
        return result
```

`CheckoutService` is completely decoupled from the payment provider. You can switch from Stripe to PayPal by swapping the gateway object — zero changes to checkout logic.

## Common Mistakes / Pitfalls
- **Leaky abstractions**: When internal details leak through (e.g., `RedisCache.get()` raises a Redis-specific timeout exception). Catch and wrap these in your own exceptions.
- **Over-abstraction**: Adding interfaces for everything (even `User user = new User()`) adds indirection without value. Abstract when you have (or realistically anticipate) multiple implementations.
- **Poorly named abstractions**: Calling something `Manager` or `Handler` reveals nothing about what it does. The abstraction name should clearly convey the contract.
- **Abstract classes with implementation details**: If an abstract class has concrete methods that depend on specific subclasses, it's doing too much. Keep abstract classes purely abstract or provide truly generic defaults.
- **The "one layer of indirection" trap**: Every abstraction layer adds cognitive and performance overhead. Two or three layers deep is often enough; beyond that, refactor.


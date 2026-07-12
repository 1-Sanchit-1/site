# Proxy (Structural)

## What Problem Does It Solve?

You need to control access to an object — for lazy loading, access control, caching, logging, or remote communication — without changing the object's code. The Proxy acts as a substitute or placeholder that controls access to the real object. Think of a **credit card as proxy for a bank account**: the card provides a controlled interface (tap/pin/limit) to the underlying account without exposing the vault directly.

## How to Identify When to Use It

- Creating the real object is expensive (heavy computation, network call, large file I/O)
- You need to restrict access based on user roles
- You want to cache results of an expensive operation transparently
- You need a local representative for a remote object
- You want to add logging or metrics without modifying the real object

**Questions to ask yourself:** Can I defer object creation until absolutely needed? Am I repeating the same access-control or caching logic across callers?

**Red flags:** Objects created at startup that are rarely used; `if user.is_admin` checks scattered everywhere; manual caching alongside every method call.

## How to Apply It

1. Define a **Subject** interface common to both the RealSubject and Proxy.
2. Implement **RealSubject** — the object doing actual work.
3. Implement **Proxy** — holds a reference to RealSubject and controls access. Choose the proxy type:
   - **Lazy (Virtual) Proxy**: defers creation until first use.
   - **Protection Proxy**: checks permissions before delegating.
   - **Cache Proxy**: returns cached results when possible.
   - **Logging Proxy**: records calls and parameters.
   - **Remote Proxy**: communicates with an object in another address space.

```python
from abc import ABC, abstractmethod
import time


# --- Subject ---

class Image(ABC):
    @abstractmethod
    def display(self) -> None:
        ...


# --- RealSubject ---

class HighResImage(Image):
    def __init__(self, filename: str) -> None:
        self._filename = filename
        self._load_from_disk()

    def _load_from_disk(self) -> None:
        print(f"  Loading high-res image from {self._filename}...")
        time.sleep(1.5)  # Simulate expensive I/O

    def display(self) -> None:
        print(f"Displaying {self._filename}")


# --- Lazy Proxy ---

class LazyImageProxy(Image):
    def __init__(self, filename: str) -> None:
        self._filename = filename
        self._real: HighResImage | None = None

    def display(self) -> None:
        if self._real is None:
            self._real = HighResImage(self._filename)
        self._real.display()


# --- Protection Proxy ---

class ProtectedImageProxy(Image):
    def __init__(self, filename: str, user_role: str) -> None:
        self._filename = filename
        self._user_role = user_role
        self._real: HighResImage | None = None

    def display(self) -> None:
        if self._user_role not in ("admin", "editor"):
            raise PermissionError(f"{self._user_role} cannot view {self._filename}")
        if self._real is None:
            self._real = HighResImage(self._filename)
        self._real.display()


# --- Cache Proxy ---

class CachedImageProxy(Image):
    _cache: dict[str, HighResImage] = {}

    def __init__(self, filename: str) -> None:
        self._filename = filename

    def display(self) -> None:
        if self._filename not in self._cache:
            self._cache[self._filename] = HighResImage(self._filename)
        self._cache[self._filename].display()


# --- Usage ---

if __name__ == "__main__":
    # Lazy — image not loaded until display() is called
    img = LazyImageProxy("photo.jpg")
    print("Proxy created — no disk I/O yet")
    img.display()
    img.display()  # only loaded once

    # Protection
    try:
        guest = ProtectedImageProxy("secret.png", "guest")
        guest.display()
    except PermissionError as e:
        print(f"Access denied: {e}")
```

## Real-World Example

```python
# Remote API proxy — caches results and handles retries transparently

from dataclasses import dataclass
from typing import Any
import json


class WeatherApi(ABC):
    @abstractmethod
    def fetch_forecast(self, city: str) -> dict[str, Any]:
        ...


class RemoteWeatherService(WeatherApi):
    """Real subject — makes HTTP calls (simulated)."""

    def fetch_forecast(self, city: str) -> dict[str, Any]:
        print(f"  [HTTP GET] api.weather.com/forecast?city={city}")
        return {"city": city, "temp": 22, "condition": "sunny"}


class CachedWeatherProxy(WeatherApi):
    def __init__(self) -> None:
        self._real = RemoteWeatherService()
        self._cache: dict[str, dict[str, Any]] = {}

    def fetch_forecast(self, city: str) -> dict[str, Any]:
        if city in self._cache:
            print(f"  [CACHE HIT] {city}")
            return self._cache[city]

        result = self._real.fetch_forecast(city)
        self._cache[city] = result
        return result


class LoggingWeatherProxy(WeatherApi):
    def __init__(self, wrapped: WeatherApi) -> None:
        self._wrapped = wrapped

    def fetch_forecast(self, city: str) -> dict[str, Any]:
        start = time.time()
        try:
            result = self._wrapped.fetch_forecast(city)
            elapsed = time.time() - start
            print(f"  [METRIC] fetch_forecast({city}) took {elapsed:.3f}s")
            return result
        except Exception as e:
            print(f"  [ERROR] fetch_forecast({city}): {e}")
            raise


# Compose proxies
service = LoggingWeatherProxy(CachedWeatherProxy())
print(service.fetch_forecast("London"))
print(service.fetch_forecast("London"))  # hits cache
```

## Common Mistakes / Pitfalls

- **Proxy and RealSubject diverge**: any change to the Subject interface must be reflected in both; use an ABC to enforce it.
- **Over-engineering**: simple lazy initialisation in the class itself (e.g. `@property` with `if self._x is None`) may be enough without a full proxy class.
- **Cache invalidation**: cache proxies must handle staleness — add TTL or eviction policies.
- **Proxy doing too much**: a proxy should forward calls, not reimplement them.
- **Not distinguishing from Decorator**: both wrap an object — Proxy controls access, Decorator adds behaviour.

## Related Concepts

- **Decorator** — same wrapper structure, different intent: add behaviour vs. control access.
- **Adapter** — changes the interface; Proxy keeps the same interface.
- **Facade** — provides a simplified interface to a subsystem; Proxy provides the same interface with controlled access.

# Prototype (Creational)

## What Problem Does It Solve?

Creating an object from scratch is **expensive** (costly I/O, heavy computation, complex initialization). Instead of rebuilding, you clone an existing object and tweak the copy.

**Analogy:** Dolly the sheep was the first mammal cloned from an adult cell. Instead of creating a new sheep from scratch (which requires years of breeding), scientists copied Dolly's genetic blueprint. In programming, you clone a pre-built "template" object rather than reconstructing it step by step.

## How to Identify When to Use It

- Object creation involves expensive operations (DB queries, file reads, network calls)
- Many objects share the same base state but differ in a few fields
- You need copies of objects at runtime (undo, caching, spawning)
- Object constructors are complex and you want to avoid repeating initialization

**Questions to ask yourself:**
- "Is the time/memory cost of construction high compared to copying?"
- "Do I need multiple objects that are mostly the same with minor variations?"

**Red flags:**
- You're hitting a database during construction just to set defaults
- You deep-copy complex objects manually field by field (and forget some)
- Object creation is a bottleneck in your profiling results

## How to Apply It

1. Add a `clone()` method to the class
2. Decide between shallow copy (shared references) and deep copy (independent copies)
3. (Optional) Create a **prototype registry** that stores pre-configured prototypes
4. Clone and customize instead of constructing from scratch

```python
import copy
from dataclasses import dataclass, field


@dataclass
class GameEntity:
    name: str
    health: int
    position: list[int]
    inventory: list[str]

    def clone(self, **overrides) -> "GameEntity":
        cloned = copy.deepcopy(self)
        for key, value in overrides.items():
            setattr(cloned, key, value)
        return cloned


# Creating an orc from scratch (expensive setup simulated)
orc_template = GameEntity(
    name="Orc",
    health=100,
    position=[0, 0],
    inventory=["sword", "shield"],
)

# Cloning is cheap
orc1 = orc_template.clone(position=[10, 20])
orc2 = orc_template.clone(position=[30, 40], health=150, inventory=["axe"])
orc3 = orc_template.clone(position=[50, 60])

print(orc1.name, orc1.health, orc1.position)
print(orc2.name, orc2.health, orc2.position)
print(orc3.name, orc3.health, orc3.position)
# All are independent copies
```

## Real-World Example

```python
import copy
from dataclasses import dataclass, field
from typing import Any


@dataclass
class CacheEntry:
    key: str
    data: Any
    ttl_seconds: int
    metadata: dict[str, Any] = field(default_factory=dict)
    tags: list[str] = field(default_factory=list)

    def clone(self, **overrides) -> "CacheEntry":
        return copy.deepcopy(self)._apply(overrides)

    def _apply(self, overrides: dict) -> "CacheEntry":
        for k, v in overrides.items():
            setattr(self, k, v)
        return self


class CachePrototypeRegistry:
    """Stores pre-configured prototypes for common cache patterns."""

    def __init__(self):
        self._prototypes: dict[str, CacheEntry] = {}

    def register(self, name: str, prototype: CacheEntry):
        self._prototypes[name] = prototype

    def create(self, name: str, **overrides) -> CacheEntry:
        proto = self._prototypes.get(name)
        if proto is None:
            raise KeyError(f"Unknown prototype: {name}")
        return proto.clone(**overrides)


def expensive_user_fetch(user_id: str) -> CacheEntry:
    """Simulate an expensive operation that constructs a cache entry."""
    return CacheEntry(
        key=f"user:{user_id}",
        data={"id": user_id, "name": "Load...", "email": "load..."},
        ttl_seconds=3600,
        tags=["user", f"region:us-east-1"],
        metadata={"source": "db"},
    )


# --- Usage ---
registry = CachePrototypeRegistry()

# Register a prototype (simulates the expensive creation once)
user_template = expensive_user_fetch("template")
registry.register("user", user_template)

# Fast clones with minor overrides
entry1 = registry.create("user", key="user:42", data={"id": 42, "name": "Alice"})
entry2 = registry.create("user", key="user:99", data={"id": 99, "name": "Bob"}, ttl_seconds=7200)

print(entry1.key, entry1.data["name"])
print(entry2.key, entry2.data["name"])
print(entry1.tags, entry2.tags)  # Shared tag structure, independent copies
```

## Common Mistakes / Pitfalls

- **Shallow vs deep copy confusion:** Shallow copy shares references to mutable fields (lists, dicts). Mutating a list in a clone can affect the original. Use `copy.deepcopy` unless you intentionally want sharing.
- **Circular references:** `deepcopy` handles circular references, but it's slower. If performance matters, consider serialization-based cloning (pickle/json) or manual shallow clone.
- **Not including `clone()` in the interface:** If consuming code expects all objects to be cloneable, define a `Prototype` protocol/ABC.
- **Over-registering:** Prototype registries can become "god objects" with every variant known upfront. Use them for stable, reusable templates, not every possible configuration.

## Related Concepts

- Flyweight — shares objects rather than copying them (opposite goal)
- Factory Method — prototype is an alternative to factories for creating objects
- Memento — uses prototypes for snapshot/undo functionality
- `copy.copy` / `copy.deepcopy` — Python's built-in cloning tools

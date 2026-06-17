# YAGNI (You Ain't Gonna Need It)

## What Problem Does It Solve?
Developers love building for a future that never arrives. "We might need caching soon," "users will probably want CSV export," "let's make it configurable via XML." Every speculative feature carries a cost: complexity, testing burden, cognitive overhead, and code that gets in the way when you finally build the *actual* feature you need. YAGNI says: build it when you need it, not when you imagine it.

**Analogy:** You're not pregnant, not planning a family, and have no partner. But you see a cute baby onesie on sale and buy it — "just in case." Years pass. It sits in a drawer, taking up space, reminding you of a hypothetical life. Meanwhile, you could have used that money and closet space for things you actually need today.

## How to Identify When to Use It

- Are you adding configuration parameters before there are multiple consumers?
- Are you designing for "extensibility" without a concrete extension in mind?
- Do you have abstract base classes with only one implementation?
- Are you adding feature flags for a feature that doesn't exist yet?
- Do you have "TODO: handle X later" code paths that currently raise `NotImplementedError`?
- Are you storing data you don't query?
- **Red flag:** You justify the work with "we'll probably need this eventually."

## How to Apply It

1. **Write the test that forces the feature.** Don't build anything you can't immediately verify.
2. **Ask "what breaks if I don't build this?"** If the answer is "nothing," don't build it.
3. **Delete dead code aggressively.** If it's not called, it's just weight.
4. **Prefer concrete implementations over abstractions.** Extract an interface when you have a second implementation, not before.
5. **Use the simplest data structure that works.** Don't reach for a graph database to store a key-value pair.

```python
# BEFORE: Future-proofing that isn't needed yet
from abc import ABC, abstractmethod
from typing import Optional

class DataExporter(ABC):
    """Abstract exporter — we might need JSON, XML, CSV, and Parquet later."""

    @abstractmethod
    def export(self, data: list[dict]) -> str:
        pass

class JsonExporter(DataExporter):
    def export(self, data: list[dict]) -> str:
        import json
        return json.dumps(data)

def export_data(data: list[dict], fmt: str = "json") -> str:
    exporters = {"json": JsonExporter()}
    exporter = exporters.get(fmt)
    if exporter is None:
        raise ValueError(f"Unknown format: {fmt}")
    return exporter.export(data)

# AFTER: Only what you need today
def export_data(data: list[dict]) -> str:
    import json
    return json.dumps(data)
```

## Real-World Example

**Before** — An analytics tracker built to support multiple backends and batching, but only ever uses one:

```python
from abc import ABC, abstractmethod
from typing import Optional

class AnalyticsBackend(ABC):
    @abstractmethod
    def send(self, event: str, data: dict): ...

class SegmentBackend(AnalyticsBackend):
    def send(self, event: str, data: dict):
        print(f"[Segment] {event}: {data}")

class BatchedAnalytics:
    def __init__(self, backend: AnalyticsBackend, flush_interval: int = 30):
        self._backend = backend
        self._buffer = []
        self._flush_interval = flush_interval

    def track(self, event: str, data: Optional[dict] = None):
        self._buffer.append((event, data or {}))
        if len(self._buffer) >= 10:
            self.flush()

    def flush(self):
        for event, data in self._buffer:
            self._backend.send(event, data)
        self._buffer.clear()

# Usage
analytics = BatchedAnalytics(SegmentBackend())
analytics.track("page_view", {"url": "/home"})
```

**After** — Delete everything that isn't needed:

```python
def track_event(event: str, data: dict | None = None):
    print(f"[Segment] {event}: {data or {}}")

track_event("page_view", {"url": "/home"})
```

## Common Mistakes / Pitfalls

- **Confusing YAGNI with bad architecture.** YAGNI doesn't mean "no design." It means "no speculative complexity." Good architecture for *today's* requirements is still necessary.
- **The sunk-cost fallacy of unused code.** "It's already written, might as well keep it." Delete it. You can always resurrect it from version control.
- **Over-correcting and building rigid systems.** YAGNI is a principle, not a dogma. If you know with high confidence a requirement is coming (e.g., a regulatory deadline), prepare for it.
- **Ignoring operational concerns.** "We don't need logging yet" is a false economy. A principle is a guide, not a straitjacket.

## Related Concepts

- [KISS — Keep It Simple, Stupid](kiss.md)
- [DRY — Don't Repeat Yourself](dry.md)
- [SoC — Separation of Concerns](soc.md)

# Observer (Behavioral)

## What Problem Does It Solve?

You have one object (subject) whose state changes need to be communicated to an unknown number of dependent objects (observers) without coupling them tightly. Polling is wasteful and fragile. The Observer pattern defines a one-to-many dependency so that when the subject changes state, all its dependents are notified automatically. Think of the **YouTube subscriber bell**: one creator uploads a video, and the platform pushes a notification to every subscriber — the creator never needs to know who subscribed or how they consume the content.

## How to Identify When to Use It

- Changes to one object require updating others, but you don't know how many objects need updating up front
- Objects need to observe state changes without owning the subject's lifecycle
- You find yourself writing tight coupling where objects directly call update methods on each other
- A change in one place triggers cascading updates in many unrelated parts of the codebase

**Questions to ask yourself:** Would a pub/sub model simplify this interaction? Could I add a new kind of observer without touching the subject?

**Red flags:** A subject class injecting itself into dozens of unrelated classes; update logic sprinkled across event handlers in tightly coupled callbacks.

## How to Apply It

1. Define a **Subject** interface with methods to attach, detach, and notify observers.
2. Define an **Observer** interface with a single `update` method.
3. Implement concrete subjects that store observer references and call `notify` when state changes.
4. Implement concrete observers that register with a subject and react to notifications.
5. Client code wires subjects and observers together.

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List


# --- Observer interface ---

class Observer(ABC):
    @abstractmethod
    def update(self, subject: "Subject") -> None:
        ...


# --- Subject interface ---

class Subject(ABC):
    @abstractmethod
    def attach(self, observer: Observer) -> None:
        ...

    @abstractmethod
    def detach(self, observer: Observer) -> None:
        ...

    @abstractmethod
    def notify(self) -> None:
        ...


# --- Concrete Subject ---

@dataclass
class NewsPublisher(Subject):
    _observers: List[Observer] = field(default_factory=list)
    _latest_headline: str = ""

    def attach(self, observer: Observer) -> None:
        self._observers.append(observer)

    def detach(self, observer: Observer) -> None:
        self._observers.remove(observer)

    def notify(self) -> None:
        for obs in self._observers:
            obs.update(self)

    def publish_headline(self, headline: str) -> None:
        self._latest_headline = headline
        self.notify()

    @property
    def headline(self) -> str:
        return self._latest_headline


# --- Concrete Observers ---

class EmailSubscriber(Observer):
    def __init__(self, name: str) -> None:
        self.name = name

    def update(self, subject: Subject) -> None:
        if isinstance(subject, NewsPublisher):
            print(f"[Email] {self.name} notified: {subject.headline}")


class SMSSubscriber(Observer):
    def __init__(self, phone: str) -> None:
        self.phone = phone

    def update(self, subject: Subject) -> None:
        if isinstance(subject, NewsPublisher):
            print(f"[SMS] {self.phone} alerted: {subject.headline}")


if __name__ == "__main__":
    publisher = NewsPublisher()

    alice = EmailSubscriber("Alice")
    bob = SMSSubscriber("+1-555-0100")

    publisher.attach(alice)
    publisher.attach(bob)

    publisher.publish_headline("AI Achieves Sentience, Demands Coffee Break")
```

## Real-World Example

```python
# Event-driven analytics pipeline: multiple consumers react to a single event stream.

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Dict, List
from datetime import datetime


class Event(ABC):
    pass


@dataclass
class OrderPlaced(Event):
    order_id: str
    user_id: str
    total: float
    timestamp: datetime = field(default_factory=datetime.utcnow)


class EventBus:
    """Simple pub/sub event bus."""
    def __init__(self) -> None:
        self._subscribers: Dict[type, List[Any]] = {}

    def subscribe(self, event_type: type, handler: Any) -> None:
        self._subscribers.setdefault(event_type, []).append(handler)

    def publish(self, event: Event) -> None:
        for handler in self._subscribers.get(type(event), []):
            handler(event)


# --- Observers / Event Handlers ---

def send_confirmation_email(event: OrderPlaced) -> None:
    print(f"[Email] Confirmation sent to user {event.user_id} for order {event.order_id}")


def update_inventory(event: OrderPlaced) -> None:
    print(f"[Inventory] Reserved stock for order {event.order_id}")


def log_to_analytics(event: OrderPlaced) -> None:
    print(f"[Analytics] Order {event.order_id} — ${event.total:.2f} at {event.timestamp}")


if __name__ == "__main__":
    bus = EventBus()
    bus.subscribe(OrderPlaced, send_confirmation_email)
    bus.subscribe(OrderPlaced, update_inventory)
    bus.subscribe(OrderPlaced, log_to_analytics)

    bus.publish(OrderPlaced(order_id="ORD-001", user_id="usr_42", total=59.99))
```

## Common Mistakes / Pitfalls

- **Observer holds reference to subject (memory leak)**: always provide a `detach` mechanism and ensure observers unsubscribe when no longer needed.
- **Notification storms**: rapid cascading updates (observer A updates subject B, which notifies observer C, which updates subject A) can cause infinite loops. Guard with state-change checks.
- **Ordering assumptions**: observers should not depend on the order they are notified. If order matters, the pattern is likely the wrong abstraction.
- **Too many notifications**: notify only when the relevant state actually changes, not on every property setter call.

## Related Concepts

- **Mediator** — centralises communication between objects; Observer distributes communication.
- **Event-Driven Architecture** — a large-scale application of Observer across service boundaries.
- **MVC (Model-View-Controller)** — the View observes the Model; the Observer pattern is the backbone of MVC's reactive updates.

# Interface Segregation Principle

## What Problem Does It Solve?
The Interface Segregation Principle (ISP) solves the problem of "fat interfaces" that force implementors to provide methods they don't need. When a single interface tries to cover every possible use case, classes implementing it end up with empty method bodies, `NotImplementedError` stubs, or confusing behavior for unused methods.

Think of a **restaurant menu** organized into sections (Appetizers, Main Course, Desserts, Drinks). A customer who only wants a drink doesn't need to look through the entire menu or pay for a full course. A well-segmented interface works the same way: consumers depend only on the methods they actually use, not on everything the system can do.

## How to Identify When to Use It
- A class implements an interface with methods it doesn't need (empty bodies or `raise NotImplementedError`)
- You see fat interfaces with 10+ methods
- Changing one method signature on an interface forces updates across unrelated classes
- Clients depend on methods they never call (passing unused dependencies)
- The interface contains multiple distinct "categories" of behavior

**Questions to ask yourself:**
- Do all methods on this interface make sense together? Or are there two or three "groups"?
- Would any implementor ever want to implement only half of these methods?
- If I split this interface, would the caller and implementor be happier?

**Red flags:** Interfaces named `IEverythingService`, `Manager`, or `AllInOne`. Classes with `pass` methods. Comments like "not supported" next to an implementation. Wide interfaces that are implemented by a single class (might still be okay, but worth examining).

## How to Apply It
1. Identify different "roles" or "clients" that use the interface
2. Extract each role's specific needs into a separate, focused interface
3. Have concrete classes implement only the interfaces they need
4. Keep interfaces small — typically 1–5 methods

```python
from abc import ABC, abstractmethod

# ❌ Before — Fat interface forces all workers to implement everything
class WorkerInterface(ABC):
    @abstractmethod
    def work(self) -> None:
        pass

    @abstractmethod
    def eat(self) -> None:
        pass

    @abstractmethod
    def sleep(self) -> None:
        pass

class HumanWorker(WorkerInterface):
    def work(self) -> None:
        print("Human working")

    def eat(self) -> None:
        print("Human eating")

    def sleep(self) -> None:
        print("Human sleeping")

class RobotWorker(WorkerInterface):
    def work(self) -> None:
        print("Robot working (never stops)")

    def eat(self) -> None:
        raise NotImplementedError("Robots don't eat")  # ❌

    def sleep(self) -> None:
        pass  # ❌ Lying — robot doesn't sleep but caller thinks it does

# ✅ After — Segregated interfaces
class Workable(ABC):
    @abstractmethod
    def work(self) -> None:
        pass

class Eatable(ABC):
    @abstractmethod
    def eat(self) -> None:
        pass

class Sleepable(ABC):
    @abstractmethod
    def sleep(self) -> None:
        pass

class HumanWorker(Workable, Eatable, Sleepable):
    def work(self) -> None:
        print("Human working")

    def eat(self) -> None:
        print("Human eating")

    def sleep(self) -> None:
        print("Human sleeping")

class RobotWorker(Workable):
    def work(self) -> None:
        print("Robot working (never stops)")
    # No eat() or sleep() — not needed, no stubs
```

## Real-World Example
A **notification system** where different notification types have different capabilities (some can schedule, some can include attachments, some can only send text).

```python
from abc import ABC, abstractmethod

# Segregated interfaces — each covers one capability
class TextSender(ABC):
    @abstractmethod
    def send_text(self, to: str, message: str) -> None:
        pass

class Schedulable(ABC):
    @abstractmethod
    def schedule(self, to: str, message: str, at: str) -> None:
        pass

class Attachable(ABC):
    @abstractmethod
    def send_with_attachment(self, to: str, message: str, file_path: str) -> None:
        pass

# Each notification type implements only what it supports
class EmailNotifier(TextSender, Schedulable, Attachable):
    def send_text(self, to: str, message: str) -> None:
        print(f"Emailing {to}: {message}")

    def schedule(self, to: str, message: str, at: str) -> None:
        print(f"Scheduling email to {to} at {at}: {message}")

    def send_with_attachment(self, to: str, message: str, file_path: str) -> None:
        print(f"Emailing {to} with attachment {file_path}: {message}")

class SMSNotifier(TextSender, Schedulable):
    def send_text(self, to: str, message: str) -> None:
        print(f"Texting {to}: {message}")

    def schedule(self, to: str, message: str, at: str) -> None:
        print(f"Scheduling SMS to {to} at {at}: {message}")
    # No send_with_attachment — SMS doesn't support it

class PushNotifier(TextSender):
    def send_text(self, to: str, message: str) -> None:
        print(f"Push notification to {to}: {message}")
    # No scheduling, no attachments — just send

# Callers only depend on what they need
class AlertService:
    def __init__(self, sender: TextSender):
        self._sender = sender  # only needs text sending

    def send_alert(self, user_id: str, alert: str) -> None:
        self._sender.send_text(user_id, alert)

class ScheduledReportService:
    def __init__(self, scheduler: Schedulable):
        self._scheduler = scheduler  # only needs scheduling

    def send_report(self, email: str, when: str) -> None:
        self._scheduler.schedule(email, "Monthly report ready", when)
```

`SMSNotifier` doesn't have a useless `send_with_attachment` stub. `PushNotifier` doesn't need a `schedule` stub. Each class implements only what it genuinely supports.

## Common Mistakes / Pitfalls
- **Over-segmentation**: An interface with one method is fine, but if you have 15 single-method interfaces, you've probably gone too far. Group related behaviors together.
- **Ignoring the client perspective**: ISP is about the client's needs, not the implementor's convenience. Split interfaces when clients need different subsets of functionality.
- **Leaky abstractions in Python**: Python doesn't enforce interfaces at compile time. Document the interface contract clearly even if using duck typing.
- **Not applying ISP to function parameters**: A function that accepts a large interface but only uses one method forces callers to provide a large object. Accept the specific type you need.
- **Interface proliferation**: Creating a new interface for every single client can lead to too many types. Find the natural groupings before splitting.


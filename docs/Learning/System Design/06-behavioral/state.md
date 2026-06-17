# State (Behavioral)

## What Problem Does It Solve?

An object needs to change its behaviour when its internal state changes, but implementing this with large `if/elif/else` or `match/case` blocks makes the code hard to read, test, and extend. Adding a new state means modifying every conditional throughout the class. The State pattern lets an object alter its behaviour when its internal state changes, appearing as if the object changed its class. Think of a **traffic light**: the light cycles through Red → Green → Yellow → Red. At Red, cars stop; at Green, they go. The same light object behaves completely differently depending on its current state, with well-defined transitions between states.

## How to Identify When to Use It

- An object's behaviour depends on its state and must change at runtime
- Operations contain large, state-based conditionals that duplicate logic across methods
- State transitions are complex and you want to centralise them
- New states are frequently added, requiring changes across multiple methods

**Questions to ask yourself:** Would extracting each state into its own class make the code simpler? Are the same state checks repeated across many methods?

**Red flags:** The same `if state == X` or `match state` block appearing in five different methods; a class with a "mode" or "status" field that controls everything.

## How to Apply It

1. Define a **State** interface with methods that correspond to the context's behaviour.
2. Implement concrete state classes for each possible state.
3. The **Context** holds a reference to the current state and delegates all state-specific behaviour to it.
4. States are responsible for transitioning the context to other states (each state knows what comes next).
5. Client code interacts with the context and never directly manipulates states.

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field


# --- State interface ---

class OrderState(ABC):
    @abstractmethod
    def pay(self, order: "Order") -> None:
        ...

    @abstractmethod
    def ship(self, order: "Order") -> None:
        ...

    @abstractmethod
    def deliver(self, order: "Order") -> None:
        ...

    @abstractmethod
    def cancel(self, order: "Order") -> None:
        ...


# --- Context ---

@dataclass
class Order:
    order_id: str
    _state: OrderState = field(default=None)

    def __post_init__(self) -> None:
        self._state = NewState()

    def pay(self) -> None:
        self._state.pay(self)

    def ship(self) -> None:
        self._state.ship(self)

    def deliver(self) -> None:
        self._state.deliver(self)

    def cancel(self) -> None:
        self._state.cancel(self)

    def transition_to(self, state: OrderState) -> None:
        print(f"  [{self.order_id}] {self._state.__class__.__name__} → {state.__class__.__name__}")
        self._state = state


# --- Concrete States ---

class NewState(OrderState):
    def pay(self, order: Order) -> None:
        order.transition_to(PaidState())

    def ship(self, order: Order) -> None:
        print("  Cannot ship: order not paid yet")

    def deliver(self, order: Order) -> None:
        print("  Cannot deliver: order not paid yet")

    def cancel(self, order: Order) -> None:
        order.transition_to(CancelledState())


class PaidState(OrderState):
    def pay(self, order: Order) -> None:
        print("  Already paid")

    def ship(self, order: Order) -> None:
        order.transition_to(ShippedState())

    def deliver(self, order: Order) -> None:
        print("  Cannot deliver: order not shipped yet")

    def cancel(self, order: Order) -> None:
        print("  Cannot cancel: payment already processed, request refund instead")


class ShippedState(OrderState):
    def pay(self, order: Order) -> None:
        print("  Already paid")

    def ship(self, order: Order) -> None:
        print("  Already shipped")

    def deliver(self, order: Order) -> None:
        order.transition_to(DeliveredState())

    def cancel(self, order: Order) -> None:
        print("  Cannot cancel: order already in transit")


class DeliveredState(OrderState):
    def pay(self, order: Order) -> None:
        print("  Already paid")

    def ship(self, order: Order) -> None:
        print("  Already delivered")

    def deliver(self, order: Order) -> None:
        print("  Already delivered")

    def cancel(self, order: Order) -> None:
        print("  Cannot cancel: order already delivered")


class CancelledState(OrderState):
    def pay(self, order: Order) -> None:
        print("  Cannot pay: order was cancelled")

    def ship(self, order: Order) -> None:
        print("  Cannot ship: order was cancelled")

    def deliver(self, order: Order) -> None:
        print("  Cannot deliver: order was cancelled")

    def cancel(self, order: Order) -> None:
        print("  Already cancelled")


if __name__ == "__main__":
    order = Order("ORD-001")
    order.pay()       # New → Paid
    order.ship()      # Paid → Shipped
    order.deliver()   # Shipped → Delivered
    order.cancel()    # Already delivered (no-op)
```

## Real-World Example

```python
# Document workflow: Draft → Review → Approved / Rejected → Published.

from abc import ABC, abstractmethod
from dataclasses import dataclass, field


class DocumentState(ABC):
    @abstractmethod
    def submit(self, doc: "Document") -> None:
        ...

    @abstractmethod
    def approve(self, doc: "Document") -> None:
        ...

    @abstractmethod
    def reject(self, doc: "Document") -> None:
        ...

    @abstractmethod
    def publish(self, doc: "Document") -> None:
        ...


@dataclass
class Document:
    title: str
    _state: DocumentState = field(default=None)

    def __post_init__(self) -> None:
        self._state = DraftState()

    def submit(self) -> None:
        self._state.submit(self)

    def approve(self) -> None:
        self._state.approve(self)

    def reject(self) -> None:
        self._state.reject(self)

    def publish(self) -> None:
        self._state.publish(self)

    def transition_to(self, state: DocumentState) -> None:
        print(f"  [{self.title}] {self._state.__class__.__name__} → {state.__class__.__name__}")
        self._state = state


class DraftState(DocumentState):
    def submit(self, doc: Document) -> None:
        doc.transition_to(ReviewState())

    def approve(self, doc: Document) -> None:
        print("  Cannot approve: submit for review first")

    def reject(self, doc: Document) -> None:
        print("  Cannot reject: not in review")

    def publish(self, doc: Document) -> None:
        print("  Cannot publish: submit for review first")


class ReviewState(DocumentState):
    def submit(self, doc: Document) -> None:
        print("  Already in review")

    def approve(self, doc: Document) -> None:
        doc.transition_to(ApprovedState())

    def reject(self, doc: Document) -> None:
        doc.transition_to(RejectedState())

    def publish(self, doc: Document) -> None:
        print("  Cannot publish: waiting for approval")


class ApprovedState(DocumentState):
    def submit(self, doc: Document) -> None:
        print("  Already approved")

    def approve(self, doc: Document) -> None:
        print("  Already approved")

    def reject(self, doc: Document) -> None:
        doc.transition_to(RejectedState())

    def publish(self, doc: Document) -> None:
        doc.transition_to(PublishedState())


class RejectedState(DocumentState):
    def submit(self, doc: Document) -> None:
        doc.transition_to(ReviewState())

    def approve(self, doc: Document) -> None:
        print("  Cannot approve: document was rejected")

    def reject(self, doc: Document) -> None:
        print("  Already rejected")

    def publish(self, doc: Document) -> None:
        print("  Cannot publish: document was rejected")


class PublishedState(DocumentState):
    def submit(self, doc: Document) -> None:
        print("  Already published")

    def approve(self, doc: Document) -> None:
        print("  Already published")

    def reject(self, doc: Document) -> None:
        print("  Cannot reject: already published")

    def publish(self, doc: Document) -> None:
        print("  Already published")


if __name__ == "__main__":
    doc = Document("System Design Guide")
    doc.submit()     # Draft → Review
    doc.approve()    # Review → Approved
    doc.publish()    # Approved → Published
    doc.submit()     # Already published (no-op)
```

## Common Mistakes / Pitfalls

- **State explosion**: if the number of states × actions becomes very large, consider hierarchical state machines or state tables.
- **States knowing too much about each other**: keep transitions explicit — each state only knows the next logical state, not the entire state graph.
- **Mutable state in shared contexts**: if the context is shared across threads, state transitions must be thread-safe (consider immutable state objects or locking).
- **Missing illegal transition handling**: every state must handle every action, even if it just raises an error or is a no-op. An unhandled action should not silently do nothing.

## Related Concepts

- **Strategy** — same class structure, but Strategy is *externally* selected (caller picks algorithm) while State is *internally* driven (current state determines behaviour).
- **Finite State Machine (FSM)** — State pattern is an OO implementation of an FSM.
- **Command** — can be used to trigger state transitions (e.g., a command queue feeding a state machine).

# Liskov Substitution Principle

## What Problem Does It Solve?
The Liskov Substitution Principle (LSP) solves the problem of subclasses that break the expected behavior of their parent class. When a subclass overrides methods in a way that violates the parent's contract, code that works with the parent type silently breaks when given a subclass instance.

Think of the **rectangle vs. square** problem. A square "is-a" rectangle mathematically, but in code, a `Square` subclass that overrides `set_width` and `set_height` to keep all sides equal violates how `Rectangle` is expected to work. Code that sets width then reads height will get wrong results. LSP says subclasses must be substitutable for their parent without changing the correctness of the program.

## How to Identify When to Use It
- A subclass overrides methods to throw `NotImplementedError`
- A subclass has empty method bodies (`pass`) for inherited methods
- Callers check `isinstance()` or `type()` before calling methods on a polymorphic collection
- The subclass's preconditions are stronger than the parent's (requires more)
- The subclass's postconditions are weaker than the parent's (guarantees less)
- Invariants (always-true properties) of the parent are broken by the child

**Questions to ask yourself:**
- If I replace every `Parent` with this `Child`, will all existing tests still pass?
- Does the subclass truly honor the contract of the parent, or just share method signatures?
- Would a caller that doesn't know about this subclass get surprising results?

**Red flags:** `raise NotImplementedError` in a subclass of a concrete class; methods that do nothing when the parent's method has documented behavior; mutable state that violates parent invariants; the "Square extends Rectangle" pattern.

## How to Apply It
1. Ensure the subclass's preconditions are no stronger than the parent's
2. Ensure the subclass's postconditions are no weaker than the parent's
3. Preserve all class invariants from the parent
4. Don't throw new exception types that callers don't expect
5. Prefer composition over inheritance when the "is-a" relationship is questionable

```python
from abc import ABC, abstractmethod

# ❌ Before — violates LSP
class Rectangle:
    def __init__(self, width: float, height: float):
        self._width = width
        self._height = height

    def set_width(self, w: float) -> None:
        self._width = w

    def set_height(self, h: float) -> None:
        self._height = h

    def area(self) -> float:
        return self._width * self._height

class Square(Rectangle):
    def __init__(self, side: float):
        super().__init__(side, side)

    def set_width(self, w: float) -> None:
        self._width = w
        self._height = w  # violates Rectangle invariant: width and height can be set independently

    def set_height(self, h: float) -> None:
        self._width = h
        self._height = h

# This function works for Rectangle but breaks for Square
def resize_and_report(r: Rectangle) -> float:
    r.set_width(5)
    r.set_height(10)
    return r.area()  # Rectangle → 50, Square → 100 ❌ (should have been 50 if substitutable)

# ✅ After — use a common abstraction instead of inheriting
class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

class Square(Shape):
    def __init__(self, side: float):
        self.side = side

    def area(self) -> float:
        return self.side * self.side
```

## Real-World Example
A **payment processor** hierarchy where different payment types must honor the same contract.

```python
from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount: float) -> bool:
        """Process payment. Returns True on success, False on failure."""

    @abstractmethod
    def refund(self, transaction_id: str) -> bool:
        """Refund a transaction. Returns True on success."""

# ✅ Proper LSP — CreditCardPayment honors the contract
class CreditCardPayment(PaymentProcessor):
    def process_payment(self, amount: float) -> bool:
        if amount <= 0:
            return False
        # Process with Stripe
        return True

    def refund(self, transaction_id: str) -> bool:
        return True

# ❌ Violates LSP — throws exceptions instead of returning False
class GiftCardPayment(PaymentProcessor):
    def __init__(self, balance: float):
        self._balance = balance

    def process_payment(self, amount: float) -> bool:
        if amount <= 0:
            raise ValueError("Amount must be positive")  # ❌ throws new exception type
        if amount > self._balance:
            raise RuntimeError("Insufficient gift card balance")  # ❌ caller didn't expect this
        self._balance -= amount
        return True

    def refund(self, transaction_id: str) -> bool:
        raise NotImplementedError("Gift cards cannot be refunded")  # ❌ breaks contract

# ✅ Fixed version
class ValidGiftCardPayment(PaymentProcessor):
    def __init__(self, balance: float):
        self._balance = balance

    def process_payment(self, amount: float) -> bool:
        if amount <= 0 or amount > self._balance:
            return False  # follows the contract
        self._balance -= amount
        return True

    def refund(self, transaction_id: str) -> bool:
        return False  # communicates inability without breaking contract
```

The `GiftCardPayment` violates LSP by throwing `ValueError` and `RuntimeError` when the contract says return `False`. It also throws `NotImplementedError` on `refund`. The `ValidGiftCardPayment` fixes this by following the behavioral contract.

## Common Mistakes / Pitfalls
- **Using inheritance for code reuse (not polymorphism)**: Just because two classes share code doesn't mean one should extend the other. Prefer composition.
- **Strengthening preconditions**: A subclass that requires arguments to be non-null when the parent accepts null breaks LSP.
- **Weakening postconditions**: A subclass that returns `None` when the parent's contract says "always returns a non-empty string" breaks LSP.
- **Removing features**: A subclass that makes an inherited method do nothing or throw removes functionality the caller depends on.
- **The "is-a" trap in real-world modeling**: A `Penguin` is-a `Bird`, but if `Bird` has a `fly()` method that returns distance, a `Penguin` that throws `CannotFlyError` breaks LSP. Model behaviors, not real-world taxonomies.
- **Mutable subclass state that breaks invariants**: A subclass that allows setting values that violate the parent's internal consistency rules.

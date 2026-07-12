# Inheritance

## What Problem Does It Solve?
Inheritance solves the problem of code reuse across related classes by establishing an "is-a" relationship. Without it, you'd copy common fields and methods between every class that shares behavior — leading to massive duplication and inconsistencies when a shared feature needs updating.

Think of **parent-child traits**. A child inherits eye color, height potential, and mannerisms from their parents, but also has their own unique characteristics. Inheritance in OOP works the same way: a child class inherits attributes and methods from a parent class and can extend or override them.

## How to Identify When to Use It
- Multiple classes share the same fields and methods
- You have a natural "is-a" hierarchy (e.g., `Dog` is an `Animal`, `SavingsAccount` is a `BankAccount`)
- You want to build on existing behavior without modifying the original class
- You need polymorphic behavior — treating different objects as their parent type
- A base class defines a template and subclasses fill in the details (Template Method pattern)

**Questions to ask yourself:**
- Does the subclass truly "is-a" kind of the parent, or just share some code?
- Would composition (has-a) be more appropriate here?
- If I change the parent, will all children still behave correctly?

**Red flags:** Deep inheritance trees (5+ levels), "refused bequest" (subclass doesn't need most inherited methods), subclass overriding many methods with empty bodies.

## How to Apply It
1. Identify shared state and behavior into a base class
2. Use `class Child(Parent):` to inherit
3. Call `super().__init__()` in the child to initialize parent state
4. Override methods where the child needs different behavior
5. Use `super().method()` to extend (not replace) parent behavior

```python
class Animal:
    def __init__(self, name: str, sound: str):
        self.name = name
        self.sound = sound

    def speak(self) -> str:
        return f"{self.name} says {self.sound}"

    def move(self) -> str:
        return f"{self.name} moves"

class Dog(Animal):
    def __init__(self, name: str):
        super().__init__(name, "Woof!")

    def move(self) -> str:
        return f"{self.name} runs on four legs"

class Bird(Animal):
    def __init__(self, name: str):
        super().__init__(name, "Chirp!")

    def move(self) -> str:
        return f"{self.name} flies"

# Usage
animals = [Dog("Rex"), Bird("Tweety")]
for a in animals:
    print(a.speak())   # shared from Animal
    print(a.move())    # polymorphic — each class provides its own
```

## Real-World Example
A **payment processing system** where different payment methods share common logic but have unique processing flows.

```python
from abc import ABC, abstractmethod
from datetime import datetime

class Payment(ABC):
    def __init__(self, amount: float, currency: str = "USD"):
        self.amount = amount
        self.currency = currency
        self.timestamp = datetime.now()
        self.status = "pending"

    def receipt(self) -> str:
        return f"[{self.timestamp}] {self.currency} ${self.amount:.2f} - {self.status}"

    @abstractmethod
    def process(self) -> bool:
        """Process the payment — each provider implements differently."""
        pass

class CreditCardPayment(Payment):
    def __init__(self, amount: float, card_number: str, cvv: str):
        super().__init__(amount)
        self.card_number = card_number[-4:]  # store only last 4
        self.__cvv = cvv

    def process(self) -> bool:
        # Connect to Stripe / PayPal API
        print(f"Charging ${self.amount} to card ending in {self.card_number}...")
        self.status = "completed"
        return True

class CryptoPayment(Payment):
    def __init__(self, amount: float, wallet_address: str):
        super().__init__(amount)
        self.wallet_address = wallet_address

    def process(self) -> bool:
        print(f"Sending {self.amount} BTC to {self.wallet_address[:6]}...")
        self.status = "completed"
        return True

class PaymentLogger:
    def __init__(self, payments: list[Payment]):
        self.payments = payments

    def log_all(self) -> None:
        for p in self.payments:
            p.process()
            print(p.receipt())
```

Both `CreditCardPayment` and `CryptoPayment` reuse the `receipt()` method and `status` attribute from `Payment` without duplicating code.

## Common Mistakes / Pitfalls
- **Deep inheritance hierarchies**: Beyond 2–3 levels, the chain becomes fragile and hard to debug. Prefer composition.
- **The "Square-Rectangle" problem**: A `Square` is not a valid substitute for a `Rectangle` if the parent allows independent width/height mutation. This violates the Liskov Substitution Principle.
- **Overriding instead of extending**: Forgetting `super().__init__()` means the parent state never initializes. Call `super()` first, then add child-specific setup.
- **Using inheritance for code reuse only**: If there's no "is-a" relationship, use composition. A `Car` has an `Engine`, it is not an `Engine`.
- **Fragile base class problem**: Changes to the parent class can silently break all subclasses. Keep base classes small and stable.
- **Python's MRO confusion**: Multiple inheritance can cause unexpected method resolution order. Use `super()` properly or stick to single inheritance.


# Encapsulation

## What Problem Does It Solve?
Encapsulation solves the problem of data hiding and protecting an object's internal state from unauthorized external access. Without it, any part of the codebase could directly modify an object's data, leading to unpredictable bugs, security vulnerabilities, and tight coupling between components.

Think of an **ATM machine**. You interact with it through a keypad, screen, and card slot — you cannot directly access the cash cassettes or the internal ledger. The ATM exposes a well-defined interface (withdraw, check balance) while keeping the internal mechanics private. Encapsulation works the same way: objects expose methods (the keypad/screen) and hide their internal data (the cash cassettes).

## How to Identify When to Use It
- You have fields that should not be directly modifiable after object creation
- You need to validate data before assigning it (e.g., age can't be negative)
- Multiple parts of the code modify the same object's data, causing inconsistent state
- You want to change internal implementation without affecting external code
- You're exposing internal data structures directly via public fields

**Questions to ask yourself:**
- Can I trust that this object's state is always valid?
- What happens if someone sets an invalid value on this field?
- If I change how this data is stored, how many files do I need to update?

**Red flags:** Public attributes everywhere, direct mutation of collection fields from outside the class, no validation on state changes, "train wreck" method chains that reach deep into objects.

## How to Apply It
1. Mark instance variables as private (`self.__var` in Python or `self._var` for protected)
2. Provide public getter/setter methods if external access is needed
3. Validate data in setters before assigning
4. Use properties in Python for clean attribute-style access with validation

```python
class BankAccount:
    def __init__(self, owner: str, initial_balance: float = 0.0):
        self.owner = owner
        self.__balance = initial_balance  # private attribute
        self.__transaction_log: list[str] = []

    # Getter — controlled read access
    def get_balance(self) -> float:
        return self.__balance

    # Setter with validation
    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.__balance += amount
        self.__transaction_log.append(f"Deposited: ${amount:.2f}")

    def withdraw(self, amount: float) -> bool:
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.__balance:
            print("Insufficient funds")
            return False
        self.__balance -= amount
        self.__transaction_log.append(f"Withdrew: ${amount:.2f}")
        return True

    def get_transaction_log(self) -> list[str]:
        # Return a copy so the caller can't mutate the internal log
        return list(self.__transaction_log)
```

## Real-World Example
A **User profile** class that protects email and password, ensuring the password is never exposed directly and the email is always valid.

```python
import re

class UserProfile:
    def __init__(self, username: str, email: str):
        self.username = username
        self.__email = email
        self.__password_hash: str | None = None

    @property
    def email(self) -> str:
        return self.__email

    @email.setter
    def email(self, new_email: str) -> None:
        if not re.match(r"[^@]+@[^@]+\.[^@]+", new_email):
            raise ValueError("Invalid email format")
        self.__email = new_email

    def set_password(self, password: str) -> None:
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters")
        self.__password_hash = self.__hash(password)  # never store raw

    def __hash(self, password: str) -> str:
        import hashlib
        return hashlib.sha256(password.encode()).hexdigest()

    def verify_password(self, password: str) -> bool:
        return self.__password_hash == self.__hash(password)
```

The `__password_hash` is never directly accessible. The `email` setter validates format. The internal `__hash` method is implementation detail that can change without breaking callers.

## Common Mistakes / Pitfalls
- **Over-exposing internals**: Adding getters/setters for every field defeats the purpose. Only expose what callers actually need.
- **Returning mutable references**: Returning `self.__items` directly lets callers modify the internal list. Return a copy or use `tuple()`.
- **Using single underscore thinking it's private**: `_var` in Python is a convention, not enforced. Name mangling with `__var` gives real (though still accessible via `_ClassName__var`) protection.
- **God classes**: A single class that "owns" everything is not encapsulation — it's a monolith. Encapsulation means each class owns its own state.
- **Leaking implementation details in tests**: Don't test private methods. Test the public interface.


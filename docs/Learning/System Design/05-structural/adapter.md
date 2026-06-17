# Adapter (Structural)

## What Problem Does It Solve?

You have two classes with incompatible interfaces that need to work together. The Adapter lets classes with mismatched APIs collaborate by wrapping one interface in another. Think of a **travel power plug adapter**: a US plug (flat prongs) won't fit a European socket (round holes), so you insert an adapter that accepts the US plug on one side and fits the EU socket on the other.

## How to Identify When to Use It

- You want to reuse an existing class but its interface doesn't match the rest of your code
- You're integrating a third-party library or legacy system with a different API shape
- Multiple classes provide similar functionality but through incompatible method signatures
- You want to avoid modifying existing code to match a new interface

**Questions to ask yourself:** Is the interface of this dependency forcing me to write awkward glue code everywhere? Would swapping this dependency be painful because its API leaks into my business logic?

**Red flags:** `if isinstance(obj, PayPalApi)` checks scattered through your codebase; your code is coupled to a specific vendor's method names.

## How to Apply It

1. Identify the **Target** interface your code expects.
2. Identify the **Adaptee** — the existing class with the mismatched interface.
3. Create an **Adapter** class that implements the Target interface and wraps the Adaptee.
4. Delegate calls from Target methods to the Adaptee's methods, translating arguments and return values as needed.

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass


# --- Target interface (what our code expects) ---

@dataclass
class PaymentResult:
    success: bool
    transaction_id: str
    message: str


class PaymentProcessor(ABC):
    @abstractmethod
    def charge(self, amount: float, currency: str) -> PaymentResult:
        ...


# --- Adaptee (legacy third-party API with incompatible interface) ---

class LegacyPaymentApi:
    """Old API — uses cents, different method name, string status."""

    def make_payment(self, amount_cents: int, cur_code: str) -> str:
        # Returns raw status string like "OK:txn_123" or "FAIL:reason"
        return f"OK:txn_{hash((amount_cents, cur_code))}"


# --- Adapter ---

class LegacyPaymentAdapter(PaymentProcessor):
    def __init__(self, legacy_api: LegacyPaymentApi) -> None:
        self._api = legacy_api

    def charge(self, amount: float, currency: str) -> PaymentResult:
        amount_cents = int(amount * 100)
        raw = self._api.make_payment(amount_cents, currency)

        if raw.startswith("OK:"):
            txn_id = raw.split(":")[1]
            return PaymentResult(True, txn_id, "Success")
        return PaymentResult(False, "", f"Payment failed: {raw}")


# --- Client ---

def process_order(processor: PaymentProcessor, total: float) -> None:
    result = processor.charge(total, "USD")
    print(f"[{result.transaction_id}] {'OK' if result.success else 'FAIL'}: {result.message}")


if __name__ == "__main__":
    legacy = LegacyPaymentApi()
    adapter = LegacyPaymentAdapter(legacy)
    process_order(adapter, 49.99)
```

## Real-World Example

```python
# Modern system expects a NotificationService interface.
# Legacy email library has a totally different signature.

class NotificationService(ABC):
    @abstractmethod
    def send(self, recipient: str, subject: str, body: str) -> bool:
        ...


# --- Legacy library ---

class SmtpMailer:
    def dispatch(self, to_addr: str, msg: str) -> int:
        # msg includes subject inline: "Subject: Hello\n\nBody here"
        # Returns 0 on success, nonzero on failure
        return 0


class SmtpAdapter(NotificationService):
    def __init__(self, mailer: SmtpMailer) -> None:
        self._mailer = mailer

    def send(self, recipient: str, subject: str, body: str) -> bool:
        msg = f"Subject: {subject}\n\n{body}"
        return self._mailer.dispatch(recipient, msg) == 0
```

## Common Mistakes / Pitfalls

- **Adapter does too much**: it should only translate interface calls, not add new business logic.
- **Object vs class adapter confusion**: Python favours object adaptation (composition). Class adaptation (multiple inheritance) is rare and fragile.
- **Ignoring performance**: if every call goes through many tiny adapter hops, consider a bulk or batch adapter.
- **Leaking Adaptee types**: the Adapter's public API should only expose Target types.

## Related Concepts

- **Facade** — similar wrapping intent, but Facade simplifies a *subsystem* while Adapter translates a *single interface*.
- **Bridge** — separates abstraction from implementation so both can vary; Adapter makes unrelated classes work together.
- **Decorator** — wraps an object to add behaviour; Adapter wraps to change interface.

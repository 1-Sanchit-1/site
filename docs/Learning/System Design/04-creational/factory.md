# Factory Method (Creational)

## What Problem Does It Solve?

Object creation logic is complex, conditional, or scattered across the codebase. Callers shouldn't need to know the concrete class they're instantiating or the details of how it's built.

**Analogy:** You walk into a sandwich shop and say "I'll have a BLT." You don't chop the lettuce, fry the bacon, or toast the bread. The kitchen (factory) handles that. You just name what you want and get a finished sandwich.

## How to Identify When to Use It

- You have `if`/`elif`/`else` chains that pick which class to instantiate
- Callers frequently pass raw config values to constructors
- You want to decouple client code from concrete implementation classes
- The creation process involves setup steps that are easy to forget

**Questions to ask yourself:**
- "If I add a new type, how many places do I need to modify?"
- "Does the caller actually care about the concrete type or just the interface?"

**Red flags:**
- `if type == "pdf"`: branches scattered in unrelated functions
- New developers frequently forget to initialize objects properly
- Constructors with the same parameter lists repeated everywhere

## How to Apply It

1. Define a common interface (abstract base class) for the products
2. Create concrete product classes that implement the interface
3. Write a factory function (or class) that takes a discriminator and returns the correct concrete product
4. (Optional) Register new products without modifying the factory (registry pattern)

```python
from abc import ABC, abstractmethod


class Exporter(ABC):
    @abstractmethod
    def export(self, data: str) -> str:
        pass


class PDFExporter(Exporter):
    def export(self, data: str) -> str:
        return f"PDF: {data}"


class CSVExporter(Exporter):
    def export(self, data: str) -> str:
        return f"CSV: {data}"


class JSONExporter(Exporter):
    def export(self, data: str) -> str:
        return f"JSON: {data}"


def exporter_factory(format: str) -> Exporter:
    exporters = {
        "pdf": PDFExporter,
        "csv": CSVExporter,
        "json": JSONExporter,
    }
    cls = exporters.get(format)
    if cls is None:
        raise ValueError(f"Unknown format: {format}")
    return cls()


# Client code — no knowledge of concrete classes
exporter = exporter_factory("csv")
print(exporter.export("hello,world"))
```

## Real-World Example

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class PaymentRequest:
    amount: float
    currency: str
    method: str


class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: float, currency: str) -> str:
        pass


class StripeGateway(PaymentGateway):
    def charge(self, amount: float, currency: str) -> str:
        return f"Stripe: charged {currency} {amount:.2f}"


class PayPalGateway(PaymentGateway):
    def charge(self, amount: float, currency: str) -> str:
        return f"PayPal: charged {currency} {amount:.2f}"


class BraintreeGateway(PaymentGateway):
    def charge(self, amount: float, currency: str) -> str:
        return f"Braintree: charged {currency} {amount:.2f}"


def payment_factory(method: str) -> PaymentGateway:
    mapping = {
        "stripe": StripeGateway,
        "paypal": PayPalGateway,
        "braintree": BraintreeGateway,
    }
    gateway = mapping.get(method)
    if not gateway:
        raise ValueError(f"Unsupported payment method: {method}")
    return gateway()


# Adding a new gateway (e.g., SquareGateway) only requires:
# 1. Create the class
# 2. Add it to mapping — no client code changes


request = PaymentRequest(amount=49.99, currency="USD", method="stripe")
gateway = payment_factory(request.method)
result = gateway.charge(request.amount, request.currency)
print(result)
```

## Common Mistakes / Pitfalls

- **Factory that doesn't simplify:** If the factory just maps strings to classes with the same constructor signature, it adds indirection without value.
- **Too many factories:** One factory per module is reasonable. Don't create a factory for every single class.
- **Forgetting to register new products:** Use a registry/plugin system or automated discovery to avoid manual updates.
- **Returning partially initialized objects:** The factory must fully construct the object before returning it.

## Related Concepts

- Abstract Factory — creates families of related factories
- Dependency injection — factories can be injected rather than called statically
- Registry pattern — dynamic product registration

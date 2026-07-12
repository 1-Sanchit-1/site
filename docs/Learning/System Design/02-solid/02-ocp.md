# Open/Closed Principle

## What Problem Does It Solve?
The Open/Closed Principle (OCP) solves the problem of modifying existing, working code every time you need to add a new feature. Each modification risks introducing bugs into code that was previously stable. OCP says software entities should be **open for extension** but **closed for modification**.

Think of a **power outlet with adapters**. The wall outlet is closed for modification — you don't rewire it when you get a new device. Instead, you extend it by plugging in an adapter. Your code should work the same way: instead of changing existing modules, add new ones that plug into a stable interface.

## How to Identify When to Use It
- You keep changing the same file when adding new features
- A function or class has a long `if/elif` chain that grows with each new variant
- You see `switch` statements or dict-based dispatch that needs updating for new types
- Adding a new feature requires touching multiple unrelated files
- You're afraid to modify a "core" file because it might break everything

**Questions to ask yourself:**
- Can I add this new feature by writing a new class (no changes to existing ones)?
- Does my design use polymorphism or dependency injection to handle variation?
- If I need a new behavior next month, can I just "plug in" a new component?

**Red flags:** A single file that changes with every feature request, strategy patterns implemented as if-else chains, business logic in giant switch statements, "configuration" files that contain executable logic.

## How to Apply It
1. Identify the varying behavior in your system (what changes when new features are added?)
2. Extract that behavior behind an interface or abstract class
3. Make existing code depend on the abstraction, not concrete types
4. Add new implementations of the interface without touching existing code

```python
from abc import ABC, abstractmethod

# ❌ Before — violates OCP: adding a new format requires changing this class
class ReportGenerator:
    def generate(self, data: dict, format: str) -> str:
        if format == "json":
            import json
            return json.dumps(data)
        elif format == "xml":
            # manual XML building
            return f"<root><name>{data['name']}</name></root>"
        # Adding "csv" or "yaml" means modifying this file!

# ✅ After — open for extension, closed for modification
class ReportFormatter(ABC):
    @abstractmethod
    def format(self, data: dict) -> str:
        pass

class JSONFormatter(ReportFormatter):
    def format(self, data: dict) -> str:
        import json
        return json.dumps(data)

class XMLFormatter(ReportFormatter):
    def format(self, data: dict) -> str:
        return f"<root><name>{data['name']}</name></root>"

# New formatters are NEW files, not modifications to existing code:
class CSVFormatter(ReportFormatter):
    def format(self, data: dict) -> str:
        return "\n".join(f"{k},{v}" for k, v in data.items())

class YAMLFormatter(ReportFormatter):
    def format(self, data: dict) -> str:
        return "\n".join(f"{k}: {v}" for k, v in data.items())

class ReportGenerator:
    def __init__(self, formatters: dict[str, ReportFormatter]):
        self._formatters = formatters

    def generate(self, data: dict, format: str) -> str:
        if format not in self._formatters:
            raise ValueError(f"Unknown format: {format}")
        return self._formatters[format].format(data)

# Usage — register formatters at startup
gen = ReportGenerator({
    "json": JSONFormatter(),
    "xml": XMLFormatter(),
    "csv": CSVFormatter(),
    "yaml": YAMLFormatter(),
})
print(gen.generate({"name": "Alice"}, "csv"))
```

## Real-World Example
A **discount calculator** for an e-commerce site where new discount types need to be added frequently without touching the core calculation engine.

```python
from abc import ABC, abstractmethod
from decimal import Decimal

class DiscountStrategy(ABC):
    @abstractmethod
    def apply(self, price: Decimal) -> Decimal:
        pass

class NoDiscount(DiscountStrategy):
    def apply(self, price: Decimal) -> Decimal:
        return price

class PercentageDiscount(DiscountStrategy):
    def __init__(self, percent: Decimal):
        self._percent = percent

    def apply(self, price: Decimal) -> Decimal:
        return price * (Decimal(1) - self._percent / 100)

class BuyOneGetOne(DiscountStrategy):
    def apply(self, price: Decimal) -> Decimal:
        return price / 2  # effectively 50% off on one item

class LoyaltyDiscount(DiscountStrategy):
    def __init__(self, years: int):
        self._years = years

    def apply(self, price: Decimal) -> Decimal:
        discount = min(Decimal(self._years) * Decimal(5), 40)
        return price * (Decimal(1) - discount / 100)

class PriceCalculator:
    def __init__(self, strategy: DiscountStrategy):
        self._strategy = strategy

    def calculate(self, base_price: Decimal) -> Decimal:
        return self._strategy.apply(base_price)

# Adding a "FlashSaleDiscount" tomorrow?
# Just create a new class — PriceCalculator stays untouched.
class FlashSaleDiscount(DiscountStrategy):
    def apply(self, price: Decimal) -> Decimal:
        return price * Decimal(0.3)  # 70% off
```

The `PriceCalculator` is closed for modification but open for extension — new discount strategies are new files, not edits to existing ones.

## Common Mistakes / Pitfalls
- **Premature abstraction**: Don't abstract until you see the variation point appear. Following OCP too early can lead to unnecessary complexity. Wait for the second occurrence of a pattern.
- **Too many small interfaces**: Having `interface A`, `interface B`, `interface C` where each has one method and one implementation creates needless indirection. Refactor when the variation actually emerges.
- **Plug-in architecture overkill**: Not every system needs a full plugin system. Sometimes a simple function parameter is enough OCP compliance.
- **Ignoring OCP in tests**: If adding a new feature requires rewriting all your tests, your design may not be as open/closed as you think. Tests should be extendable too.
- **Abstracting in the wrong direction**: Extract what varies, not what stays the same. The stable parts can remain concrete.


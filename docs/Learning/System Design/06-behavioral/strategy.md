# Strategy (Behavioral)

## What Problem Does It Solve?

You have a family of related algorithms or behaviours that need to be interchangeable at runtime. Hard-coding every variant with conditional logic (`if/elif/else`) makes the code rigid, hard to extend, and violates the Open/Closed Principle. The Strategy pattern lets you define a family of algorithms, encapsulate each one, and make them swappable without changing the client. Think of **GPS navigation**: entering a destination is the same action, but the route algorithm differs for car, bike, walking, or transit — you pick the strategy and the system computes accordingly.

## How to Identify When to Use It

- A class has many conditional branches that select different variants of the same behaviour
- You need different variants of an algorithm and want to switch between them at runtime
- You want to avoid duplicating similar code across classes that differ only in behaviour
- A class definition is polluted with multiple versions of the same operation

**Questions to ask yourself:** Can I extract the varying behaviour behind a common interface? Will adding a new variant require changing existing code?

**Red flags:** A giant `if/elif/else` or `match/case` block for selecting behaviour; a class named with "WithX" or "WithY" suffixes; method signatures with a mode/type string parameter.

## How to Apply It

1. Identify the algorithm that varies — the **Strategy**.
2. Declare a **Strategy interface** common to all variants.
3. Implement concrete strategies for each variant.
4. The **Context** class holds a reference to a strategy and delegates execution to it.
5. Client code picks and sets the strategy on the context (often via constructor or setter).

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass


# --- Strategy interface ---

class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount: float) -> None:
        ...


# --- Concrete Strategies ---

class UpiPayment(PaymentStrategy):
    def __init__(self, upi_id: str) -> None:
        self.upi_id = upi_id

    def pay(self, amount: float) -> None:
        print(f"Paid ₹{amount:.2f} via UPI ({self.upi_id})")


class CardPayment(PaymentStrategy):
    def __init__(self, card_number: str, cvv: str) -> None:
        self.card_number = card_number
        self.cvv = cvv

    def pay(self, amount: float) -> None:
        masked = f"****{self.card_number[-4:]}"
        print(f"Paid ₹{amount:.2f} via Card ({masked})")


class NetBankingPayment(PaymentStrategy):
    def __init__(self, bank: str) -> None:
        self.bank = bank

    def pay(self, amount: float) -> None:
        print(f"Paid ₹{amount:.2f} via NetBanking ({self.bank})")


# --- Context ---

@dataclass
class ShoppingCart:
    strategy: PaymentStrategy

    def checkout(self, total: float) -> None:
        self.strategy.pay(total)


if __name__ == "__main__":
    cart = ShoppingCart(UpiPayment("alice@upi"))
    cart.checkout(1499.00)

    cart.strategy = CardPayment("1234567890123456", "123")
    cart.checkout(2500.00)
```

## Real-World Example

```python
# Image compression — different formats use different algorithms.

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List


@dataclass
class Image:
    pixels: List[List[int]]
    width: int = field(init=False)
    height: int = field(init=False)

    def __post_init__(self) -> None:
        self.height = len(self.pixels)
        self.width = len(self.pixels[0]) if self.pixels else 0


class CompressionStrategy(ABC):
    @abstractmethod
    def compress(self, image: Image) -> bytes:
        ...


class JpegCompression(CompressionStrategy):
    def compress(self, image: Image) -> bytes:
        print(f"[JPEG] Lossy compression of {image.width}x{image.height}")
        return b"jpeg-data"


class PngCompression(CompressionStrategy):
    def compress(self, image: Image) -> bytes:
        print(f"[PNG] Lossless compression of {image.width}x{image.height}")
        return b"png-data"


class WebpCompression(CompressionStrategy):
    def compress(self, image: Image) -> bytes:
        print(f"[WebP] Modern compression of {image.width}x{image.height}")
        return b"webp-data"


class ImageProcessor:
    def __init__(self, strategy: CompressionStrategy) -> None:
        self._strategy = strategy

    @property
    def strategy(self) -> CompressionStrategy:
        return self._strategy

    @strategy.setter
    def strategy(self, strategy: CompressionStrategy) -> None:
        self._strategy = strategy

    def save(self, image: Image, filename: str) -> None:
        data = self._strategy.compress(image)
        with open(filename, "wb") as f:
            f.write(data)
        print(f"Saved {filename}")


if __name__ == "__main__":
    img = Image([[0, 128, 255], [64, 192, 32]])
    processor = ImageProcessor(JpegCompression())
    processor.save(img, "photo.jpg")

    processor.strategy = PngCompression()
    processor.save(img, "photo.png")
```

## Common Mistakes / Pitfalls

- **Strategies with different signatures**: if strategies need different parameters, push them into the strategy constructor or use a parameter object instead of bloating the interface.
- **Over-engineering**: don't use Strategy for a single algorithm that never changes. Only extract when you genuinely need interchangeability.
- **Context leaking into strategy**: strategies should depend only on the data passed to them, not on the context's internal state.
- **Forgetting to set a default strategy**: the context should either have a sensible default or enforce that a strategy is set before execution.

## Related Concepts

- **State** — similar structure but State changes behaviour when *internal state* changes, while Strategy lets the *caller* swap algorithms.
- **Template Method** — defines the skeleton of an algorithm; Strategy lets you swap entire algorithms.
- **Decorator** — adds behaviour dynamically; Strategy swaps behaviour at a single point.

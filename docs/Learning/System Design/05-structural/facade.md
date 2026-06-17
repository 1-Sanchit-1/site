# Facade (Structural)

## What Problem Does It Solve?

A complex subsystem with many interdependent classes is hard to use correctly. Clients must instantiate objects, call methods in the right order, and handle errors from each component. The Facade provides a simple, unified interface that hides the subsystem's complexity. Think of a **hotel receptionist**: you ask for a room, and they handle booking, housekeeping, room service, and checkout — you don't interact with the kitchen, laundry, or maintenance staff directly.

## How to Identify When to Use It

- A subsystem has many classes that must be used together in a specific choreography
- You want to provide a simple default interface while keeping the subsystem open for advanced use
- Your client code is tightly coupled to library internals, making upgrades painful
- You need to layer your system (public API → facade → internal modules)

**Questions to ask yourself:** Does using this subsystem require reading a manual every time? Would a single `do_thing()` method eliminate 90% of boilerplate?

**Red flags:** The same 5-line setup sequence appears in dozens of places; client code catches 4 different exception types from different subsystem classes.

## How to Apply It

1. Identify the complex subsystem classes and their interactions.
2. Design a **Facade** class that exposes high-level methods and hides orchestration.
3. Optionally create multiple facades for different concerns (e.g. `OrderFacade`, `ReportingFacade`).
4. Clients call only the Facade; the subsystem classes stay accessible for power users.

```python
from dataclasses import dataclass


# --- Complex subsystem ---

class InventoryService:
    def reserve(self, product_id: str, quantity: int) -> bool:
        print(f"  Inventory: reserving {quantity}×{product_id}")
        return True

    def release(self, product_id: str, quantity: int) -> None:
        print(f"  Inventory: releasing {quantity}×{product_id}")


class PaymentService:
    def charge(self, amount: float, token: str) -> str:
        print(f"  Payment: charging ${amount:.2f}")
        return "txn_" + str(hash(amount))

    def refund(self, txn_id: str) -> None:
        print(f"  Payment: refunding {txn_id}")


class ShippingService:
    def schedule_pickup(self, address: str, items: list[str]) -> str:
        print(f"  Shipping: scheduling pickup for {items} at {address}")
        return "tracking_" + str(hash(address))


class NotificationService:
    def send_email(self, to: str, subject: str, body: str) -> None:
        print(f"  Notification: email to {to} — {subject}")


# --- Facade ---

@dataclass
class OrderResult:
    success: bool
    transaction_id: str = ""
    tracking_number: str = ""
    error: str = ""


class OrderService:
    """Facade that simplifies order placement."""

    def __init__(self) -> None:
        self._inventory = InventoryService()
        self._payment = PaymentService()
        self._shipping = ShippingService()
        self._notifications = NotificationService()

    def place_order(
        self,
        product_id: str,
        quantity: int,
        total: float,
        payment_token: str,
        address: str,
        customer_email: str,
    ) -> OrderResult:
        # Step 1 — reserve inventory
        if not self._inventory.reserve(product_id, quantity):
            return OrderResult(success=False, error="Insufficient stock")

        # Step 2 — process payment
        try:
            txn_id = self._payment.charge(total, payment_token)
        except Exception as e:
            self._inventory.release(product_id, quantity)
            return OrderResult(success=False, error=f"Payment failed: {e}")

        # Step 3 — schedule shipping
        try:
            tracking = self._shipping.schedule_pickup(address, [product_id] * quantity)
        except Exception as e:
            self._payment.refund(txn_id)
            self._inventory.release(product_id, quantity)
            return OrderResult(success=False, error=f"Shipping failed: {e}")

        # Step 4 — notify customer
        self._notifications.send_email(
            customer_email,
            "Order Confirmed",
            f"Your order of {quantity}×{product_id} has been placed.\nTracking: {tracking}",
        )

        return OrderResult(success=True, transaction_id=txn_id, tracking_number=tracking)


# --- Client ---

if __name__ == "__main__":
    orders = OrderService()
    result = orders.place_order(
        product_id="PROD-42",
        quantity=2,
        total=79.98,
        payment_token="tok_visa",
        address="123 Main St",
        customer_email="alice@example.com",
    )
    print(f"\nOrder {'succeeded' if result.success else 'failed'}: {result}")
```

## Real-World Example

```python
# Video conversion library with dozens of codec/container classes
# Facade: single convert() method

class VideoFile:
    def __init__(self, path: str) -> None:
        self.path = path


class Codec:
    ...


class OggCodec(Codec): ...
class MP4Codec(Codec): ...
class CodecFactory:
    @staticmethod
    def extract(file: VideoFile) -> Codec:
        print(f"  CodecFactory: extracting codec from {file.path}")
        return MP4Codec()


class BitrateReader:
    @staticmethod
    def read(file: VideoFile, codec: Codec) -> bytes:
        print(f"  BitrateReader: reading {file.path}")
        return b"raw_data"

    @staticmethod
    def convert(data: bytes, codec: Codec) -> bytes:
        print(f"  BitrateReader: converting")
        return b"converted_data"


class AudioMixer:
    def fix(self, data: bytes) -> bytes:
        print("  AudioMixer: fixing audio synchronization")
        return data


class VideoConverter:
    """Facade for the video conversion subsystem."""

    def convert(self, source: str, target_format: str) -> str:
        file = VideoFile(source)
        source_codec = CodecFactory.extract(file)
        target_codec = OggCodec() if target_format == "ogg" else MP4Codec()

        raw = BitrateReader.read(file, source_codec)
        converted = BitrateReader.convert(raw, target_codec)
        fixed = AudioMixer().fix(converted)

        output_path = f"output.{target_format}"
        print(f"  VideoConverter: writing {output_path}")
        return output_path


# Client
converter = VideoConverter()
mp4 = converter.convert("home_video.mov", "mp4")
```

## Common Mistakes / Pitfalls

- **God facade**: one class that tries to cover every use case and becomes a bottleneck. Split into multiple facades.
- **Leaking subsystem complexity**: if the Facade exposes subsystem types in its API, it's not hiding anything.
- **Ignoring advanced users**: always let clients bypass the Facade when they need fine-grained control.
- **Adding business logic**: the Facade should *orchestrate*, not implement business rules.

## Related Concepts

- **Adapter** — wraps one class to fix an interface mismatch; Facade wraps an entire subsystem to simplify its usage.
- **Mediator** — centralises communication between colleagues; Facade provides a simple interface to a subsystem.
- **Singleton** — Facade is often implemented as a Singleton.

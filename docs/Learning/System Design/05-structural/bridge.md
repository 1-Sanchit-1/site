# Bridge (Structural)

## What Problem Does It Solve?

You have two orthogonal dimensions of variation — an abstraction and its implementation — and subclassing in both directions creates an explosion of classes. Bridge decouples the abstraction from its implementation so both can evolve independently. Think of a **remote control × device** matrix: BasicRemote + TV, BasicRemote + Radio, AdvancedRemote + TV, AdvancedRemote + Radio. Without Bridge you'd have `BasicTVRemote`, `AdvancedTVRemote`, `BasicRadioRemote`, `AdvancedRadioRemote` — four classes instead of (2 remotes + 2 devices) = 4 total with Bridge.

## How to Identify When to Use It

- You have a class hierarchy that grows in two dimensions (e.g. shape × colour, view × data source, remote × device)
- You want to switch implementations at runtime
- An abstraction has multiple implementations that should be interchangeable
- Changes in one dimension should not require recompilation of the other

**Questions to ask yourself:** Would my class name contain "And" (`WindowAndLinux`)? Do I keep adding subclasses for every combination?

**Red flags:** A class hierarchy that multiplies instead of adds; `if platform == "linux"` inside a method that should be platform-agnostic.

## How to Apply It

1. Identify the **Abstraction** (high-level control logic) and the **Implementation** (low-level operations).
2. Define an **Implementation** interface with primitive operations.
3. Create **ConcreteImplementations** for each variant.
4. Define a **RefinedAbstraction** that forwards work to the Implementation reference.
5. The client constructs an Abstraction with a specific Implementation and uses only the Abstraction interface.

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass


# --- Implementation hierarchy ---

class Device(ABC):
    @abstractmethod
    def power_on(self) -> None:
        ...

    @abstractmethod
    def power_off(self) -> None:
        ...

    @abstractmethod
    def set_volume(self, level: int) -> None:
        ...

    @abstractmethod
    def get_volume(self) -> int:
        ...


class TV(Device):
    def __init__(self) -> None:
        self._on = False
        self._volume = 10

    def power_on(self) -> None:
        self._on = True
        print("  TV: powered ON")

    def power_off(self) -> None:
        self._on = False
        print("  TV: powered OFF")

    def set_volume(self, level: int) -> None:
        self._volume = max(0, min(100, level))
        print(f"  TV: volume set to {self._volume}")

    def get_volume(self) -> int:
        return self._volume


class Radio(Device):
    def __init__(self) -> None:
        self._on = False
        self._volume = 5
        self._frequency = 88.5

    def power_on(self) -> None:
        self._on = True
        print("  Radio: powered ON")

    def power_off(self) -> None:
        self._on = False
        print("  Radio: powered OFF")

    def set_volume(self, level: int) -> None:
        self._volume = max(0, min(100, level))
        print(f"  Radio: volume set to {self._volume}")

    def get_volume(self) -> int:
        return self._volume


class LEDStrip(Device):
    def __init__(self, n_leds: int = 10) -> None:
        self._on = False
        self._brightness = 50
        self._n_leds = n_leds

    def power_on(self) -> None:
        self._on = True
        print("  LEDStrip: powered ON")

    def power_off(self) -> None:
        self._on = False
        print("  LEDStrip: powered OFF")

    def set_volume(self, level: int) -> None:
        # Map volume to brightness 0–100
        self._brightness = max(0, min(100, level))
        print(f"  LEDStrip: brightness set to {self._brightness}")

    def get_volume(self) -> int:
        return self._brightness


# --- Abstraction hierarchy ---

class Remote(ABC):
    def __init__(self, device: Device) -> None:
        self._device = device

    @abstractmethod
    def toggle_power(self) -> None:
        ...

    @abstractmethod
    def volume_up(self) -> None:
        ...

    @abstractmethod
    def volume_down(self) -> None:
        ...


class BasicRemote(Remote):
    def toggle_power(self) -> None:
        print("[BasicRemote] toggle power")
        self._device.power_on()

    def volume_up(self) -> None:
        vol = self._device.get_volume()
        self._device.set_volume(vol + 10)

    def volume_down(self) -> None:
        vol = self._device.get_volume()
        self._device.set_volume(vol - 10)


class AdvancedRemote(Remote):
    def toggle_power(self) -> None:
        print("[AdvancedRemote] toggle power")
        self._device.power_on()

    def volume_up(self) -> None:
        vol = self._device.get_volume()
        self._device.set_volume(vol + 5)  # finer control

    def volume_down(self) -> None:
        vol = self._device.get_volume()
        self._device.set_volume(vol - 5)

    def mute(self) -> None:
        print("[AdvancedRemote] mute")
        self._device.set_volume(0)


# --- Client ---

if __name__ == "__main__":
    tv = TV()
    basic = BasicRemote(tv)
    basic.toggle_power()
    basic.volume_up()

    print()

    radio = Radio()
    advanced = AdvancedRemote(radio)
    advanced.toggle_power()
    advanced.mute()

    print()

    # New device — no new remote classes needed
    strip = LEDStrip(n_leds=20)
    advanced_strip = AdvancedRemote(strip)
    advanced_strip.toggle_power()
    advanced_strip.volume_down()
```

## Real-World Example

```python
# Shape × Renderer — avoid shape-renderer combinatorial explosion

class Renderer(ABC):
    @abstractmethod
    def draw_circle(self, x: float, y: float, r: float) -> None:
        ...

    @abstractmethod
    def draw_square(self, x: float, y: float, side: float) -> None:
        ...


class VectorRenderer(Renderer):
    def draw_circle(self, x: float, y: float, r: float) -> None:
        print(f"  [Vector] circle at ({x},{y}) r={r}")

    def draw_square(self, x: float, y: float, side: float) -> None:
        print(f"  [Vector] square at ({x},{y}) side={side}")


class RasterRenderer(Renderer):
    def draw_circle(self, x: float, y: float, r: float) -> None:
        print(f"  [Raster] circle at ({x},{y}) r={r}")

    def draw_square(self, x: float, y: float, side: float) -> None:
        print(f"  [Raster] square at ({x},{y}) side={side}")


class Shape(ABC):
    def __init__(self, renderer: Renderer) -> None:
        self._renderer = renderer

    @abstractmethod
    def draw(self) -> None:
        ...

    @abstractmethod
    def resize(self, factor: float) -> None:
        ...


class Circle(Shape):
    def __init__(self, renderer: Renderer, x: float, y: float, r: float) -> None:
        super().__init__(renderer)
        self._x, self._y, self._r = x, y, r

    def draw(self) -> None:
        self._renderer.draw_circle(self._x, self._y, self._r)

    def resize(self, factor: float) -> None:
        self._r *= factor


class Square(Shape):
    def __init__(self, renderer: Renderer, x: float, y: float, side: float) -> None:
        super().__init__(renderer)
        self._x, self._y, self._side = x, y, side

    def draw(self) -> None:
        self._renderer.draw_square(self._x, self._y, self._side)

    def resize(self, factor: float) -> None:
        self._side *= factor


# 2 shapes × 2 renderers = 4 combinations, only 4 total classes
vector_circle = Circle(VectorRenderer(), 10, 10, 5)
raster_square = Square(RasterRenderer(), 0, 0, 20)
vector_circle.draw()
raster_square.draw()
```

## Common Mistakes / Pitfalls

- **Over-application**: if only one dimension varies, Bridge adds unnecessary indirection. Use a simple interface instead.
- **Wrong abstraction/implementation split**: the abstraction should expose high-level operations that the implementation refines. If the abstraction calls specific implementation details, the separation is wrong.
- **Bridge vs Strategy**: Bridge is a structural pattern (deals with orthogonal hierarchies); Strategy is behavioural (switches algorithms at runtime). The code may look similar — check intent.
- **Not creating a true implementation interface**: if the implementation interface doesn't capture all primitives needed, you'll leak abstraction-specific methods into it.

## Related Concepts

- **Adapter** — makes unrelated classes work together; Bridge is designed up-front to decouple abstraction and implementation.
- **Strategy** — similar structure but Strategy encapsulates interchangeable algorithms (behavioural), while Bridge separates abstraction from implementation (structural).
- **Abstract Factory** — can create and configure a specific Bridge combination.
- **Template Method** — Template Method defines an algorithm's skeleton; Bridge separates the steps into an implementor hierarchy.

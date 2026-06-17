# Composition over Inheritance

## What Problem Does It Solve?
Deep inheritance hierarchies create rigid, fragile code. A change in a base class can shatter every subclass. A class that inherits behavior it doesn't need (a `Duck` that can't fly inheriting `fly()` from `Bird`) forces awkward overrides. Composition solves this by assembling objects from smaller, interchangeable parts — each part has a single job and can be mixed freely.

**Analogy:** A pre-built plastic toy car is a single mold — the wheels don't turn, the doors don't open. If the axle breaks, the whole car is trash. LEGO blocks, on the other hand, let you build a car from separate pieces: wheels, chassis, seats, engine. Each piece works independently. You can swap in racing wheels, add a spoiler, or rebuild the car into a plane. Broken axle? Replace it, not the whole car.

## How to Identify When to Use It

- Is your inheritance hierarchy more than 2–3 levels deep?
- Do subclasses override or stub out methods inherited from the base?
- Do you have a "god base class" that everything inherits from?
- Are you using inheritance just to share code (not to model an is-a relationship)?
- Would changing one method on the base class require changes in subclasses?
- Do you need to combine behaviors in ways the inheritance hierarchy didn't anticipate?
- **Red flag:** A subclass passes `*args, **kwargs` to `super().__init__()` without understanding them.

## How to Apply It

1. **Prefer interfaces/protocols over abstract base classes.** Define what an object *can do*, not what it *is*.
2. **Extract varying behavior into separate strategy objects.** Pass them in (dependency injection) instead of hard-coding them in subclasses.
3. **Use mixins or traits sparingly** for shared behavior across unrelated classes.
4. **Favour delegation over inheritance.** When a class needs another class's behavior, hold a reference to it rather than inheriting from it.
5. **Design for testability.** Composition makes it trivial to swap real dependencies for mocks/fakes.

```python
# BEFORE: Inheritance gone wrong
from abc import ABC, abstractmethod

class Bird(ABC):
    @abstractmethod
    def fly(self) -> str:
        pass

    @abstractmethod
    def swim(self) -> str:
        pass

    @abstractmethod
    def quack(self) -> str:
        pass

class Duck(Bird):
    def fly(self) -> str:
        return "Flies"

    def swim(self) -> str:
        return "Swims"

    def quack(self) -> str:
        return "Quack!"

class RubberDuck(Bird):  # A rubber duck IS-NOT-A bird
    def fly(self) -> str:
        raise NotImplementedError("Can't fly")

    def swim(self) -> str:
        return "Floats"

    def quack(self) -> str:
        return "Squeak!"

# AFTER: Composition with protocols
from typing import Protocol

class FlyBehavior(Protocol):
    def fly(self) -> str: ...

class SwimBehavior(Protocol):
    def swim(self) -> str: ...

class QuackBehavior(Protocol):
    def quack(self) -> str: ...

class CanFly:
    def fly(self) -> str:
        return "Flies"

class CanSwim:
    def swim(self) -> str:
        return "Swims"

class CanFloat:
    def swim(self) -> str:
        return "Floats"

class RealQuack:
    def quack(self) -> str:
        return "Quack!"

class Squeak:
    def quack(self) -> str:
        return "Squeak!"

class Duck:
    def __init__(self, fly: FlyBehavior, swim: SwimBehavior, quack: QuackBehavior):
        self._fly = fly
        self._swim = swim
        self._quack = quack

    def fly(self) -> str:
        return self._fly.fly()

    def swim(self) -> str:
        return self._swim.swim()

    def quack(self) -> str:
        return self._quack.quack()

# Assemble different kinds of ducks
real_duck = Duck(CanFly(), CanSwim(), RealQuack())
rubber_duck = Duck(CanFly(), CanFloat(), Squeak())  # Rubber duck doesn't fly but we can still compose it
```

## Real-World Example

**Before** — A reporting system using inheritance, where every report type extends a base:

```python
from abc import ABC, abstractmethod

class Report(ABC):
    def generate(self) -> str:
        data = self.fetch_data()
        formatted = self.format(data)
        return self.render(formatted)

    @abstractmethod
    def fetch_data(self) -> list[dict]:
        pass

    @abstractmethod
    def format(self, data: list[dict]) -> str:
        pass

    @abstractmethod
    def render(self, content: str) -> str:
        pass

class PdfSalesReport(Report):
    def fetch_data(self) -> list[dict]:
        return query_sales_db()

    def format(self, data: list[dict]) -> str:
        return json.dumps(data)

    def render(self, content: str) -> str:
        return f"<pdf>{content}</pdf>"

class HtmlSalesReport(Report):
    def fetch_data(self) -> list[dict]:
        return query_sales_db()

    def format(self, data: list[dict]) -> str:
        return json.dumps(data)

    def render(self, content: str) -> str:
        return f"<html>{content}</html>"
```

**After** — Compose each responsibility independently:

```python
from typing import Protocol

class DataFetcher(Protocol):
    def fetch(self) -> list[dict]: ...

class Formatter(Protocol):
    def format(self, data: list[dict]) -> str: ...

class Renderer(Protocol):
    def render(self, content: str) -> str: ...

class SalesDbFetcher:
    def fetch(self) -> list[dict]:
        return query_sales_db()

class JsonFormatter:
    def format(self, data: list[dict]) -> str:
        return json.dumps(data)

class PdfRenderer:
    def render(self, content: str) -> str:
        return f"<pdf>{content}</pdf>"

class HtmlRenderer:
    def render(self, content: str) -> str:
        return f"<html>{content}</html>"

class Report:
    def __init__(self, fetcher: DataFetcher, formatter: Formatter, renderer: Renderer):
        self._fetcher = fetcher
        self._formatter = formatter
        self._renderer = renderer

    def generate(self) -> str:
        data = self._fetcher.fetch()
        formatted = self._formatter.format(data)
        return self._renderer.render(formatted)

# Assemble any combination
pdf_report = Report(SalesDbFetcher(), JsonFormatter(), PdfRenderer())
html_report = Report(SalesDbFetcher(), JsonFormatter(), HtmlRenderer())

# Need CSV instead? Write a CsvFormatter — no inheritance changes needed.
# Need a new data source? Write a new fetcher.
```

## Common Mistakes / Pitfalls

- **Composition for everything.** Inheritance isn't evil — it's appropriate for true is-a hierarchies (e.g., `Circle` extends `Shape`). Use composition when behavior varies independently of identity.
- **Over-composing.** Too many tiny objects can make the system hard to reason about. Group fine-grained behaviors into meaningful components.
- **The "has-a" trap.** Composition models "has-a", not "depends-on". Passing a dependency via constructor is composition; passing it as a function parameter is just a dependency.
- **Losing polymorphic benefits.** Inheritance gives you automatic subtype polymorphism (`List<Shape>` works with `Circle`). With composition you need explicit interfaces or protocols to achieve the same.
- **Complex wiring.** Composition shifts complexity from class hierarchies to object wiring. Use dependency injection frameworks or factories to manage assembly.

## Related Concepts

- [SoC — Separation of Concerns](soc.md)
- [KISS — Keep It Simple, Stupid](kiss.md)
- [DRY — Don't Repeat Yourself](dry.md)

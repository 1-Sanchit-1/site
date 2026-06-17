# Abstract Factory (Creational)

## What Problem Does It Solve?

You need to create **families of related objects** that are designed to work together. The client shouldn't depend on which concrete family is in use — swapping the entire family should be seamless.

**Analogy:** A furniture store sells matching sets: Victorian (ornate chair + tufted sofa + claw-foot table) or Modern (sleek chair + minimalist sofa + glass table). A customer picks a style, and every piece they get is from that family. Mixing a Victorian chair with a Modern table would look wrong.

## How to Identify When to Use It

- Objects come in groups that must be used together (UI components, DB drivers, themes)
- You need to support multiple variants/configurations of a product line
- Your code has `if platform == "windows"` checks scattered for creating related objects
- You want to enforce that objects from different families aren't mixed accidentally

**Questions to ask yourself:**
- "If I swap one object, do I have to swap several others to keep things consistent?"
- "Could I combine all these `if` branches about platforms into a single place?"

**Red flags:**
- `if os == "win": ButtonWin()` followed by `if os == "win": MenuWin()` in another function
- Constructors that take a "style" or "theme" parameter repeated across unrelated classes
- Integration bugs where a Mac-style button appears inside a Windows-style dialog

## How to Apply It

1. Define abstract product interfaces for each product type (Button, Checkbox, Menu)
2. Create concrete product classes for each family (WinButton, MacButton, LinuxButton)
3. Define an abstract factory interface with creation methods for each product
4. Implement concrete factories for each family
5. Choose a factory at startup and pass it through the system

```python
from abc import ABC, abstractmethod


# --- Abstract products ---
class Button(ABC):
    @abstractmethod
    def render(self) -> str:
        pass


class Checkbox(ABC):
    @abstractmethod
    def render(self) -> str:
        pass


# --- Concrete products for Windows ---
class WinButton(Button):
    def render(self) -> str:
        return "Render [WinButton] with Aero style"


class WinCheckbox(Checkbox):
    def render(self) -> str:
        return "Render [WinCheckbox] with Aero style"


# --- Concrete products for Mac ---
class MacButton(Button):
    def render(self) -> str:
        return "Render [MacButton] with Aqua style"


class MacCheckbox(Checkbox):
    def render(self) -> str:
        return "Render [MacCheckbox] with Aqua style"


# --- Abstract Factory ---
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

    @abstractmethod
    def create_checkbox(self) -> Checkbox:
        pass


class WinFactory(GUIFactory):
    def create_button(self) -> Button:
        return WinButton()

    def create_checkbox(self) -> Checkbox:
        return WinCheckbox()


class MacFactory(GUIFactory):
    def create_button(self) -> Button:
        return MacButton()

    def create_checkbox(self) -> Checkbox:
        return MacCheckbox()


def build_ui(factory: GUIFactory) -> str:
    button = factory.create_button()
    checkbox = factory.create_checkbox()
    return f"{button.render()}\n{checkbox.render()}"


# Client picks factory once, never touches it again
factory = WinFactory() if __name__ == "__main__" else MacFactory()
print(build_ui(factory))
```

## Real-World Example

```python
from abc import ABC, abstractmethod


# --- Widget interfaces ---
class Label(ABC):
    @abstractmethod
    def draw(self) -> str:
        pass


class TextInput(ABC):
    @abstractmethod
    def draw(self) -> str:
        pass


class Dropdown(ABC):
    @abstractmethod
    def draw(self) -> str:
        pass


# --- Android widgets ---
class AndroidLabel(Label):
    def draw(self) -> str:
        return "Material Label"


class AndroidTextInput(TextInput):
    def draw(self) -> str:
        return "Material TextInput"


class AndroidDropdown(Dropdown):
    def draw(self) -> str:
        return "Material Dropdown"


# --- iOS widgets ---
class IOSLabel(Label):
    def draw(self) -> str:
        return "Cupertino Label"


class IOSTextInput(TextInput):
    def draw(self) -> str:
        return "Cupertino TextInput"


class IOSDropdown(Dropdown):
    def draw(self) -> str:
        return "Cupertino Dropdown"


# --- Abstract factory ---
class WidgetFactory(ABC):
    @abstractmethod
    def create_label(self) -> Label:
        pass

    @abstractmethod
    def create_text_input(self) -> TextInput:
        pass

    @abstractmethod
    def create_dropdown(self) -> Dropdown:
        pass


class AndroidWidgetFactory(WidgetFactory):
    def create_label(self) -> Label:
        return AndroidLabel()

    def create_text_input(self) -> TextInput:
        return AndroidTextInput()

    def create_dropdown(self) -> Dropdown:
        return AndroidDropdown()


class IOSWidgetFactory(WidgetFactory):
    def create_label(self) -> Label:
        return IOSLabel()

    def create_text_input(self) -> TextInput:
        return IOSTextInput()

    def create_dropdown(self) -> Dropdown:
        return IOSDropdown()


def render_form(factory: WidgetFactory) -> list[str]:
    return [
        factory.create_label().draw(),
        factory.create_text_input().draw(),
        factory.create_dropdown().draw(),
    ]


# To add a new platform (e.g., Web), create:
# - Concrete product classes (WebLabel, WebTextInput, WebDropdown)
# - WebWidgetFactory implementing WidgetFactory
# No existing code changes needed.


platform = "ios"
factories = {"android": AndroidWidgetFactory, "ios": IOSWidgetFactory}
factory = factories[platform]()
print(render_form(factory))
```

## Common Mistakes / Pitfalls

- **Overengineering:** If you only have one family (and probably won't have another), an Abstract Factory is unnecessary complexity.
- **Adding new product types is hard:** Each new product type (e.g., adding `Slider`) requires changing the abstract factory interface and every concrete factory. Consider a builder pattern if the product family is expected to grow.
- **Mixing families:** Don't pass a `MacFactory` but then manually instantiate `WinButton`. The whole point is consistency — let the factory handle everything.
- **Concrete factory as singleton:** You'll often pair Abstract Factory with Singleton (one factory instance per platform).

## Related Concepts

- Factory Method — Abstract Factory is often implemented using Factory Methods
- Builder — separates construction from representation for complex objects
- Singleton — concrete factories are often singletons

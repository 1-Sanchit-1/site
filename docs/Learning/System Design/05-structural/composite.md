# Composite (Structural)

## What Problem Does It Solve?

You need to treat individual objects and groups of objects uniformly. Without Composite, client code must distinguish between leaves and containers, leading to `if isinstance` checks and duplicated iteration logic. Think of a **file system**: a folder can contain files and sub-folders, and you can call `get_size()` on both — a file returns its own size, a folder aggregates the sizes of its children.

## How to Identify When It

- You have a tree-like structure of objects (UI widgets, file systems, organisational charts, HTML DOM)
- Client code should treat leaves and containers identically
- Operations can be applied recursively (e.g. render, calculate total, export to JSON)
- You want to add new component types without changing client code

**Questions to ask yourself:** Am I writing loops that iterate over children, and then again for sub-children? Do I have separate `render_leaf()` and `render_container()` methods?

**Red flags:** `if hasattr(obj, 'children')` guards; recursive functions that manually walk trees with type checks.

## How to Apply It

1. Define a **Component** interface that declares common operations (e.g. `render()`, `get_size()`).
2. Implement **Leaf** — objects that have no children (e.g. a Button, a File).
3. Implement **Composite** — a container that holds children and delegates operations to them, aggregating results.
4. Both Leaf and Composite implement the same Component interface.

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field


# --- Component ---

class UIWidget(ABC):
    @abstractmethod
    def render(self, indent: int = 0) -> None:
        ...


# --- Leaf ---

@dataclass
class Button(UIWidget):
    label: str

    def render(self, indent: int = 0) -> None:
        print(" " * indent + f"[Button] {self.label}")


@dataclass
class Label(UIWidget):
    text: str

    def render(self, indent: int = 0) -> None:
        print(" " * indent + f"[Label] {self.text}")


# --- Composite ---

@dataclass
class Panel(UIWidget):
    name: str
    children: list[UIWidget] = field(default_factory=list)

    def add(self, widget: UIWidget) -> None:
        self.children.append(widget)

    def remove(self, widget: UIWidget) -> None:
        self.children.remove(widget)

    def render(self, indent: int = 0) -> None:
        prefix = " " * indent
        print(f"{prefix}[Panel] {self.name}")
        for child in self.children:
            child.render(indent + 2)


# --- Usage ---

if __name__ == "__main__":
    main_panel = Panel("MainWindow")

    toolbar = Panel("Toolbar")
    toolbar.add(Button("Open"))
    toolbar.add(Button("Save"))

    sidebar = Panel("Sidebar")
    sidebar.add(Label("Favorites"))
    sidebar.add(Label("Recent"))

    main_panel.add(toolbar)
    main_panel.add(sidebar)
    main_panel.add(Button("Submit"))

    main_panel.render()
```

## Real-World Example

```python
# HTML element tree — every node implements render()

class HtmlNode(ABC):
    @abstractmethod
    def render(self) -> str:
        ...

    @abstractmethod
    def count_nodes(self) -> int:
        ...


class TextNode(HtmlNode):
    def __init__(self, text: str) -> None:
        self._text = text

    def render(self) -> str:
        return self._text

    def count_nodes(self) -> int:
        return 1


class Element(HtmlNode):
    def __init__(self, tag: str, *children: HtmlNode) -> None:
        self._tag = tag
        self._children: list[HtmlNode] = list(children)

    def render(self) -> str:
        inner = "".join(c.render() for c in self._children)
        return f"<{self._tag}>{inner}</{self._tag}>"

    def count_nodes(self) -> int:
        return 1 + sum(c.count_nodes() for c in self._children)


# Build: <div><p>Hello</p><ul><li>A</li><li>B</li></ul></div>
tree = Element("div",
    Element("p", TextNode("Hello")),
    Element("ul",
        Element("li", TextNode("A")),
        Element("li", TextNode("B")),
    ),
)

print(tree.render())
print(f"Node count: {tree.count_nodes()}")
```

## Common Mistakes / Pitfalls

- **Violating the interface**: adding child-management methods (`add`, `remove`) to the Component interface forces leaves to implement them (and throw). In Python you can split into `MutableComponent` vs `Component`, or keep them on Composite only.
- **Ordering assumptions**: Composite should not depend on a specific child ordering unless the domain requires it.
- **Circular references**: a Composite must not contain itself (directly or indirectly). Use parent references carefully.
- **Performance on large trees**: iterating all children recursively can be slow; consider caching aggregated values.

## Related Concepts

- **Decorator** — also uses recursive composition, but Decorator wraps one object; Composite aggregates many children.
- **Iterator** — often used together: an Iterator traverses the Composite tree.
- **Visitor** — lets you add operations to a Composite tree without changing component classes.
- **Flyweight** — shares leaf data to reduce memory in large trees.

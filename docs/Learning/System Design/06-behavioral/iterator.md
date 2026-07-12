# Iterator (Behavioral)

## What Problem Does It Solve?

You have a collection of objects and need to provide a way to access its elements sequentially without exposing the underlying representation (array, tree, hash map, etc.). Adding traversal logic directly to the collection bloats its interface and couples clients to the collection's internal structure. The Iterator pattern lets you traverse a collection without exposing its internal layout. Think of a **TV remote's channel surfing**: you press "next channel" or "previous channel" without knowing how the TV stores its channel list — it could be a sequential list, a favourites list sorted by frequency, or a tree of categories. The remote (iterator) gives you a uniform way to navigate channels.

## How to Identify When to Use It

- A collection has a complex internal structure but you want to provide a simple way to traverse it
- You need to support multiple traversal methods (forward, reverse, filtered, etc.)
- You want to decouple traversal logic from the collection's business logic
- You want to traverse different collections uniformly through a common interface

**Questions to ask yourself:** Does this collection need multiple traversal algorithms? Would clients benefit from not knowing whether the data is stored as a list, tree, or set?

**Red flags:** The collection class exposes methods like `get_all()`, `get_by_index()`, `get_next()`, etc., that reveal how data is stored; traversal loops duplicated across the codebase.

## How to Apply It

1. Define an **Iterator** interface with methods `__next__()` and (optionally) `has_next()` / `current()`.
2. The **Aggregate** (collection) interface declares a `create_iterator()` method.
3. Implement concrete iterators that track the current position and know how to move through the collection.
4. In Python, make the iterator conform to the `__iter__` / `__next__` protocol so it works with `for` loops.

```python
from __future__ import annotations
from dataclasses import dataclass, field
from typing import Any, List, Optional, Protocol


# --- Iterator protocol (Pythonic) ---

class Iterator:
    """Minimal iterator following Python's iteration protocol."""
    def __iter__(self) -> "Iterator":
        return self

    def __next__(self) -> Any:
        raise StopIteration


# --- Concrete collection ---

@dataclass
class Playlist:
    songs: List[str] = field(default_factory=list)

    def add_song(self, song: str) -> None:
        self.songs.append(song)

    def __iter__(self) -> Iterator:
        return PlaylistIterator(self)

    def reverse_iterator(self) -> Iterator:
        return ReversePlaylistIterator(self)

    def shuffle_iterator(self) -> Iterator:
        return ShufflePlaylistIterator(self)


# --- Concrete iterators ---

class PlaylistIterator(Iterator):
    def __init__(self, playlist: Playlist) -> None:
        self._songs = playlist.songs
        self._index = 0

    def __next__(self) -> str:
        if self._index >= len(self._songs):
            raise StopIteration
        song = self._songs[self._index]
        self._index += 1
        return song


class ReversePlaylistIterator(Iterator):
    def __init__(self, playlist: Playlist) -> None:
        self._songs = playlist.songs
        self._index = len(self._songs) - 1

    def __next__(self) -> str:
        if self._index < 0:
            raise StopIteration
        song = self._songs[self._index]
        self._index -= 1
        return song


class ShufflePlaylistIterator(Iterator):
    def __init__(self, playlist: Playlist) -> None:
        self._songs = list(playlist.songs)
        import random
        random.shuffle(self._songs)
        self._index = 0

    def __next__(self) -> str:
        if self._index >= len(self._songs):
            raise StopIteration
        song = self._songs[self._index]
        self._index += 1
        return song


if __name__ == "__main__":
    playlist = Playlist()
    playlist.add_song("Bohemian Rhapsody")
    playlist.add_song("Stairway to Heaven")
    playlist.add_song("Hotel California")

    print("Forward:")
    for song in playlist:
        print(f"  {song}")

    print("Reverse:")
    for song in playlist.reverse_iterator():
        print(f"  {song}")

    print("Shuffled:")
    for song in playlist.shuffle_iterator():
        print(f"  {song}")
```

## Real-World Example

```python
# Tree traversal — iterate over a binary tree in different orders.

from __future__ import annotations
from dataclasses import dataclass, field
from typing import Any, List, Optional


@dataclass
class TreeNode:
    value: Any
    left: Optional[TreeNode] = None
    right: Optional[TreeNode] = None


class BinaryTree:
    def __init__(self, root: Optional[TreeNode] = None) -> None:
        self._root = root

    def inorder_iterator(self) -> Iterator:
        return InOrderIterator(self._root)

    def preorder_iterator(self) -> Iterator:
        return PreOrderIterator(self._root)

    def postorder_iterator(self) -> Iterator:
        return PostOrderIterator(self._root)


class Iterator:
    def __iter__(self) -> Iterator:
        return self

    def __next__(self) -> Any:
        raise StopIteration


class InOrderIterator(Iterator):
    """Left → Root → Right"""
    def __init__(self, root: Optional[TreeNode]) -> None:
        self._stack: List[TreeNode] = []
        self._push_left(root)

    def _push_left(self, node: Optional[TreeNode]) -> None:
        while node:
            self._stack.append(node)
            node = node.left

    def __next__(self) -> Any:
        if not self._stack:
            raise StopIteration
        node = self._stack.pop()
        self._push_left(node.right)
        return node.value


class PreOrderIterator(Iterator):
    """Root → Left → Right"""
    def __init__(self, root: Optional[TreeNode]) -> None:
        self._stack: List[TreeNode] = []
        if root:
            self._stack.append(root)

    def __next__(self) -> Any:
        if not self._stack:
            raise StopIteration
        node = self._stack.pop()
        if node.right:
            self._stack.append(node.right)
        if node.left:
            self._stack.append(node.left)
        return node.value


class PostOrderIterator(Iterator):
    """Left → Right → Root"""
    def __init__(self, root: Optional[TreeNode]) -> None:
        self._stack: List[TreeNode] = []
        self._output: List[Any] = []
        if root:
            self._stack.append(root)
        self._build_output()

    def _build_output(self) -> None:
        while self._stack:
            node = self._stack.pop()
            self._output.append(node.value)
            if node.left:
                self._stack.append(node.left)
            if node.right:
                self._stack.append(node.right)
        self._output.reverse()
        self._index = 0

    def __next__(self) -> Any:
        if self._index >= len(self._output):
            raise StopIteration
        val = self._output[self._index]
        self._index += 1
        return val


if __name__ == "__main__":
    #       1
    #      / \
    #     2   3
    #    / \
    #   4   5
    root = TreeNode(1,
        TreeNode(2, TreeNode(4), TreeNode(5)),
        TreeNode(3),
    )
    tree = BinaryTree(root)

    print("In-order (Left-Root-Right):", list(tree.inorder_iterator()))    # [4, 2, 5, 1, 3]
    print("Pre-order (Root-Left-Right):", list(tree.preorder_iterator()))  # [1, 2, 4, 5, 3]
    print("Post-order (Left-Right-Root):", list(tree.postorder_iterator())) # [4, 5, 2, 3, 1]
```

## Common Mistakes / Pitfalls

- **Modifying the collection during iteration**: concurrent modification usually causes undefined behaviour. Either use a snapshot iterator (copy the collection) or a fail-fast iterator that detects changes.
- **Iterator not resetting**: if an iterator is consumed, calling `__iter__` again should return a fresh iterator (Python's protocol expects this).
- **Bidirectional vs. single-direction**: not all collections support reverse iteration. Design the iterator interface to match what the collection can actually provide.
- **Memory overhead for large collections**: some iterators (like tree post-order) pre-build the entire output. For massive collections, prefer lazy/yielding iterators.

## Related Concepts

- **Composite** — Iterator is commonly used to traverse Composite trees.
- **Visitor** — can traverse a structure using an iterator and perform operations on each element.
- **Generator functions** — Python's `yield` is a syntactic shortcut that creates an iterator without explicitly implementing the protocol.

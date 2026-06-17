# KISS (Keep It Simple, Stupid)

## What Problem Does It Solve?
Software systems collapse under their own weight when every contributor adds "just one more abstraction." Overengineering produces code that is hard to understand, expensive to maintain, and brittle to change. The KISS principle reminds us that simplicity is the ultimate sophistication in engineering.

**Analogy:** You need to drive a single screw into drywall. A Swiss Army knife has 15 tools — screwdriver, corkscrew, scissors, magnifying glass — but you'll fumble finding the right bit, the handle is awkward, and you risk stripping the screw. A dedicated screwdriver does one thing, does it well, and takes two seconds. Simple solutions win.

## How to Identify When to Use It

- Are you adding abstractions before you have a concrete need?
- Can a newcomer read a pull request and understand it in under two minutes?
- Do your classes/modules have more than 3–5 responsibilities?
- Are you using a framework feature just because it exists, not because you need it?
- Do error messages read like a stack trace from a different codebase?
- Can you delete more code than you add in a typical commit?
- **Red flag:** Someone says "it's simple" and then spends 10 minutes explaining it.

## How to Apply It

1. **Start with the dumbest thing that works.** Write the straightforward solution first. Optimize later.
2. **Delete unused code.** If it isn't called, delete it. Version control remembers it.
3. **Prefer flat over nested.** Flatten conditionals; extract early returns.
4. **Limit each function to one level of abstraction.** A function should either orchestrate calls or do raw work, not both.
5. **Name things for what they are right now**, not what they might become.

```python
# BEFORE: Overengineered
from abc import ABC, abstractmethod
from typing import List, Optional
import os

class FileProcessor(ABC):
    @abstractmethod
    def process(self, data: str) -> str:
        pass

class UpperCaseProcessor(FileProcessor):
    def process(self, data: str) -> str:
        return data.upper()

class FileHandler:
    def __init__(self, processor: FileProcessor):
        self._processor = processor

    def handle(self, path: str) -> Optional[str]:
        if not os.path.exists(path):
            return None
        with open(path) as f:
            content = f.read()
        return self._processor.process(content)

# AFTER: Keep it simple
def read_file_uppercase(path: str) -> str | None:
    if not os.path.exists(path):
        return None
    with open(path) as f:
        return f.read().upper()
```

## Real-World Example

**Before** — A logging utility with pluggable transports, formatting strategies, and async buffering for an app that just needs stdout:

```python
import abc
import asyncio
from enum import Enum

class LogLevel(Enum):
    INFO = 1
    ERROR = 2

class Transport(abc.ABC):
    @abc.abstractmethod
    async def send(self, msg: str): ...

class ConsoleTransport(Transport):
    async def send(self, msg: str):
        print(msg)

class AsyncBufferedLogger:
    def __init__(self, transport: Transport, buffer_size: int = 10):
        self._transport = transport
        self._buffer = []
        self._buffer_size = buffer_size

    async def log(self, level: LogLevel, msg: str):
        self._buffer.append(f"[{level.name}] {msg}")
        if len(self._buffer) >= self._buffer_size:
            await self.flush()

    async def flush(self):
        for entry in self._buffer:
            await self._transport.send(entry)
        self._buffer.clear()
```

**After** — Remove what you don't need today:

```python
import logging

logging.basicConfig(level=logging.INFO, format="[%(levelname)s] %(message)s")
```

## Common Mistakes / Pitfalls

- **Equating "simple" with "familiar."** A convoluous regex might feel simple because you wrote it; to everyone else it's magic.
- **Premature simplification.** Stripping out abstractions before you understand the problem can create rigidity. Simplicity emerges from iteration, not from the first pass.
- **Over-normalising.** Two similar-but-not-identical code paths are fine; forcing them into one shared path with five `if` branches is not simpler.
- **Believing simplicity is easy.** Simple code is harder to write than complex code. It requires discipline and clarity of thought.

## Related Concepts

- [YAGNI — You Ain't Gonna Need It](yagni.md)
- [DRY — Don't Repeat Yourself](dry.md)
- [SoC — Separation of Concerns](soc.md)

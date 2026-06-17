# Command (Behavioral)

## What Problem Does It Solve?

You need to parameterise objects with operations, delay execution, queue requests, support undo/redo, or log operations for auditing. Hard-coding each action as a direct method call couples the invoker to the receiver and makes it impossible to replay or reverse operations. The Command pattern encapsulates a request as an object, allowing you to store, queue, log, and undo actions. Think of a **restaurant order**: you (client) tell the waiter (invoker) your request; the waiter writes the order slip (command) and hands it to the chef (receiver). The slip can be queued, prioritised, or even cancelled before cooking starts.

## How to Identify When to Use It

- You need to parameterise objects with an action to perform
- You want to support undo/redo functionality
- You need to queue, schedule, or log requests
- You want to decouple the object that invokes an operation from the one that knows how to perform it

**Questions to ask yourself:** Can I represent each action as an object? Do I need to replay or reverse a sequence of operations?

**Red flags:** Undo implemented by saving snapshots of entire object state rather than inverse commands; action methods scattered across UI layer directly calling business logic.

## How to Apply It

1. Declare the **Command** interface with a single `execute` method (and optionally `undo`).
2. Implement concrete commands that hold a reference to the **Receiver** and call its methods in `execute`.
3. The **Invoker** stores and triggers commands (it knows nothing about the receiver).
4. Optionally, maintain a **history stack** for undo/redo support.
5. Client creates commands, configures the invoker, and runs them.

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List


# --- Command interface ---

class Command(ABC):
    @abstractmethod
    def execute(self) -> None:
        ...

    @abstractmethod
    def undo(self) -> None:
        ...


# --- Receiver ---

class TextEditor:
    def __init__(self) -> None:
        self.content: str = ""

    def insert(self, text: str, position: int) -> None:
        self.content = self.content[:position] + text + self.content[position:]

    def delete(self, start: int, end: int) -> str:
        deleted = self.content[start:end]
        self.content = self.content[:start] + self.content[end:]
        return deleted


# --- Concrete Commands ---

@dataclass
class InsertCommand(Command):
    editor: TextEditor
    text: str
    position: int = field(default=0)

    def execute(self) -> None:
        self.editor.insert(self.text, self.position)

    def undo(self) -> None:
        end = self.position + len(self.text)
        self.editor.delete(self.position, end)


@dataclass
class DeleteCommand(Command):
    editor: TextEditor
    start: int
    end: int
    _backup: str = field(default="", init=False)

    def execute(self) -> None:
        self._backup = self.editor.delete(self.start, self.end)

    def undo(self) -> None:
        self.editor.insert(self._backup, self.start)


# --- Invoker ---

class EditorInvoker:
    def __init__(self) -> None:
        self._history: List[Command] = []

    def execute(self, command: Command) -> None:
        command.execute()
        self._history.append(command)

    def undo(self) -> None:
        if self._history:
            cmd = self._history.pop()
            cmd.undo()


if __name__ == "__main__":
    editor = TextEditor()
    invoker = EditorInvoker()

    invoker.execute(InsertCommand(editor, "Hello, ", 0))
    invoker.execute(InsertCommand(editor, "world!", 7))
    print(editor.content)  # Hello, world!

    invoker.undo()
    print(editor.content)  # Hello, 

    invoker.undo()
    print(editor.content)  # (empty)
```

## Real-World Example

```python
# Remote control for a smart home — each button press is a command.

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List


class Command(ABC):
    @abstractmethod
    def execute(self) -> None:
        ...

    @abstractmethod
    def undo(self) -> None:
        ...


# --- Receivers ---

class Light:
    def __init__(self, name: str) -> None:
        self.name = name
        self._on = False

    def turn_on(self) -> None:
        self._on = True
        print(f"{self.name} is ON")

    def turn_off(self) -> None:
        self._on = False
        print(f"{self.name} is OFF")


class Thermostat:
    def __init__(self) -> None:
        self._temp: float = 22.0

    def set_temperature(self, temp: float) -> None:
        print(f"Thermostat: {self._temp}°C → {temp}°C")
        self._temp = temp


# --- Commands ---

@dataclass
class LightOnCommand(Command):
    light: Light

    def execute(self) -> None:
        self.light.turn_on()

    def undo(self) -> None:
        self.light.turn_off()


@dataclass
class LightOffCommand(Command):
    light: Light

    def execute(self) -> None:
        self.light.turn_off()

    def undo(self) -> None:
        self.light.turn_on()


@dataclass
class ThermostatCommand(Command):
    thermostat: Thermostat
    temperature: float
    _prev_temp: float = field(default=22.0, init=False)

    def execute(self) -> None:
        self._prev_temp = self.thermostat._temp
        self.thermostat.set_temperature(self.temperature)

    def undo(self) -> None:
        self.thermostat.set_temperature(self._prev_temp)


# --- Macro command (composite) ---

class MacroCommand(Command):
    def __init__(self, commands: List[Command]) -> None:
        self._commands = commands
        self._executed: List[Command] = []

    def execute(self) -> None:
        for cmd in self._commands:
            cmd.execute()
            self._executed.append(cmd)

    def undo(self) -> None:
        for cmd in reversed(self._executed):
            cmd.undo()


# --- Invoker ---

class RemoteControl:
    def __init__(self) -> None:
        self._history: List[Command] = []

    def press(self, command: Command) -> None:
        command.execute()
        self._history.append(command)

    def press_undo(self) -> None:
        if self._history:
            self._history.pop().undo()


if __name__ == "__main__":
    living_room = Light("Living Room Light")
    kitchen = Light("Kitchen Light")
    thermostat = Thermostat()

    remote = RemoteControl()

    # Single commands
    remote.press(LightOnCommand(living_room))
    remote.press(LightOnCommand(kitchen))
    remote.press(ThermostatCommand(thermostat, 18.0))

    # Macro: "Goodnight" — turn everything off
    goodnight = MacroCommand([
        LightOffCommand(living_room),
        LightOffCommand(kitchen),
        ThermostatCommand(thermostat, 16.0),
    ])
    remote.press(goodnight)

    # Undo the macro
    remote.press_undo()
```

## Common Mistakes / Pitfalls

- **Commands doing too much**: a command should encapsulate a single action. If a command touches multiple receivers, consider a macro/compound command.
- **State management for undo**: commands must store enough state to reverse their action. Lightweight snapshots (Memento) often pair well with Command.
- **Memory leaks in history**: unbounded undo history can exhaust memory. Cap the history size or use a command-store with eviction.
- **Receiver not serialisable**: if commands are logged for replay (event sourcing), both the command and receiver state must be serialisable.

## Related Concepts

- **Memento** — captures object state for undo; often used together with Command.
- **Strategy** — both encapsulate behaviour, but Command encapsulates a *request* while Strategy encapsulates an *algorithm*.
- **Chain of Responsibility** — can forward a command through a chain of handlers.
- **Observer** — can be used to notify when a command is executed (e.g., audit log).

# Polymorphism

## What Problem Does It Solve?
Polymorphism solves the problem of writing generic code that works with objects of different types through a single, uniform interface. Without it, you'd need conditional logic (`if type(x) == Dog: ... elif type(x) == Cat: ...`) everywhere, making the code rigid and hard to extend.

Think of a **universal remote**. It has a "power" button that works on your TV, soundbar, and streaming stick. You don't care *how* each device handles the power signal — you just press the button. Polymorphism is the same: objects of different classes respond to the same method call in their own way.

## How to Identify When to Use It
- You have a family of related classes that share the same methods but implement them differently
- You need to process a collection of heterogeneous objects uniformly
- You're writing `if type(x) == ...` or `isinstance(x, ...)` checks to handle different types
- New variants of a concept should be addable without changing existing code (Open/Closed)
- You want to write functions that depend on an abstraction, not a concrete type

**Questions to ask yourself:**
- Can I replace these conditionals with a method call on the object?
- Would an interface or abstract base class capture what I need?
- If I add a new type tomorrow, will existing code work without changes?

**Red flags:** Long `if/elif` chains branching on type, `match/case` blocks checking type, switch statements on type enums, functions that ask "what kind are you?" instead of telling objects what to do.

## How to Apply It
1. Define a common interface (abstract base class or protocol)
2. Each concrete class implements the interface methods
3. Write code that depends only on the interface
4. Pass in any concrete implementation at runtime

```python
from abc import ABC, abstractmethod

class NotificationChannel(ABC):
    @abstractmethod
    def send(self, message: str, recipient: str) -> bool:
        """Deliver a message to the recipient."""
        pass

class EmailChannel(NotificationChannel):
    def send(self, message: str, recipient: str) -> bool:
        print(f"📧 Sending email to {recipient}: {message[:50]}...")
        # Connect to SMTP server
        return True

class SMSChannel(NotificationChannel):
    def send(self, message: str, recipient: str) -> bool:
        print(f"📱 Sending SMS to {recipient}: {message[:50]}...")
        # Connect to Twilio API
        return True

class PushChannel(NotificationChannel):
    def send(self, message: str, recipient: str) -> bool:
        print(f"🔔 Sending push notification to device {recipient}...")
        # Send via Firebase
        return True

# Polymorphic function — works with ANY NotificationChannel
def notify_all(channels: list[NotificationChannel], message: str, recipients: dict[str, list[str]]) -> None:
    for channel in channels:
        # Each channel type handles "send" differently
        for r in recipients.get(channel.__class__.__name__, []):
            channel.send(message, r)
```

## Real-World Example
A **data export system** that exports reports to PDF, CSV, and Excel with the same interface.

```python
from abc import ABC, abstractmethod

class ReportExporter(ABC):
    @abstractmethod
    def export(self, data: list[dict], filename: str) -> str:
        """Export data and return the file path."""
        pass

class CSVExporter(ReportExporter):
    def export(self, data: list[dict], filename: str) -> str:
        import csv
        path = f"{filename}.csv"
        with open(path, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=data[0].keys())
            writer.writeheader()
            writer.writerows(data)
        return path

class PDFExporter(ReportExporter):
    def export(self, data: list[dict], filename: str) -> str:
        from fpdf import FPDF
        path = f"{filename}.pdf"
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        for row in data:
            line = " | ".join(str(v) for v in row.values())
            pdf.cell(200, 10, txt=line, ln=True)
        pdf.output(path)
        return path

def run_report(data: list[dict], exporter: ReportExporter) -> str:
    # The caller decides which exporter to pass in
    return exporter.export(data, "monthly_report")

# Usage — add new formats without changing run_report
csv = CSVExporter()
pdf = PDFExporter()
run_report([{"name": "Alice", "sales": 100}], csv)
run_report([{"name": "Bob", "sales": 200}], pdf)
```

`run_report` never checks what `exporter` actually is. You can add a `JSONExporter` or `ParquetExporter` without touching `run_report` at all.

## Common Mistakes / Pitfalls
- **Using isinstance checks anyway**: If you find yourself checking `isinstance(obj, SomeConcreteClass)` in polymorphic code, you defeated the purpose. Push the varying behavior into the class.
- **Blurry interfaces**: An interface with 10 methods where most subclasses only need 2 violates the Interface Segregation Principle. Keep interfaces focused.
- **Over-engineering**: Not everything needs polymorphism. If you have exactly one implementation now and no plans for more, a simple function is fine.
- **Duck typing gotchas in Python**: Python doesn't enforce interfaces at runtime by default. Use `ABC` or `Protocol` to make expectations clear.
- **Name collisions**: When unrelated classes happen to have a method with the same name but different semantics. Be explicit about what contract the method fulfills.


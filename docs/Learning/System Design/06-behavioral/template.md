# Template Method (Behavioral)

## What Problem Does It Solve?

You have an algorithm that follows the same skeleton across multiple implementations, but some steps differ. Copy-pasting the skeleton into every implementation creates duplication, and changing the shared structure requires touching every copy. The Template Method pattern defines the skeleton of an algorithm in a base class and lets subclasses override specific steps without changing the algorithm's structure. Think of **making tea vs. coffee**: both follow "boil water → brew → pour in cup → add condiments", but "brew" differs (steep teabag vs. drip coffee grounds) and "condiments" differ (lemon/sugar vs. milk/sugar). The recipe framework stays the same.

## How to Identify When to Use It

- Multiple classes implement variations of the same algorithm with the same overall structure
- You want to enforce a standard sequence of steps while allowing customisation of individual steps
- Code duplication exists in the invariant parts of similar algorithms
- You want to ensure subclasses don't accidentally change the algorithm's structure

**Questions to ask yourself:** If I lay out the steps side-by-side, do the implementations share the same sequence? Which steps are fixed and which vary?

**Red flags:** Almost identical methods copied across several classes; a "framework" method with comments like "Step 1... Step 2... Step 3..." that subclasses are expected to replicate.

## How to Apply It

1. Define a base class with a **template method** that outlines the algorithm's skeleton (it calls several step methods).
2. Declasteps as `abstractmethod` (must be overridden) or concrete hooks (optional override).
3. Implement the invariant steps in the base class.
4. Subclasses override the abstract steps and optionally the hooks.
5. The template method should be `final` (or non-overridable by convention) to preserve the algorithm structure.

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass


# --- Abstract base with template method ---

class DataProcessingPipeline(ABC):
    """Template Method: the steps are fixed, subclasses override the details."""

    def run(self, input_data: str) -> str:
        """Template method — defines the skeleton."""
        raw = self.extract(input_data)
        transformed = self.transform(raw)
        loaded = self.load(transformed)
        return loaded

    @abstractmethod
    def extract(self, source: str) -> str:
        ...

    @abstractmethod
    def transform(self, data: str) -> str:
        ...

    @abstractmethod
    def load(self, data: str) -> str:
        ...

    # Optional hook — subclasses may override
    def validate(self, data: str) -> bool:
        return True


# --- Concrete implementations ---

class CsvToJsonPipeline(DataProcessingPipeline):
    def extract(self, source: str) -> str:
        print(f"[CSV] Reading CSV from {source}")
        return "col1,col2\nval1,val2"

    def transform(self, data: str) -> str:
        print("[CSV] Converting CSV rows to JSON")
        lines = data.strip().split("\n")
        headers = lines[0].split(",")
        records = []
        for line in lines[1:]:
            values = line.split(",")
            records.append(dict(zip(headers, values)))
        import json
        return json.dumps(records, indent=2)

    def load(self, data: str) -> str:
        print("[CSV] Writing JSON to output file")
        with open("/tmp/output.json", "w") as f:
            f.write(data)
        return data


class ApiToDatabasePipeline(DataProcessingPipeline):
    def extract(self, source: str) -> str:
        print(f"[API] Fetching data from {source}")
        return '{"users": [{"id": 1, "name": "Alice"}]}'

    def transform(self, data: str) -> str:
        print("[API] Cleaning and normalising API response")
        import json
        parsed = json.loads(data)
        return "\n".join(f"{u['id']},{u['name']}" for u in parsed["users"])

    def load(self, data: str) -> str:
        print("[API] Inserting records into database")
        return f"Inserted: {data}"


if __name__ == "__main__":
    CsvToJsonPipeline().run("data.csv")
    print("---")
    ApiToDatabasePipeline().run("https://api.example.com/users")
```

## Real-World Example

```python
# Report generator — same structure, different output formats.

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List


@dataclass
class SalesRecord:
    product: str
    units: int
    revenue: float


class ReportGenerator(ABC):
    """Template Method for generating business reports."""

    def generate(self, records: List[SalesRecord]) -> str:
        header = self.build_header(records)
        body = self.build_body(records)
        footer = self.build_footer(records)
        return self.format_report(header, body, footer)

    @abstractmethod
    def build_header(self, records: List[SalesRecord]) -> str:
        ...

    @abstractmethod
    def build_body(self, records: List[SalesRecord]) -> str:
        ...

    @abstractmethod
    def build_footer(self, records: List[SalesRecord]) -> str:
        ...

    @abstractmethod
    def format_report(self, header: str, body: str, footer: str) -> str:
        ...

    # Hook
    def sort_records(self, records: List[SalesRecord]) -> List[SalesRecord]:
        return records


class HtmlReportGenerator(ReportGenerator):
    def build_header(self, records: List[SalesRecord]) -> str:
        total = sum(r.revenue for r in records)
        return f"<h1>Sales Report</h1><p>Total Revenue: ${total:.2f}</p>"

    def build_body(self, records: List[SalesRecord]) -> str:
        rows = "".join(
            f"<tr><td>{r.product}</td><td>{r.units}</td><td>${r.revenue:.2f}</td></tr>"
            for r in records
        )
        return f"<table><tr><th>Product</th><th>Units</th><th>Revenue</th></tr>{rows}</table>"

    def build_footer(self, records: List[SalesRecord]) -> str:
        return "<p><em>Generated automatically</em></p>"

    def format_report(self, header: str, body: str, footer: str) -> str:
        return f"<html><body>{header}{body}{footer}</body></html>"


class MarkdownReportGenerator(ReportGenerator):
    def build_header(self, records: List[SalesRecord]) -> str:
        total = sum(r.revenue for r in records)
        return f"# Sales Report\n\n**Total Revenue:** ${total:.2f}\n"

    def build_body(self, records: List[SalesRecord]) -> str:
        lines = ["| Product | Units | Revenue |", "|---------|-------|---------|"]
        for r in records:
            lines.append(f"| {r.product} | {r.units} | ${r.revenue:.2f} |")
        return "\n".join(lines)

    def build_footer(self, records: List[SalesRecord]) -> str:
        return "\n\n*Generated automatically*"

    def format_report(self, header: str, body: str, footer: str) -> str:
        return f"{header}{body}{footer}"


if __name__ == "__main__":
    data = [
        SalesRecord("Widget A", 100, 499.99),
        SalesRecord("Widget B", 250, 1249.50),
    ]

    print(HtmlReportGenerator().generate(data))
    print("---")
    print(MarkdownReportGenerator().generate(data))
```

## Common Mistakes / Pitfalls

- **Template method not marked as non-overridable**: if subclasses can override the template method itself, the pattern's guarantee of a fixed algorithm skeleton is broken. Enforce by convention or use a non-virtual method.
- **Too many abstract steps**: every abstract method is a burden on subclass implementors. Use hooks (optional overrides with default no-op behaviour) for steps that most subclasses won't need.
- **Hollywood Principle violation**: "Don't call us, we'll call you" — the base class should call subclass methods, not the other way around. Subclasses should never call the template method.
- **Deep inheritance hierarchies**: prefer composition over inheritance for complex step customisation. Template Method works best with shallow hierarchies (1-2 levels).

## Related Concepts

- **Strategy** — both isolate variable behaviour, but Strategy replaces an entire algorithm via composition, while Template Method overrides specific steps via inheritance.
- **Factory Method** — often called within a template method to create objects needed by the algorithm.
- **Hook operations** — optional overridable steps in the template method (e.g., `should_apply_discount()`).

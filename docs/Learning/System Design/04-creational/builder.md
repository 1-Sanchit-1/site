# Builder (Creational)

## What Problem Does It Solve?

An object has many optional parts, leading to **telescoping constructors** — a constructor with 10 parameters where most have defaults. Constructors become unreadable, error-prone, and hard to extend.

**Analogy:** Subway sandwich. You don't call a single "make sandwich" function with 15 arguments. Instead, you step through: choose bread → choose meat → choose cheese → add veggies → add sauce → toast or not → wrap. Each step is clear, and you can skip optional ones.

## How to Identify When to Use It

- A constructor has 4+ parameters, many optional
- Different combinations of parameters create meaningful variants
- The construction process has multiple steps that should happen in order
- The same construction process should produce different representations

**Questions to ask yourself:**
- "Could a reader easily mix up the order of boolean/string parameters?"
- "Do I need to validate that certain parameter combinations are valid?"

**Red flags:**
- `Product(param1=None, param2=None, param3="default", param4=None, ...)`
- You keep jumping to the class definition to remember parameter order
- Adding one more optional parameter requires changing every call site

## How to Apply It

1. Identify what product you're building and what optional/required parts it has
2. Create a **Builder** class with fluent setter methods (each returns `self`) for each optional part
3. Add a `build()` method that validates and returns the final product
4. (Optional) Add a **Director** that orchestrates common build sequences

```python
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class SQLQuery:
    table: str = ""
    select_columns: list[str] = field(default_factory=list)
    joins: list[str] = field(default_factory=list)
    where_clauses: list[str] = field(default_factory=list)
    order_by: Optional[str] = None
    limit: Optional[int] = None

    def execute(self) -> str:
        parts = [f"SELECT {', '.join(self.select_columns) or '*'} FROM {self.table}"]
        parts.extend(self.joins)
        if self.where_clauses:
            parts.append(f"WHERE {' AND '.join(self.where_clauses)}")
        if self.order_by:
            parts.append(f"ORDER BY {self.order_by}")
        if self.limit is not None:
            parts.append(f"LIMIT {self.limit}")
        return " ".join(parts) + ";"


class SQLQueryBuilder:
    def __init__(self, table: str):
        self._query = SQLQuery(table=table)

    def select(self, *columns: str) -> "SQLQueryBuilder":
        self._query.select_columns = list(columns)
        return self

    def join(self, table: str, on: str) -> "SQLQueryBuilder":
        self._query.joins.append(f"JOIN {table} ON {on}")
        return self

    def where(self, condition: str) -> "SQLQueryBuilder":
        self._query.where_clauses.append(condition)
        return self

    def order_by(self, column: str) -> "SQLQueryBuilder":
        self._query.order_by = column
        return self

    def limit(self, n: int) -> "SQLQueryBuilder":
        self._query.limit = n
        return self

    def build(self) -> SQLQuery:
        if not self._query.table:
            raise ValueError("Table name is required")
        return self._query


query = (
    SQLQueryBuilder("users")
    .select("id", "name", "email")
    .join("orders", "users.id = orders.user_id")
    .where("users.active = true")
    .where("orders.total > 100")
    .order_by("users.name")
    .limit(10)
    .build()
)

print(query.execute())
# SELECT id, name, email FROM users JOIN orders ON users.id = orders.user_id
# WHERE users.active = true AND orders.total > 100 ORDER BY users.name LIMIT 10;
```

## Real-World Example

```python
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class HTTPRequest:
    method: str = "GET"
    url: str = ""
    headers: dict[str, str] = field(default_factory=dict)
    query_params: dict[str, str] = field(default_factory=dict)
    body: Optional[str] = None
    timeout: int = 30


class HTTPRequestBuilder:
    def __init__(self, url: str):
        self._request = HTTPRequest(url=url)

    def get(self) -> "HTTPRequestBuilder":
        self._request.method = "GET"
        return self

    def post(self, body: str = "") -> "HTTPRequestBuilder":
        self._request.method = "POST"
        self._request.body = body
        return self

    def put(self, body: str = "") -> "HTTPRequestBuilder":
        self._request.method = "PUT"
        self._request.body = body
        return self

    def delete(self) -> "HTTPRequestBuilder":
        self._request.method = "DELETE"
        return self

    def header(self, key: str, value: str) -> "HTTPRequestBuilder":
        self._request.headers[key] = value
        return self

    def query_param(self, key: str, value: str) -> "HTTPRequestBuilder":
        self._request.query_params[key] = value
        return self

    def with_timeout(self, seconds: int) -> "HTTPRequestBuilder":
        self._request.timeout = seconds
        return self

    def build(self) -> HTTPRequest:
        return self._request


# Director — pre-canned configurations
class APIClientDirector:
    @staticmethod
    def get_users() -> HTTPRequest:
        return (
            HTTPRequestBuilder("https://api.example.com/users")
            .get()
            .header("Authorization", "Bearer token123")
            .header("Accept", "application/json")
            .query_param("page", "1")
            .query_param("limit", "50")
            .with_timeout(10)
            .build()
        )

    @staticmethod
    def create_user(name: str, email: str) -> HTTPRequest:
        return (
            HTTPRequestBuilder("https://api.example.com/users")
            .post(f'{{"name": "{name}", "email": "{email}"}')
            .header("Content-Type", "application/json")
            .with_timeout(15)
            .build()
        )


req = APIClientDirector.get_users()
print(vars(req))
```

## Common Mistakes / Pitfalls

- **Mutable builder, immutable product:** The builder itself can be reused (call `.build()` multiple times) or reset. Be clear about the lifecycle.
- **Forgetting validation in `build()`:** Don't let invalid products be created. Validate required fields in `build()`.
- **Not returning `self`:** For fluent chaining, every setter must `return self`.
- **Overusing builder:** If an object only has 2-3 required fields with no options, a simple constructor or `dataclass` is better.

## Related Concepts

- Fluent interface — the chaining style is a fluent interface
- Factory Method — builder is for step-by-step construction; factory is for one-shot creation
- Prototype — builder can use prototype to clone default configurations

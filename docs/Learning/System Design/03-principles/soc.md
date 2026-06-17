# SoC (Separation of Concerns)

## What Problem Does It Solve?
When a single module handles data access, business logic, presentation, and logging, every change ripples through unrelated concerns. The code becomes a tangled ball of mud where touching one thing breaks another. Separation of Concerns splits the system into distinct sections so that each addresses a specific, isolated responsibility.

**Analogy:** A restaurant kitchen. The grill station sears steaks, the prep station chops vegetables, the pastry station bakes desserts. Each station has its own tools, workflow, and expertise. If the grill cook had to stop and bake a cake every time a table ordered dessert, the steak would burn and the cake would arrive late. By separating concerns, each station focuses on what it does best.

## How to Identify When to Use It

- Does one class or module import from every layer of the application?
- Are you unit-testing business logic through the database or the HTTP layer?
- Can you not change the database schema without updating the UI?
- Do you struggle to find where a specific behavior lives?
- Are concerns mixed in a single file (e.g., SQL queries inside HTML templates)?
- Do your test files take minutes to set up because of cross-cutting dependencies?
- **Red flag:** A pull request touches 20+ files across every directory.

## How to Apply It

1. **Identify the distinct concerns in your system.** Common layers: presentation, application logic, domain logic, data access, configuration.
2. **Define clear boundaries between layers.** Each layer depends only on the layer(s) directly below it.
3. **Use interfaces/abstract types at boundaries** so layers can be swapped independently.
4. **Keep each file focused on one concern.** A file called `user_service.py` should not contain SQL queries or HTML rendering.
5. **Separate cross-cutting concerns** (logging, auth, metrics) via middleware or decorators, not by threading them through business logic.

```python
# BEFORE: Mixed concerns — I/O, business logic, and presentation in one function
def get_order_summary(order_id: int):
    import sqlite3
    conn = sqlite3.connect("shop.db")
    cur = conn.cursor()
    cur.execute("SELECT id, total, status FROM orders WHERE id = ?", (order_id,))
    row = cur.fetchone()
    conn.close()

    if row is None:
        return "<h1>Order not found</h1>"

    discount = row[1] * 0.1 if row[1] > 100 else 0
    final = row[1] - discount
    return f"<h1>Order #{row[0]}</h1><p>Total: ${final:.2f}</p>"

# AFTER: Separated concerns
# data/orders.py
from dataclasses import dataclass

@dataclass
class Order:
    id: int
    total: float
    status: str

class OrderRepository:
    def __init__(self, db_path: str = "shop.db"):
        self._db_path = db_path

    def find_by_id(self, order_id: int) -> Order | None:
        import sqlite3
        conn = sqlite3.connect(self._db_path)
        cur = conn.cursor()
        cur.execute("SELECT id, total, status FROM orders WHERE id = ?", (order_id,))
        row = cur.fetchone()
        conn.close()
        return Order(*row) if row else None

# domain/pricing.py
def apply_discount(order: Order) -> float:
    return order.total * 0.9 if order.total > 100 else order.total

# presentation/templates.py
def render_order_summary(order: Order, final_total: float) -> str:
    return f"<h1>Order #{order.id}</h1><p>Total: ${final_total:.2f}</p>"

# application/order_service.py
def get_order_summary(order_id: int) -> str:
    repo = OrderRepository()
    order = repo.find_by_id(order_id)
    if order is None:
        return "<h1>Order not found</h1>"
    final = apply_discount(order)
    return render_order_summary(order, final)
```

## Real-World Example

**Before** — A Django view that queries, validates, and renders all in one place:

```python
from django.shortcuts import render
from django.http import HttpResponse
from .models import Order

def order_view(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return HttpResponse("Not found", status=404)

    if request.method == "POST":
        order.status = "cancelled"
        order.save()
        return HttpResponse("Cancelled")

    discount = order.total * 0.1 if order.total > 100 else 0
    return render(request, "order.html", {"order": order, "discount": discount})
```

**After** — Separate controller, service, and repository concerns:

```python
# views.py
@require_http_methods(["GET", "POST"])
def order_view(request, order_id):
    if request.method == "POST":
        cancel_order(order_id)
        return HttpResponse("Cancelled")
    order, discount = get_order_summary(order_id)
    return render(request, "order.html", {"order": order, "discount": discount})

# services.py
def get_order_summary(order_id: int) -> tuple[Order, float]:
    order = OrderRepository().find_by_id(order_id)
    discount = calculate_discount(order)
    return order, discount

def cancel_order(order_id: int) -> None:
    OrderRepository().update_status(order_id, "cancelled")

# repository.py
class OrderRepository:
    def find_by_id(self, order_id: int) -> Order: ...
    def update_status(self, order_id: int, status: str) -> None: ...
```

## Common Mistakes / Pitfalls

- **Over-separation (class explosion).** One class per concern is good; one class per method is absurd. Find the right granularity for your project's scale.
- **Leaky abstractions.** Layers exist to isolate change, but if your ORM query patterns leak into the presentation layer, separation is illusory.
- **Performance paranoia.** Developers often resist separation because "it adds an extra function call." The cost is negligible; the maintenance cost of tangled code is not.
- **Slicing by technical concern only.** A folder per layer (`models/`, `views/`, `controllers/`) is standard, but also consider slicing by domain feature (`orders/`, `users/`, `payments/`) for vertical separation.
- **Ignoring cross-cutting concerns.** Logging, auth, and metrics touch every layer. Don't bake them into every function — use decorators, middleware, or aspect-oriented patterns.

## Related Concepts

- [KISS — Keep It Simple, Stupid](kiss.md)
- [DRY — Don't Repeat Yourself](dry.md)
- [Composition over Inheritance](composition.md)

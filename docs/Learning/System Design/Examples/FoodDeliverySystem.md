# Food Delivery System (Swiggy/Zomato)

---

# Food Delivery System

## High Level Flow

```text
Customer

|

Search Restaurant

|

Add Items

|

Place Order

|

Pay

|

Track Delivery
```

---

# Design Patterns Used

## 1. Abstract Factory ⭐⭐⭐

### Problem

Different restaurants create different food families.

```text
McDonald's

Burger

Fries

Coke
```

```text
Pizza Hut

Pizza

Garlic Bread

Pepsi
```

Diagram

```text
Customer
   |
   v
RestaurantFactory
   |
   +--> McDonaldsFactory
   |
   +--> PizzaHutFactory
```

Rule

> Abstract Factory = Create a family of related objects.

When to use:

```text
Burger + Fries + Coke

Pizza + Garlic Bread + Pepsi
```

---

## 2. State Pattern ⭐⭐⭐

Orders change state.

```text
Placed

Preparing

Out for delivery

Delivered

Cancelled
```

Diagram

```text
Order

|

+--> Placed

|

+--> Preparing

|

+--> OutForDelivery

|

+--> Delivered
```

Rule

> State = Object changes behavior based on its current state.

When to use:

* Orders
* Booking lifecycle
* Workflow systems

---

## 3. Chain of Responsibility ⭐⭐⭐

Coupon validation.

Instead of:

```python
if coupon:
   ...

if user:
   ...

if restaurant:
   ...
```

Pass through a chain.

Diagram

```text
Request

|

v

Coupon Validator

|

v

User Validator

|

v

Restaurant Validator

|

v

Payment Validator
```

Rule

> Chain = Pass request through multiple handlers.

When to use:

* Authentication
* Validation
* Middleware

---

## 4. Template Method ⭐⭐

Every restaurant follows similar steps.

```text
Take Order

↓

Prepare Food

↓

Pack Food

↓

Deliver Food
```

Only preparation differs.

Diagram

```text
Base Template

|

+--> PizzaRestaurant

|

+--> BurgerRestaurant
```

Rule

> Template = Same skeleton, different implementation.

When to use:

* ETL pipelines
* Payment flows
* Order processing

---

## 5. Proxy ⭐⭐

Heavy object should be protected.

```text
User

|

v

Proxy

|

v

Google Maps API
```

Proxy:

* caching
* authentication
* rate limiting

Rule

> Proxy = Control access to another object.

When to use:

* External APIs
* Expensive services

---

# Final Diagram

```text
                      Customer
                           |
                           v

                +--------------------+
                | FoodDeliverySystem |
                +--------------------+

                     |         |

                     |         |

                     v         v

              Restaurant     Order

                     |         |

                     |         |

                     v         v

            AbstractFactory   State

                     |         |

             +-------+----+    |

             |            |    |

      McDonalds      PizzaHut  |

                                |

Order Flow                      |

Placed                          |

Preparing                       |

OutForDelivery                  |

Delivered                       |


Validation Pipeline

Coupon

↓

User

↓

Restaurant

↓

Payment

(Chain Of Responsibility)


Restaurant Processing

Take Order

↓

Prepare Food

↓

Pack Food

↓

Deliver Food

(Template Method)


External Services

User

|

Proxy

|

Google Maps API
```

## Shortcut

```text
Create objects?
→ Factory

Create object family?
→ Abstract Factory

Complex object?
→ Builder

One object?
→ Singleton

Switch algorithm?
→ Strategy

Notify many users?
→ Observer

Object changes state?
→ State

Validate pipeline?
→ Chain of Responsibility

Hide complexity?
→ Facade

Protect access?
→ Proxy
```

This is a great way to make **LLD interview notes**. I would keep the same style and add **Top 3 Structural** and **Top 3 Behavioral** patterns.

# LLD Design Patterns (Easy Analogy Notes)

---

# CREATIONAL PATTERNS

# 1. Singleton Pattern

## One Security Guard

Imagine a Ryan Square building.

There should be **only one security guard**.

```text
Block A ----\
Block B ----- > Security Guard (only one security guard for all blocks)
Block C ----/

Everyone uses the same guard.
```

### Rule

> Singleton = "Only one object for everyone."

### When to use

* Database connection
* Logger
* Config manager

---

# 2. Factory Pattern

## Restaurant Kitchen

You don't cook food yourself.

You simply say:

```text
"Give me Burger"

or

"Give me Pizza"
```

The kitchen decides:

* ingredients
* cooking process
* oven temperature

You only ask for the final product.

```text
Customer
   |
   v
Kitchen (Factory)
   |
   +--> Pizza
   |
   +--> Burger
```

### Rule

> Factory = "You ask, factory creates."

### When to use

When you have many object types.

```text
Car
Bike
Truck

or

Email
SMS
Push Notification
```

and don't want `if-else` everywhere.

---

# 3. Builder Pattern

## Build Your Own PC

You don't say:

```text
Give me everything.
```

You choose step by step:

```text
CPU → Intel i9
RAM → 32GB
SSD → 1TB
GPU → RTX 5090

Then press:

Build
```

```text
You
 |
 +--> CPU
 |
 +--> RAM
 |
 +--> SSD
 |
 +--> GPU
 |
 +--> Build
       |
       v
    Computer
```

### Rule

> Builder = "Build a complex object step by step."

### When to use

When an object has lots of optional fields.

Examples:

* Computer
* House
* SQL Query Builder
* API Request Builder

---

# STRUCTURAL PATTERNS

# 1. Adapter Pattern

## Travel Adapter (Power Plug Converter)

You travel from India to the USA.

Your charger cannot fit.

```text
Indian Charger
       |
       v
Travel Adapter
       |
       v
USA Socket
```

The adapter makes two incompatible things work together.

### Rule

> Adapter = "Convert one interface into another."

### When to use

* Third-party APIs
* Legacy systems
* Different data formats

Examples:

```text
Old Payment API
New Payment API

or

XML -> JSON
```

---

# 2. Decorator Pattern

## Pizza Toppings

You start with a plain pizza.

Then add toppings.

```text
Pizza

+ Cheese

+ Mushroom

+ Olives
```

```text
Plain Pizza
      |
      +--> Cheese
      |
      +--> Mushroom
      |
      +--> Olives
```

You keep adding features without changing the original pizza.

### Rule

> Decorator = "Add features without modifying the original object."

### When to use

Examples:

```text
Coffee + Milk

Coffee + Sugar

Coffee + Cream
```

or

```text
Logger

Logger + Timestamp

Logger + File Logging
```

---

# 3. Facade Pattern

## TV Remote

Inside a TV there are many systems.

```text
TV

Sound System

HDMI

Display

WiFi
```

But you don't control them individually.

You simply use one remote.

```text
You
 |
 v
TV Remote (Facade)
 |
 +--> TV
 +--> Sound
 +--> HDMI
 +--> WiFi
```

### Rule

> Facade = "One simple interface for a complex system."

### When to use

Examples:

* Payment service
* Video processing service
* Booking service

---

# BEHAVIORAL PATTERNS

# 1. Observer Pattern

## YouTube Subscribers

You subscribe to a channel.

Whenever the creator uploads a video, everyone gets notified.

```text
YouTube Channel
      |
      +--> User A
      |
      +--> User B
      |
      +--> User C
```

### Rule

> Observer = "One changes, many get notified."

### When to use

Examples:

* Notifications
* Event systems
* Stock price updates

---

# 2. Strategy Pattern

## Google Maps Route Selection

You want to go somewhere.

You can choose:

```text
Car

Bike

Walk
```

```text
You
 |
 v
Google Maps
 |
 +--> Car Route
 |
 +--> Bike Route
 |
 +--> Walking Route
```

The algorithm changes but the goal stays the same.

### Rule

> Strategy = "Choose a behavior at runtime."

### When to use

Examples:

* Payment methods
* Sorting algorithms
* Search algorithms

---

# 3. Command Pattern

## Restaurant Waiter

You don't go to the chef.

You tell the waiter.

```text
Customer
   |
   v
Waiter (Command)
   |
   v
Chef
```

The waiter carries your request.

### Rule

> Command = "Convert a request into an object."

### When to use

Examples:

* Undo/Redo
* Queue systems
* Task schedulers

---

# 30-Second Interview Cheat Sheet

```text
CREATIONAL

Need ONE object?
→ Singleton

Need DIFFERENT objects?
→ Factory

Need a BIG object built in steps?
→ Builder


STRUCTURAL

Need to CONNECT incompatible things?
→ Adapter

Need to ADD features?
→ Decorator

Need to HIDE complexity?
→ Facade


BEHAVIORAL

Need NOTIFICATIONS?
→ Observer

Need to SWITCH algorithms?
→ Strategy

Need to EXECUTE requests?
→ Command
```



- [**Car Rental**](Examples/Car_rental.md)

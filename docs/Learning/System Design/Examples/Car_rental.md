This is actually a **very common LLD interview question**.

The interviewer usually doesn't expect you to use **every design pattern**. They expect you to identify **where each pattern fits naturally**.

# Car Rental System (Uber/Ola/Zoomcar style)

## High Level Flow

```text
                    +----------------+
                    |      User      |
                    +----------------+
                            |
                     Search Car
                            |
                            v
                 +------------------+
                 | CarRentalSystem   |
                 +------------------+
                  |        |       |
                  |        |       |
                  |        |       |
                  v        v       v

           +---------+ +---------+ +---------+
           |  Car    | | Booking | | Payment |
           +---------+ +---------+ +---------+
                  |          |           |
                  |          |           |
                  v          v           v

         +-----------+ +-----------+ +-----------+
         | Sedan     | | Active    | | CreditCard|
         | SUV       | | Completed | | UPI       |
         | Hatchback | | Cancelled | | Wallet    |
         +-----------+ +-----------+ +-----------+
```

---

# Design Patterns We Can Use

## 1. Factory Pattern ⭐⭐⭐

### Problem

Many car types exist.

```text
Sedan
SUV
Hatchback
Luxury
```

Don't create objects everywhere.

### Diagram

```text
Admin/User
    |
    v
CarFactory
    |
    +--> Sedan
    |
    +--> SUV
    |
    +--> Hatchback
```

### Rule

> Factory = "Give me a car"

### Example

```python
car = CarFactory.create("SUV")
```

---

# 2. Singleton Pattern ⭐⭐⭐

### Problem

Entire application should have only one rental system.

```text
User A ----\
User B -----> CarRentalSystem
User C ----/

Only one system
```

### Use

```text
CarRentalSystem
```

stores:

* all users
* all bookings
* all cars

### Rule

> Singleton = One rental system for everyone

---

# 3. Builder Pattern ⭐⭐⭐

### Problem

Booking has many optional fields.

```text
Pickup location
Drop location
Insurance
GPS
Baby seat
Extra driver
```

Instead of:

```python
Booking(a,b,c,d,e,f,g,h)
```

Build step by step.

### Diagram

```text
User

|

+--> Pickup

|

+--> Drop

|

+--> Insurance

|

+--> GPS

|

+--> Build

      |

      v

   Booking
```

### Rule

> Builder = Build booking step by step

---

# 4. Strategy Pattern ⭐⭐⭐

### Problem

Different payment methods.

```text
Credit Card
UPI
Wallet
Net Banking
```

Diagram

```text
User
 |
 v
PaymentService
 |
 +--> UPI Strategy
 |
 +--> Card Strategy
 |
 +--> Wallet Strategy
```

### Rule

> Strategy = Change behavior at runtime

---

# 5. Observer Pattern ⭐⭐⭐

### Problem

Notify users.

```text
Booking confirmed

Car arriving

Trip started

Trip completed
```

Diagram

```text
Booking System
       |
       +--> User
       |
       +--> Driver
       |
       +--> Admin
```

### Rule

> Observer = One changes, many get notified

---

# 6. Facade Pattern ⭐⭐

Hide complexity.

Instead of calling:

```text
Search Service

Booking Service

Payment Service

Notification Service
```

Expose one interface.

```text
User
 |
 v
RentalFacade
 |
 +--> Search
 |
 +--> Booking
 |
 +--> Payment
 |
 +--> Notification
```

### Rule

> Facade = One entry point

---

# Final LLD Diagram

```text
                           User
                             |
                             |
                             v
                  +-------------------+
                  |   RentalFacade    |
                  +-------------------+
                    |      |       |
                    |      |       |
                    v      v       v

             SearchCar  Booking  Payment

                    |       |       |
                    |       |       |

                    v       v       v

            +------------+  +----------------+
            | CarFactory |  | BookingBuilder |
            +------------+  +----------------+
               |                |
         +-----+-----+          |
         |     |     |          |
       Sedan  SUV Hatchback     |
                                |
                                v
                            Booking


Payment
   |
   +--> UPI Strategy
   +--> Card Strategy
   +--> Wallet Strategy


Booking Updates
       |
       +--> User
       +--> Driver
       +--> Admin
       (Observer)


Entire App
       |
       v
CarRentalSystem (Singleton)
```

# Interview Cheat Sheet

| Component        | Pattern   | Why                         |
| ---------------- | --------- | --------------------------- |
| Car creation     | Factory   | Many car types              |
| Main system      | Singleton | Only one system             |
| Booking creation | Builder   | Many optional fields        |
| Payment          | Strategy  | Multiple payment algorithms |
| Notifications    | Observer  | Notify many users           |
| Main API         | Facade    | Hide complexity             |

For **LLD interviews**, whenever you hear **Car Rental, Food Delivery, Hotel Booking, Library Management, Parking Lot**, first think:

```text
Objects -> Factory

One global system -> Singleton

Complex object -> Builder

Switch behavior -> Strategy

Notifications -> Observer

Hide complexity -> Facade
```

This shortcut solves **70-80% of interview questions**.

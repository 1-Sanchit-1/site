# [`OOPs`](oops_python.md)

---

# 🌟 OOPS Concepts

## 🔒 Encapsulation

Encapsulation is the process of **bundling data** and the **functions that operate on that data** into a single unit, while restricting access to some internal components. This hides the internal state and requires all interactions to happen through methods.

### 🚗 Example:

Consider a **Car** class. It encapsulates data like `make`, `model`, `year`, and has methods like `start()`, `stop()`, and `accelerate()`. The internal workings of these methods are hidden from the user.

---

## 🎭 Abstraction

Abstraction allows us to focus on the **essential features** of an object without getting into the details of how it's implemented. It simplifies complex realities by modeling classes appropriately.

### 🖌️ Example:

A **Shape** class may have methods like `draw()` and `calculateArea()`. Whether it's a **Circle** or a **Rectangle**, you don’t need to know how the calculations are performed—just that they work.

- **Encapsulation**: _Information hiding_
- **Abstraction**: _Implementation hiding_

### 📝 Example in C++:

```cpp
class Foo {
    private:
        int a, b;
    public:
        Foo(int x=0, int y=0) : a(x), b(y) {}

        int add() {
            return a + b;
        }
};
```

Here, the internal data `a` and `b` are hidden.  
**➡️ Encapsulation** hides the internal structure of the class.  
When calling `add()`, how the function works is hidden.  
**➡️ Abstraction** hides the method's internal implementation.

```cpp
Foo foo_obj(3, 4);
int sum = foo_obj.add();
```

---

## 🔄 Polymorphism

Polymorphism enables us to define a single interface or method that works across different types. It comes in two forms: **method overriding** and **method overloading**.

### 🐕 Example:

`Animal` class may have a method `makeSound()`. Subclasses like `Dog` and `Cat` can override this method to provide specific behavior. This lets us handle multiple types of animals using a single method call:

```java
Animal dog = new Dog();
dog.makeSound();  // Outputs "Bark!"
```

---

## 🧬 Inheritance

Inheritance is a mechanism that allows a new class to **inherit properties and methods** from an existing class, promoting reusability.

### 🚗 Example:

A `Vehicle` class with properties like `speed` and methods like `move()` can be inherited by a `Car` class, which will automatically gain access to these features.

---

## 🛠 Virtual Functions

Virtual functions in C++ enable **run-time polymorphism**, allowing derived classes to modify behaviors defined in a base class.

```cpp
class Animal {
    virtual void makeSound() { cout << "Some sound"; }
};
class Dog : public Animal {
    void makeSound() { cout << "Bark!"; }
};
```

This allows dynamic behavior based on the object type at runtime.

```cpp
Animal* myDog = new Dog();
myDog->makeSound();
```

## [📜**Static Keyword**](static.md)

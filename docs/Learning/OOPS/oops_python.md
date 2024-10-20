### OOP in Python

#### 1. **Class and Object**

- **Class**: A blueprint for creating objects (a data structure), defining its attributes and methods.
- **Object**: An instance of a class.

```python
# Example of a class and object
class Car:
    def __init__(self, brand, model):
        self.brand = brand  # instance variable
        self.model = model  # instance variable

# Creating an object (instance) of class Car
car1 = Car('Tesla', 'Model S')
print(car1.brand)  # Output: Tesla
```

#### 2. **Methods in Python**

- **Instance Method**: A method that operates on an instance of a class, accessing its attributes.
- **Class Method**: Defined using `@classmethod` and takes `cls` as its first argument. It can access class variables but not instance variables.
- **Static Method**: Defined using `@staticmethod`, it doesn’t require `self` or `cls`. It’s independent of the instance and class.

```python
class Example:
    def instance_method(self):  # Instance method
        return "Instance method called", self

    @classmethod
    def class_method(cls):  # Class method
        return "Class method called", cls

    @staticmethod
    def static_method():  # Static method
        return "Static method called"

obj = Example()
print(obj.instance_method())  # Output: Instance method called
print(Example.class_method())  # Output: Class method called
print(Example.static_method())  # Output: Static method called
```

#### 3. **Modifiers**

- **Public**: Accessible everywhere.
- **Private**: Defined with a double underscore `__`, can only be accessed within the class.
- **Protected**: Defined with a single underscore `_`, accessible within the class and its subclasses.

```python
class Example:
    def __init__(self):
        self.public_var = "Public"
        self._protected_var = "Protected"
        self.__private_var = "Private"

    def display(self):
        return self.__private_var  # Accessing private inside class

obj = Example()
print(obj.public_var)  # Output: Public
print(obj._protected_var)  # Output: Protected
# print(obj.__private_var)  # Error: Private attribute
print(obj.display())  # Output: Private
```

#### 4. **Static Variables (Class Variables)**

- Variables shared among all instances of a class. Defined outside any instance methods but within the class body.

```python
class Student:
    school_name = "ABC School"  # Static variable (class variable)

    def __init__(self, name):
        self.name = name  # Instance variable

student1 = Student("John")
student2 = Student("Jane")
print(student1.school_name)  # Output: ABC School
print(student2.school_name)  # Output: ABC School
```

#### 5. **Inheritance**

- **Inheritance** allows a class to inherit attributes and methods from another class.
- **Single Inheritance**: One class inherits from another.
- **Multiple Inheritance**: A class inherits from more than one base class.

```python
class Vehicle:
    def __init__(self, brand):
        self.brand = brand

    def display_brand(self):
        return self.brand

class Car(Vehicle):  # Inheriting from Vehicle
    def __init__(self, brand, model):
        super().__init__(brand)  # Calling parent constructor
        self.model = model

    def display(self):
        return f"Car brand: {self.brand}, model: {self.model}"

car1 = Car("Tesla", "Model X")
print(car1.display())  # Output: Car brand: Tesla, model: Model X
```

#### 6. **Polymorphism**

- **Polymorphism** allows methods or objects to take many forms, typically seen in method overriding or method overloading.
- **Method Overriding**: Subclass can have a method with the same name as a method in the parent class.

```python
class Animal:
    def speak(self):
        return "Animal sound"

class Dog(Animal):
    def speak(self):  # Overriding
        return "Bark"

dog = Dog()
print(dog.speak())  # Output: Bark
```

#### 7. **Encapsulation**

- **Encapsulation** is the bundling of data and methods that operate on that data within one class and restricting access from outside the class.
- Can be implemented using public, private, or protected access modifiers.

```python
class Encapsulated:
    def __init__(self):
        self.__private_data = 10  # Private attribute

    def get_private_data(self):  # Public method to access private data
        return self.__private_data

obj = Encapsulated()
print(obj.get_private_data())  # Output: 10
```

#### 8. **Abstraction**

- **Abstraction** means hiding the implementation details from the user and only exposing the functionality.
- Achieved using abstract classes in Python (via `abc` module).

```python
from abc import ABC, abstractmethod

class Animal(ABC):  # Abstract class
    @abstractmethod
    def sound(self):
        pass

class Dog(Animal):  # Concrete class
    def sound(self):
        return "Bark"

dog = Dog()
print(dog.sound())  # Output: Bark
```

### Summary

- **Class**: Blueprint for creating objects.
- **Instance/Static Methods**: Define the behavior of objects/classes.
- **Encapsulation**: Restrict access to certain details of an object.
- **Inheritance**: Reuse code by inheriting attributes/methods from other classes.
- **Polymorphism**: Different forms of behavior through method overriding.
- **Abstraction**: Hiding complex details and showing only essential features.

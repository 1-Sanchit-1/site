PEP 8 (Python Enhancement Proposal 8) is the **style guide** for writing Python code. It helps you write code that is **clean, readable, and consistent** with the wider Python community.

---
# ✅ PEP 8 
---

## 📏 1. **Indentation**

* Use **4 spaces per indentation level**.

```python
def my_function():
    x = 1
    if x > 0:
        print("Positive")
```

🔴 Avoid tabs or mixing tabs and spaces.

---

## 📚 2. **Maximum Line Length**

* Keep lines **≤ 79 characters** (for code)
* Keep comments/docstrings **≤ 72 characters**

```python
# This is a comment that is short and sweet
```

For long expressions:

```python
# OK - Implicit line continuation inside parentheses
total = (first_variable
         + second_variable
         + third_variable)
```

---

## 🧾 3. **Blank Lines**

* Top-level functions/classes: **2 blank lines**
* Methods inside a class: **1 blank line**

```python
class MyClass:
    
    def method_one(self):
        pass

    def method_two(self):
        pass
```

---

## 🔤 4. **Imports**

* Import **standard libraries**, **third-party libraries**, and **local imports** in separate sections with blank lines in between.
* Always import **each module on a separate line**

```python
# Correct
import os
import sys

# Wrong
import sys, os
```

Ordering:

```python
import os
import sys

import requests

import my_local_module
```

---

## 🧠 5. **Naming Conventions**

| Type      | Convention                    | Example           |
| --------- | ----------------------------- | ----------------- |
| Variable  | `lower_case_with_underscores` | `total_count`     |
| Function  | `lower_case_with_underscores` | `calculate_sum()` |
| Class     | `CapitalizedWords`            | `MyClass`         |
| Constants | `ALL_CAPS`                    | `MAX_RETRIES`     |
| Modules   | `short_lowercase`             | `utils.py`        |
| Private   | `_single_leading_underscore`  | `_internal`       |
| Special   | `__double_underscores__`      | `__init__`        |

---

## ❓ 6. **Use of Whitespace**

### 👍 Correct:

```python
x = 1
y = 2
z = x + y
```

### 👎 Wrong:

```python
x=1
y =2
z= x+y
```

### More guidelines:

* **No space** before a comma, semicolon, colon:

  ```python
  print(x, y)
  ```

* **Yes space** after:

  ```python
  print(x, y)
  ```

* No space inside brackets:

  ```python
  my_list = [1, 2, 3]
  ```

---

## 🧾 7. **Comments**

### Inline comments:

```python
x = x + 1  # Increment x
```

### Block comments:

```python
# This function adds two numbers
# and returns the result
def add(x, y):
    return x + y
```

### Docstrings (triple quotes):

```python
def add(x, y):
    """Add two numbers and return the result."""
    return x + y
```

---

## ✅ 8. **Comparison to None and Booleans**

* Use `is` / `is not` with `None`, not `==` or `!=`:

```python
if x is None:
    ...
```

* Avoid comparisons to `True` or `False`:

```python
# Good
if is_valid:
    ...

# Bad
if is_valid == True:
    ...
```

---

## 🧼 9. **Avoid Unnecessary Expressions**

```python
# Good
if not x:
    ...

# Bad
if x == False:
    ...
```

---

## 🧰 10. **Function and Class Definitions**

Leave **2 blank lines** before top-level functions and classes.

```python
def my_function():
    ...

class MyClass:
    ...
```

---

## 🧹 11. **Using linters**

Tools like `flake8`, `pylint`, or `black` automatically check or format code according to PEP 8.


`black` auto-formats your code:

```bash
pip install black
```

---

## 🧩 12. **Continuation Line Indentation**

Use 4 spaces for wrapped lines, aligning naturally or with parentheses:

```python
# Align with open delimiter
my_function(param_one, param_two,
            param_three, param_four)

# Or aligned with first argument
my_function(
    param_one, param_two,
    param_three
)
```

---

## 🧮 13. **Avoid Lambda for Complex Logic**

```python
# OK
squares = map(lambda x: x*x, numbers)

# Better for readability
def square(x): return x*x
squares = map(square, numbers)
```

---

## ❌ 14. **Don't Use Wildcard Imports**

```python
# Bad
from math import *

# Good
from math import sqrt, pi
```

---

## ⚙️ 15. **Consistent Exception Handling**

```python
try:
    ...
except ValueError as e:
    print(e)
```

---

## 📦 16. **Avoid Mutable Defaults**

```python
# Bad
def add_item(item, my_list=[]):
    my_list.append(item)
    return my_list

# Good
def add_item(item, my_list=None):
    if my_list is None:
        my_list = []
    my_list.append(item)
    return my_list
```

---

# 🧑‍💻 Summary

| Concept     | Rule/Best Practice                       |
| ----------- | ---------------------------------------- |
| Indentation | 4 spaces                                 |
| Line length | ≤ 79 characters                          |
| Imports     | Grouped: stdlib, 3rd-party, local        |
| Naming      | Use snake\_case, PascalCase, UPPER\_CASE |
| Comments    | Use inline & block, write meaningful     |
| Whitespace  | Be consistent, avoid extra spaces        |
| Docstrings  | Use triple quotes for functions/classes  |
| Tools       | Use `black`, `flake8`, `isort`, etc.     |

---


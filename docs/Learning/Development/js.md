### 1. **What is the difference between `var`, `let`, and `const`?**

- **`var`**:

  - Function-scoped or globally scoped.
  - Can be re-declared and updated.
  - Hoisted to the top of its scope but not initialized (initialized as `undefined`).

- **`let`**:

  - Block-scoped.
  - Cannot be re-declared in the same block, but can be updated.
  - Hoisted but not initialized (temporal dead zone).

- **`const`**:
  - Block-scoped.
  - Cannot be re-declared or updated.
  - Hoisted but not initialized (temporal dead zone).
  - For objects and arrays, their properties/elements can be modified.

Example:

```javascript
var a = 10;
let b = 20;
const c = 30;
```

### 2. **What are arrow functions, and how are they different from regular functions?**

Arrow functions are a more concise syntax for writing functions. The primary differences from regular functions include:

- No `this` binding (they inherit `this` from the surrounding scope).
- No `arguments` object.
- Cannot be used as constructors (no `new` keyword).
- Always anonymous.

Example:

```javascript
const sum = (a, b) => a + b;
console.log(sum(5, 10)); // Output: 15
```

### 3. **What is the difference between `==` and `===` in JavaScript?**

- **`==`** (loose equality): Compares values after performing type coercion if types are different.
- **`===`** (strict equality): Compares both the type and value without type coercion.

Example:

```javascript
console.log(2 == "2"); // true (type coercion)
console.log(2 === "2"); // false (no type coercion)
```

### 4. **What is the purpose of closures in JavaScript?**

A closure is a function that has access to variables in its outer scope even after the outer function has returned. Closures are often used to create private variables or functions.

Example:

```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const increment = outer();
increment(); // Output: 1
increment(); // Output: 2
```

### 5. **Explain `this` keyword in JavaScript.**

The value of `this` refers to the object that is executing the current function. Its value depends on how the function is called:

- In a method: `this` refers to the object.
- In a regular function: `this` refers to the global object (in strict mode, `undefined`).
- In an event handler: `this` refers to the HTML element that received the event.
- In an arrow function: `this` is lexically bound, meaning it inherits `this` from the parent scope.

Example:

```javascript
const obj = {
  name: "John",
  greet: function () {
    console.log(this.name);
  },
};
obj.greet(); // Output: John
```

### 6. **What is event delegation?**

Event delegation is a technique where a single event listener is added to a parent element to handle events from its children. This is more efficient than adding individual listeners to each child element.

Example:

```javascript
document.getElementById("parent").addEventListener("click", function (event) {
  if (event.target && event.target.matches("button.classname")) {
    console.log("Button clicked!");
  }
});
```

### 7. **What is the difference between `null` and `undefined`?**

- **`undefined`**: A variable is declared but not yet assigned a value.
- **`null`**: A variable is explicitly assigned with the value `null`, meaning "no value."

Example:

```javascript
let a;
console.log(a); // Output: undefined

let b = null;
console.log(b); // Output: null
```

### 8. **What is hoisting in JavaScript?**

Hoisting is JavaScript’s default behavior of moving variable and function declarations to the top of their scope before code execution. However, only declarations are hoisted, not initializations.

Example:

```javascript
console.log(a); // Output: undefined
var a = 10;

greet(); // Output: Hello
function greet() {
  console.log("Hello");
}
```

### 9. **What is the difference between call, apply, and bind?**

- **`call()`**: Calls a function with a given `this` value and arguments provided individually.
- **`apply()`**: Similar to `call()`, but arguments are provided as an array.
- **`bind()`**: Returns a new function with a bound `this` value and arguments.

Example:

```javascript
const obj = { name: "John" };
function greet(greeting) {
  console.log(greeting + ", " + this.name);
}

greet.call(obj, "Hello"); // Output: Hello, John
greet.apply(obj, ["Hi"]); // Output: Hi, John

const boundGreet = greet.bind(obj);
boundGreet("Hey"); // Output: Hey, John
```

### 10. **What is the event loop in JavaScript?**

JavaScript is single-threaded but can perform asynchronous tasks using the event loop. The event loop continually checks the call stack and the message queue. If the call stack is empty, it pushes queued callback functions to the call stack for execution.

### 11. **What is a Promise?**

A **Promise** in JavaScript represents the eventual completion or failure of an asynchronous operation. A promise can be in one of three states:

- **Pending**: Initial state, neither fulfilled nor rejected.
- **Fulfilled**: The operation was successful.
- **Rejected**: The operation failed.

Example:

```javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Success!");
  } else {
    reject("Failure!");
  }
});

myPromise
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

### 12. **What is the purpose of `async`/`await` in JavaScript?**

`async` and `await` provide a way to work with promises in a more readable way, allowing asynchronous code to be written in a synchronous manner.

Example:

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
fetchData();
```

Here are the notes for the provided code:

---

#### **Asynchronous JavaScript: setTimeout**

- `setTimeout()` is an asynchronous function that executes a callback after a specified time.
- The code inside `setTimeout()` will run after all synchronous code has been executed.

  Example:

  ```javascript
  setTimeout(() => {
    console.log("This is a 3 sec setTimeout callback");
  }, 3000); // Executes after 3 seconds
  ```

- The order of execution shows how asynchronous functions work:

  ```javascript
  setTimeout(() => {
    console.log("This is a 2 sec setTimeout callback");
  }, 2000);

  console.log("This function executes before setTimeout");
  ```

#### **Callback Hell (Pyramid of Doom)**

- **Callback Hell** occurs when multiple callbacks are nested within each other, making the code hard to read and maintain.

  Example of callback hell:

  ```javascript
  const fun = (num, nextData) => {
    setTimeout(() => {
      console.log(`try callback hell ${num}`);
      if (nextData) {
        nextData();
      }
    }, 2000);
  };

  fun(1, () => {
    fun(2, () => {
      fun(3);
    });
  });
  ```

#### **Promises**

- A **Promise** represents the eventual completion (or failure) of an asynchronous operation.
- Promises can be resolved (`resolve`) or rejected (`reject`).

  Example:

  ```javascript
  const funPromise = (num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`try promise ${num}`);
        if (num < 3) {
          resolve(num + 1);
        } else {
          reject(new Error("Promise rejected"));
        }
      }, 4000);
    });
  };
  ```

- **Promise Chaining** allows handling multiple asynchronous operations in sequence:
  ```javascript
  funPromise(2)
    .then((res) => {
      console.log("Promise Resolved 1", res);
      return funPromise(1);
    })
    .then((res) => {
      console.log("Promise Resolved 2", res);
    })
    .catch((err) => {
      console.log("Promise rejected", err);
    });
  ```

#### **Async/Await**

- **`async`/`await`** provides a cleaner syntax for handling promises. `await` pauses the execution of the function until the promise is resolved.

  Example:

  ```javascript
  const fun = (num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`try async/await ${num}`);
        resolve("success");
      }, 1000);
    });
  };

  (async function call() {
    await fun(1);
    await fun(2);
  })();
  ```

- `async/await` helps in avoiding the complexity of promise chaining and callback hell.

---

- **Callback Hell** can occur when nesting multiple callbacks.
- **Promises** and **Promise Chaining** help avoid callback hell by handling asynchronous operations more effectively.
- **Async/Await** simplifies working with promises by allowing asynchronous code to be written in a synchronous manner.

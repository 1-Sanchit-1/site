### JavaScript :

1. **Variables:**

   - `var`: Function-scoped, can be re-assigned.
   - `let`: Block-scoped, can be re-assigned.
   - `const`: Block-scoped, cannot be re-assigned.

   ```javascript
   let x = 10;
   const y = 20;
   ```

2. **Data Types:**

   - Primitive: `String`, `Number`, `Boolean`, `Null`, `Undefined`, `Symbol`, `BigInt`.
   - Object: `Object`, `Array`, `Function`, etc.

   ```javascript
   let str = "Hello";
   let num = 123;
   let isTrue = true;
   ```

3. **Functions:**

   - Function Declaration:
     ```javascript
     function add(a, b) {
       return a + b;
     }
     ```
   - Function Expression:
     ```javascript
     const add = function (a, b) {
       return a + b;
     };
     ```
   - Arrow Function:
     ```javascript
     const add = (a, b) => a + b;
     ```

4. **Conditionals:**
   - `if`, `else if`, `else`:
     ```javascript
     if (a > b) {
       console.log("a is greater");
     } else {
       console.log("b is greater");
     }
     ```
   - `switch`:
     ```javascript
     switch (day) {
       case 1:
         console.log("Monday");
         break;
       default:
         console.log("Another day");
     }
     ```

### Loops:

1. **For Loop:**
   ```javascript
   for (let i = 0; i < 5; i++) {
     console.log(i);
   }
   ```
2. **While Loop:**

   ```javascript
   let i = 0;
   while (i < 5) {
     console.log(i);
     i++;
   }
   ```

3. **ForEach (Array Iteration):**
   ```javascript
   [1, 2, 3].forEach((num) => console.log(num));
   ```

### Arrays:

- **Array Creation:**
  ```javascript
  let arr = [1, 2, 3];
  ```
- **Array Methods:**
  - `push()`: Add to end.
  - `pop()`: Remove from end.
  - `shift()`: Remove from start.
  - `unshift()`: Add to start.
  - `splice()`: Remove/replace items.
  - `map()`: Returns a new array after applying function to each item.
  - `filter()`: Returns a new array with elements that pass the test.
  - `reduce()`: Reduces array to a single value.
  ```javascript
  arr.push(4); // [1, 2, 3, 4]
  arr.map((x) => x * 2); // [2, 4, 6, 8]
  ```

### Objects:

- **Object Creation:**
  ```javascript
  let person = {
    name: "John",
    age: 30,
    greet: function () {
      console.log("Hello");
    },
  };
  ```
- **Object Access:**
  - Dot Notation: `person.name`
  - Bracket Notation: `person["name"]`

### Functions:

1. **Default Parameters:**
   ```javascript
   function greet(name = "Guest") {
     return "Hello " + name;
   }
   ```
2. **Rest Operator (...):**
   ```javascript
   function sum(...numbers) {
     return numbers.reduce((acc, num) => acc + num);
   }
   ```
3. **Spread Operator (...):**
   ```javascript
   let arr1 = [1, 2, 3];
   let arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
   ```

### DOM Manipulation:

1. **Selecting Elements:**
   - `getElementById()`, `querySelector()`, `getElementsByClassName()`.
     ```javascript
     document.getElementById("myDiv");
     ```
2. **Changing Content:**
   - `innerHTML`, `textContent`, `value`.
     ```javascript
     document.getElementById("myDiv").innerHTML = "Hello";
     ```
3. **Changing Styles:**

   - `style.property`:
     ```javascript
     document.getElementById("myDiv").style.color = "red";
     ```

4. **Event Listeners:**
   ```javascript
   document.getElementById("myBtn").addEventListener("click", function () {
     alert("Button clicked");
   });
   ```

### ES6 Features:

1. **Template Literals:**
   ```javascript
   let name = "John";
   console.log(`Hello ${name}`);
   ```
2. **Destructuring:**

   - Arrays:
     ```javascript
     let [a, b] = [1, 2];
     ```
   - Objects:
     ```javascript
     let { name, age } = person;
     ```

3. **Classes:**

   ```javascript
   class Person {
     constructor(name, age) {
       this.name = name;
       this.age = age;
     }

     greet() {
       console.log(`Hello, my name is ${this.name}`);
     }
   }

   let person1 = new Person("John", 30);
   person1.greet(); // Output: Hello, my name is John
   ```

4. **Promises:**

   ```javascript
   let promise = new Promise((resolve, reject) => {
     // async task
     if (success) resolve("Task completed");
     else reject("Task failed");
   });

   promise
     .then((result) => console.log(result))
     .catch((err) => console.log(err));
   ```

5. **Async/Await:**
   ```javascript
   async function fetchData() {
     let response = await fetch("url");
     let data = await response.json();
     console.log(data);
   }
   ```

### Error Handling:

- **Try/Catch Block:**
  ```javascript
  try {
    // Code that may throw an error
  } catch (error) {
    console.log(error.message);
  }
  ```

### Regular Expressions:

- **RegEx Syntax:**
  ```javascript
  let regex = /abc/;
  let str = "abcdef";
  regex.test(str); // true
  ```

### JSON:

- **JSON Parse:**
  ```javascript
  let obj = JSON.parse('{"name":"John", "age":30}');
  ```
- **JSON Stringify:**
  ```javascript
  let str = JSON.stringify({ name: "John", age: 30 });
  ```

### Modules:

- **Export/Import:**
  - In `module1.js`:
    ```javascript
    export const greeting = "Hello";
    export function sayHello() {
      console.log("Hello");
    }
    ```
  - In `main.js`:
    ```javascript
    import { greeting, sayHello } from "./module1";
    sayHello(); // Output: Hello
    ```

### `this` Keyword:

- Refers to the object that is executing the current function.
  ```javascript
  const person = {
    name: "John",
    greet: function () {
      console.log(this.name);
    },
  };
  ```

### Media Queries (Responsive JS):

- Adjusts JavaScript functionality based on screen size:
  ```javascript
  if (window.matchMedia("(max-width: 600px)").matches) {
    // Code for mobile screens
  }
  ```

### How the Event Loop Works :

- **Single-threaded**: JavaScript can only do one thing at a time, meaning it processes code line by line.

  - When an asynchronous task is triggered (like a network request), JavaScript doesn't wait for it to finish. Instead, it continues executing the rest of the code.
  - The **event loop** constantly checks if asynchronous tasks have completed. If they have, their callback functions are put into a **queue**.
  - Once the main code finishes, the event loop processes the tasks in the queue and runs their callbacks.

## Questions :

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
- **Hoisting:** Variables declared with `var` are hoisted to the top of the scope.
- **Closures:** Functions retain access to their lexical scope, even when the function is executed outside that scope.
- **Callbacks:** Functions passed into another function as an argument to be executed later.
- **Event Loop:** JavaScript uses an event loop to handle asynchronous tasks and promises.

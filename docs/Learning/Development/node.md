### **Node.js Basics**

1. **What is Node.js?**

   - A JavaScript runtime built on Chrome’s V8 engine.
   - Used for server-side scripting and to build fast, scalable network applications.
   - Asynchronous, event-driven, non-blocking I/O.

2. **Node.js Modules:**

   - **Built-in modules** like `fs`, `http`, `path`, etc.
   - **CommonJS module system**: Use `require` to load modules.

   ```js
   const fs = require("fs");
   ```

3. **npm (Node Package Manager):**

   - Manages Node.js packages.
   - Install packages:
     ```bash
     npm install express
     ```

4. **Global Objects:**
   - `__dirname`: Directory path of the current file.
   - `__filename`: Filename of the current file.
   - `console`: For logging.
   - `setTimeout`, `setInterval`: Timers.

---

### **Modules & Exports**

1. **Creating a Module:**

   - Split your code into reusable modules.

   ```js
   // myModule.js
   module.exports = function () {
     console.log("Hello from module");
   };
   ```

2. **Loading a Module:**
   - Use `require` to include the module in other files.
   ```js
   const myModule = require("./myModule");
   myModule();
   ```

---

### **File System (fs) Module**

1. **Reading Files:**

   - **Asynchronous** file read:
     ```js
     const fs = require("fs");
     fs.readFile("file.txt", "utf8", (err, data) => {
       if (err) throw err;
       console.log(data);
     });
     ```

2. **Writing Files:**

   - **Asynchronous** file write:
     ```js
     fs.writeFile("file.txt", "Hello World", (err) => {
       if (err) throw err;
       console.log("File written");
     });
     ```

3. **Sync Methods:**
   - Blocking methods that pause execution until completed.
   ```js
   const data = fs.readFileSync("file.txt", "utf8");
   console.log(data);
   ```

---

### **HTTP Module**

1. **Creating a Server:**

   - Use the `http` module to create a web server.

   ```js
   const http = require("http");
   const server = http.createServer((req, res) => {
     res.statusCode = 200;
     res.setHeader("Content-Type", "text/plain");
     res.end("Hello World");
   });
   server.listen(3000, () => {
     console.log("Server running on port 3000");
   });
   ```

2. **Handling Requests and Responses:**
   - Request methods like `GET`, `POST` can be handled by checking `req.method`.
   - Handle routing using `req.url`.

---

### **Express.js Framework**

1. **What is Express.js?**

   - Fast, unopinionated web framework for Node.js.
   - Simplifies routing, middleware, and handling requests/responses.

2. **Basic Express Server:**

   ```js
   const express = require("express");
   const app = express();

   app.get("/", (req, res) => {
     res.send("Hello World");
   });

   app.listen(3000, () => {
     console.log("Server running on port 3000");
   });
   ```

3. **Routing in Express:**

   - Define routes for different HTTP methods.

   ```js
   app.get("/about", (req, res) => {
     res.send("About Page");
   });
   ```

4. **Middleware:**

   - Functions that execute in the request-response cycle.

   ```js
   app.use((req, res, next) => {
     console.log("Middleware running");
     next();
   });
   ```

5. **Serving Static Files:**
   - Use `express.static` to serve static assets like HTML, CSS, JS.
   ```js
   app.use(express.static("public"));
   ```

---

### **Database Integration**

1. **MongoDB with Mongoose:**

   - MongoDB is a NoSQL database.
   - Mongoose is an ODM (Object Data Modeling) library for MongoDB.

2. **Connecting to MongoDB:**

   ```js
   const mongoose = require("mongoose");
   mongoose.connect("mongodb://localhost/mydb", {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   ```

3. **Creating Schemas and Models:**

   ```js
   const userSchema = new mongoose.Schema({
     name: String,
     age: Number,
   });
   const User = mongoose.model("User", userSchema);
   ```

4. **Performing CRUD Operations:**
   - **Create:**
     ```js
     const newUser = new User({ name: "John", age: 30 });
     newUser.save();
     ```
   - **Read:**
     ```js
     User.find({}, (err, users) => {
       console.log(users);
     });
     ```
   - **Update:**
     ```js
     User.updateOne({ name: "John" }, { age: 31 }, (err) => {
       console.log("Updated");
     });
     ```
   - **Delete:**
     ```js
     User.deleteOne({ name: "John" }, (err) => {
       console.log("Deleted");
     });
     ```

---

### **Asynchronous Programming**

1. **Callbacks:**

   - Functions passed as arguments to be executed later.

   ```js
   fs.readFile("file.txt", "utf8", (err, data) => {
     if (err) throw err;
     console.log(data);
   });
   ```

2. **Promises:**

   - Cleaner alternative to callbacks, using `.then()` and `.catch()`.

   ```js
   const myPromise = new Promise((resolve, reject) => {
     if (success) {
       resolve("Success!");
     } else {
       reject("Error!");
     }
   });

   myPromise
     .then((result) => console.log(result))
     .catch((err) => console.log(err));
   ```

3. **Async/Await:**
   - Syntactic sugar over Promises for writing asynchronous code in a synchronous style.
   ```js
   async function fetchData() {
     try {
       const data = await fs.promises.readFile("file.txt", "utf8");
       console.log(data);
     } catch (err) {
       console.log(err);
     }
   }
   ```

---

### **Error Handling**

1. **Try/Catch Block:**

   - Handle synchronous code errors.

   ```js
   try {
     const data = fs.readFileSync("file.txt", "utf8");
   } catch (err) {
     console.log("Error:", err);
   }
   ```

2. **Error Handling in Async Code:**
   - Catch errors in async code with Promises or `try/catch` in async functions.
   ```js
   myPromise.catch((err) => console.log(err));
   ```

---

### **Streams**

1. **Readable and Writable Streams:**

   - Used to handle large amounts of data efficiently (e.g., file reading/writing).

   ```js
   const readableStream = fs.createReadStream("input.txt");
   const writableStream = fs.createWriteStream("output.txt");

   readableStream.pipe(writableStream); // Copies data from input.txt to output.txt
   ```

---

### **EventEmitter**

1. **Creating Events:**

   - Node.js is event-driven, and the `EventEmitter` module allows defining and triggering custom events.

   ```js
   const EventEmitter = require("events");
   const eventEmitter = new EventEmitter();

   eventEmitter.on("myEvent", () => {
     console.log("Event triggered");
   });

   eventEmitter.emit("myEvent");
   ```

---

### **Environment Variables**

1. **Using Environment Variables:**
   - Load configuration settings (e.g., API keys) from environment variables.
   ```bash
   export PORT=3000
   ```
   - Access in Node.js:
   ```js
   const port = process.env.PORT || 3000;
   ```

---

### **Deployment**

1. **Hosting a Node.js App:**

   - Deploy Node.js apps on platforms like Heroku, AWS, or DigitalOcean.

2. **Process Management with PM2:**
   - PM2 is used to manage and keep your Node.js apps running.
   ```bash
   npm install pm2 -g
   pm2 start app.js
   ```

---

### **Security Practices**

1. **Input Validation:**

   - Always validate user inputs to prevent attacks like SQL Injection.

2. **Use HTTPS:**

   - Ensure secure data transmission using HTTPS in production.

3. **Helmet:**
   - Middleware that adds security headers to protect from common attacks.
   ```bash
   npm install helmet
   ```
   ```js
   const helmet = require("helmet");
   app.use(helmet());
   ```

---

### **Summary **

- **Non-blocking, asynchronous I/O**: Efficient for handling multiple requests.
- **CommonJS Modules**: Modular approach to code with `require` and `module.exports`.
- **File System**: Interact with files using `fs`.
- **Express.js**: Simplifies routing, middleware, and server-side logic.
- **Asynchronous programming**: Callbacks, Promises,`async/await`.
- **Database Integration**: Use MongoDB with Mongoose for CRUD operations.
- **Streams**: Handle large data using streams for efficient I/O.
- **Error Handling**: Use `try/catch` or `.catch()` for async code errors.

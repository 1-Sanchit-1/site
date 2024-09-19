### **MongoDB**

MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like documents. It is schema-less, scalable, and allows easy querying and indexing.

---

### **Key Concepts**

1. **Document-Oriented:**

   - Data is stored in **BSON** (Binary JSON) format.
   - Each record in MongoDB is a **document** (like a row in relational databases).
   - Documents consist of key-value pairs (similar to JSON objects).

2. **Database, Collections, and Documents:**
   - **Database**: A container for collections.
   - **Collection**: A group of MongoDB documents (like a table).
   - **Document**: A record with data in key-value pairs (like a row).

---

### **Core Features**

1. **Schema-Less:**

   - Collections can hold documents of different structures.
   - No predefined schema (flexible data storage).

2. **Horizontal Scaling:**

   - MongoDB supports **sharding** (partitioning data across multiple servers).

3. **Replication:**

   - Provides high availability with **replica sets** (data is replicated across multiple servers).

4. **Indexing:**
   - MongoDB supports indexing to optimize query performance.
   ```js
   db.collection.createIndex({ field: 1 }); // Create index on a field
   ```

---

### **MongoDB CRUD Operations**

1. **Create:**

   - **Insert a document**:
     ```js
     db.collection.insertOne({ name: "Alice", age: 25 });
     db.collection.insertMany([{ name: "Bob" }, { name: "Charlie" }]);
     ```

2. **Read:**

   - **Find documents**:
     ```js
     db.collection.find(); // Retrieve all documents
     db.collection.find({ name: "Alice" }); // Filter documents by a condition
     db.collection.find({}, { name: 1, age: 1 }); // Projection (select fields)
     ```
   - **Find with operators**:
     ```js
     db.collection.find({ age: { $gt: 20 } }); // $gt: greater than
     ```

3. **Update:**

   - **Update a document**:
     ```js
     db.collection.updateOne({ name: "Alice" }, { $set: { age: 26 } });
     db.collection.updateMany(
       { age: { $lt: 30 } },
       { $set: { status: "active" } }
     );
     ```

4. **Delete:**
   - **Delete documents**:
     ```js
     db.collection.deleteOne({ name: "Bob" });
     db.collection.deleteMany({ age: { $lt: 30 } });
     ```

---

### **MongoDB Aggregation**

1. **Aggregation Framework:**

   - Used for performing complex data processing and transformations (e.g., filtering, grouping, sorting).

   ```js
   db.collection.aggregate([
     { $match: { age: { $gt: 20 } } }, // Filter stage
     { $group: { _id: "$status", total: { $sum: 1 } } }, // Group stage
   ]);
   ```

2. **Aggregation Pipeline:**
   - The pipeline allows multiple stages for transforming data.
   - Common stages:
     - `$match`: Filters documents.
     - `$group`: Groups documents by a key.
     - `$project`: Reshapes documents.
     - `$sort`: Sorts documents.
     - `$limit`: Limits the number of documents.

---

### **Indexes in MongoDB**

1. **Creating Indexes:**

   - Improve query performance by indexing frequently queried fields.

   ```js
   db.collection.createIndex({ name: 1 }); // 1 for ascending, -1 for descending
   ```

2. **Compound Index:**

   - Create an index on multiple fields.

   ```js
   db.collection.createIndex({ name: 1, age: -1 });
   ```

3. **Text Indexes:**
   - Used for text search on string fields.
   ```js
   db.collection.createIndex({ description: "text" });
   ```

---

### **Query Operators**

1. **Comparison Operators:**

   - `$eq`: Equal to.
   - `$ne`: Not equal to.
   - `$gt`: Greater than.
   - `$lt`: Less than.
   - `$in`: Matches any value in an array.

   ```js
   db.collection.find({ age: { $gt: 20 } });
   db.collection.find({ name: { $in: ["Alice", "Bob"] } });
   ```

2. **Logical Operators:**

   - `$or`: Matches documents where at least one condition is true.
   - `$and`: Matches documents where all conditions are true.
   - `$not`: Inverts the condition.

   ```js
   db.collection.find({ $or: [{ age: { $lt: 25 } }, { name: "Bob" }] });
   ```

3. **Update Operators:**
   - `$set`: Modifies or adds fields.
   - `$inc`: Increments a field by a given value.
   - `$unset`: Removes a field.
   ```js
   db.collection.updateOne({ name: "Alice" }, { $set: { age: 26 } });
   db.collection.updateOne({ name: "Alice" }, { $inc: { age: 1 } });
   ```

---

### **MongoDB with Node.js**

1. **Connecting to MongoDB:**

   - Use the `mongodb` package to connect to a MongoDB instance from a Node.js app.

   ```bash
   npm install mongodb
   ```

2. **Example of Connecting:**

   ```js
   const { MongoClient } = require("mongodb");
   const uri = "mongodb://localhost:27017";
   const client = new MongoClient(uri);

   async function run() {
     try {
       await client.connect();
       console.log("Connected to MongoDB");
     } finally {
       await client.close();
     }
   }
   run().catch(console.dir);
   ```

3. **Basic CRUD with Node.js:**

   ```js
   const collection = client.db("mydb").collection("users");

   // Insert
   await collection.insertOne({ name: "Alice", age: 25 });

   // Find
   const users = await collection.find({}).toArray();

   // Update
   await collection.updateOne({ name: "Alice" }, { $set: { age: 26 } });

   // Delete
   await collection.deleteOne({ name: "Alice" });
   ```

---

### **Working with Mongoose**

1. **What is Mongoose?**

   - Mongoose is an ODM (Object Data Modeling) library for MongoDB.
   - Provides a structured schema and validation for MongoDB documents.

2. **Connecting with Mongoose:**

   ```js
   const mongoose = require("mongoose");
   mongoose.connect("mongodb://localhost:27017/mydb", {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   ```

3. **Creating a Schema:**

   ```js
   const userSchema = new mongoose.Schema({
     name: String,
     age: Number,
   });

   const User = mongoose.model("User", userSchema);
   ```

4. **CRUD Operations with Mongoose:**

   - **Create**:

     ```js
     const newUser = new User({ name: "Alice", age: 25 });
     newUser.save();
     ```

   - **Read**:

     ```js
     User.find({}, (err, users) => {
       console.log(users);
     });
     ```

   - **Update**:

     ```js
     User.updateOne({ name: "Alice" }, { age: 26 });
     ```

   - **Delete**:
     ```js
     User.deleteOne({ name: "Alice" });
     ```

---

### **Transactions**

1. **ACID Transactions:**

   - MongoDB supports multi-document transactions to ensure atomicity and consistency.

   ```js
   const session = client.startSession();
   session.startTransaction();

   try {
     await collection.insertOne({ name: "Alice" }, { session });
     await collection.updateOne(
       { name: "Bob" },
       { $set: { age: 30 } },
       { session }
     );
     await session.commitTransaction();
   } catch (err) {
     await session.abortTransaction();
   } finally {
     session.endSession();
   }
   ```

---

### **Indexes and Performance Optimization**

1. **Optimizing Queries:**

   - Use indexes to improve query speed.
   - Use `$explain()` to analyze query performance.

2. **Indexes in Mongoose:**
   ```js
   userSchema.index({ name: 1 });
   ```

---

### **Security Practices**

1. **Authentication and Authorization:**

   - Use built-in MongoDB authentication and roles to restrict access.
   - Always authenticate using strong credentials.

2. **Data Encryption:**
   - Encrypt data in transit using SSL/TLS.
   - Enable encryption at rest for sensitive data.

---

### **Backup and Restore**

1. **Backup:**

   - Use `mongodump` to create backups.

   ```bash
   mongodump --db mydb --out /backup/dir
   ```

2. **Restore:**
   - Use `mongorestore` to restore from backups.
   ```bash
   mongorestore /backup/dir
   ```

---

### **Summary**

- **Flexible and Scalable**: Stores data in flexible, JSON-like documents.

- **CRUD Operations**: Insert, find, update, and delete documents easily.

- **Aggregation**: Use pipelines to transform and analyze data.
- **Indexes**: Optimize query performance with indexes.
- **Security**: Ensure proper authentication, encryption, and backup practices.
- **Mongoose**: Simplifies MongoDB operations in Node.js with schema validation.

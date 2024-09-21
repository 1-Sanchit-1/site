### SQL Indexing

In SQL databases (like MySQL, PostgreSQL), indexing works by creating a data structure (usually a B-tree or hash table) to allow for faster retrieval of records. When you search or query a large dataset, an index helps the database find the required rows more quickly, similar to a book's index.

**Example:**

Let's say you have a table `Employees`:

| EmployeeID | Name  | Age | Salary |
| ---------- | ----- | --- | ------ |
| 1          | John  | 30  | 50000  |
| 2          | Alice | 25  | 60000  |
| 3          | Bob   | 35  | 55000  |

Without an index on the `Name` column, the database would need to scan every row to find a record matching a name like "Alice."

You can create an index on `Name`:

```sql
CREATE INDEX idx_name ON Employees(Name);
```

Now, when you query:

```sql
SELECT * FROM Employees WHERE Name = 'Alice';
```

The database will use the index to directly go to the row, avoiding a full table scan, resulting in faster queries.

### NoSQL Indexing

In NoSQL databases (like MongoDB), indexing is also used for faster querying. NoSQL databases are often designed for unstructured or semi-structured data, and their indexing can be more flexible.

**Example:**

Imagine a MongoDB collection `students`:

```json
{
   "_id": ObjectId("123"),
   "name": "John",
   "age": 30,
   "courses": ["Math", "Science"]
}
```

You can create an index on the `name` field:

```js
db.students.createIndex({ name: 1 });
```

Here, `1` means ascending order. When you search for a student by `name`:

```js
db.students.find({ name: "John" });
```

MongoDB will use the index to find the document much faster compared to searching through each document.

### Key Differences

- **SQL**: Relational, uses B-tree indexes.
- **NoSQL**: Document-based, uses indexes specific to document structures like JSON. Some use B-tree, others use different structures based on the database system.

Both types improve performance by avoiding full scans and making data retrieval more efficient.

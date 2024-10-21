### What is DBMS and what is its utility? Explain RDBMS with examples.

- **DBMS (Database Management System)** is software that manages and organizes data efficiently. It allows users to store, retrieve, and manipulate data in databases. Its utility lies in providing a structured way to handle large amounts of data with security and control.

- **RDBMS (Relational Database Management System)** is a type of DBMS that organizes data into tables (relations) with rows and columns. Examples include MySQL, Oracle, and SQL Server. These systems use SQL (Structured Query Language) for managing data and relationships between tables.

### Mention the issues with traditional file-based systems that make DBMS a better choice?

- **Data Redundancy and Inconsistency:** In file systems, duplicate data might exist, leading to inconsistencies.
- **Data Isolation:** Files are stored in different locations, making data sharing and access difficult.
- **Lack of Security:** Traditional file systems have limited control over who can access and modify data.
- **Concurrency Issues:** File-based systems struggle with handling multiple users accessing the same data at the same time.

### Explain a few advantages of a DBMS.

- **Data Integrity:** Ensures accuracy and consistency of data through rules and constraints.
- **Data Security:** Provides controlled access to data, allowing only authorized users to access or modify it.
- **Reduced Redundancy:** Minimizes duplicate data, improving storage efficiency.
- **Backup and Recovery:** DBMS provides mechanisms for data recovery in case of failure.
- **Concurrency Control:** Allows multiple users to access data simultaneously without issues.

### Explain different languages present in DBMS.

- **DDL (Data Definition Language):** Used to define database structure (e.g., CREATE, ALTER, DROP).
- **DML (Data Manipulation Language):** Deals with data retrieval and manipulation (e.g., SELECT, INSERT, UPDATE, DELETE).
- **DCL (Data Control Language):** Manages access to the database (e.g., GRANT, REVOKE).
- **TCL (Transaction Control Language):** Handles transactions within the database (e.g., COMMIT, ROLLBACK).

### What is meant by ACID properties in DBMS?

ACID properties ensure safe and reliable transactions in a DBMS:

- **Atomicity:** All parts of a transaction happen, or none do. No partial transactions.
- **Consistency:** The database stays in a valid state before and after a transaction.
- **Isolation:** Transactions occur independently, without interference.
- **Durability:** Once a transaction is complete, the changes are saved permanently, even if there's a system failure.

### What is meant by normalization and denormalization?

- **Normalization:** Organizing data into multiple related tables to reduce redundancy and improve data integrity.
- **Denormalization:** Combining related tables into a single table to improve read performance, but it can lead to redundancy.

### What is a lock? Explain the major difference between a shared lock and an exclusive lock during a transaction in a database.

- **Lock:** A mechanism that controls access to data during transactions to maintain consistency.
- **Shared Lock:** Multiple transactions can read the data but cannot modify it.
- **Exclusive Lock:** Only one transaction can read and write the data, blocking other transactions from accessing it.

### **delete vs truncate vs drop**

| Feature                 | DELETE                              | TRUNCATE                       | DROP                              |
| ----------------------- | ----------------------------------- | ------------------------------ | --------------------------------- |
| **Operation**           | Removes specific rows               | Removes all rows from a table  | Removes the entire table          |
| **Use of WHERE clause** | Yes (can filter specific rows)      | No (removes all rows)          | No (removes the whole table)      |
| **Rollback (Undo)**     | Yes (supports transaction rollback) | No (cannot rollback)           | No (cannot rollback)              |
| **Performance**         | Slower (removes rows one by one)    | Faster (removes rows directly) | Fastest (removes table structure) |
| **Space Reclamation**   | Does not free up space immediately  | Frees up space immediately     | Frees up space immediately        |
| **DDL/DML**             | DML (Data Manipulation Language)    | DDL (Data Definition Language) | DDL (Data Definition Language)    |

### Explain tiers architecture in a DBMS.

1. **1-Tier Architecture (Single-Tier)**:

   - **Description**: The database and the user interact directly on the same machine.
   - **Example**: Database developer works directly on the DBMS.
   - **Key Points**:
     - No client-server architecture.
     - Not suitable for end-users.
     - Mostly used for development or local database management.

```
Machine (Application + Database)
```

2. **2-Tier Architecture (Client-Server)**:

   - **Description**: The client interacts with the database through an application.
   - **Example**: A desktop application (client) connects to a database server.
   - **Key Points**:
     - Client sends requests to the database server.
     - Server processes and sends data back.
     - Faster than 3-tier but less secure.

```
Application <--> Database
```

3. **3-Tier Architecture**:

   - **Description**: Has three layers – Presentation (UI), Application (Logic), and Database (Data Storage).
   - **Example**: A web application where users interact through a web browser (UI), a server processes logic, and data is stored in a database.
   - **Key Points**:

     - Most common for web applications.
     - Better security and scalability.
     - The client interacts with the application server, which then communicates with the database server.

```
Application <=> Middleware <=> Database
```

## Types of keys

### Why need keys ?

- **For uniquely Identifing the tuples**

**Super Key**: A set of one or more columns that can uniquely identify a record in a table.

**Candidate Key**: A column (or set of columns) that could be a primary key (must be unique and not null)

- If a key is selected as a candidate key, it cannot be combined with other attributes to form a new candidate key

**Primary Key**: A unique identifier for each record in a table (no duplicates, no nulls).

**Alternate Key**: Any candidate key that is not chosen as the primary key.

**Unique Key**: Ensures all values in a column or a set of columns are unique (can have nulls).

**Composite Key**: A key that consists of two or more columns to uniquely identify a record.

**Foreign Key**: A field in a table that links to the primary key of another table.

# Database Normalization Forms

## 1st Normal Form (1NF)

- **Rule**: No multi-valued attributes.
- **In 1st NF**:
  - All attributes should have atomic (indivisible) values.
  - Only single values are allowed in each field (no sets, lists, or multiple values in one field).

## 2nd Normal Form (2NF)

- **Rule**:
  - Achieve 1NF.
  - Remove partial dependencies (non-key attributes should depend on the entire primary key, not just part of it).

## 3rd Normal Form (3NF)

- **Rule**:
  - Achieve 2NF.
  - **No partial dependency**: Non-prime attributes must depend on the whole primary key.
  - **No transitive dependency**: Non-prime attributes should not depend on other non-prime attributes.
  - **In 3rd NF**:
    - LHS (Left Hand Side) must be a Candidate Key (CK) or Super Key (SK).

## Boyce-Codd Normal Form (BCNF)

- **Rule**:
  - Achieve 3NF.
  - **LHS must be a candidate key**: Every determinant (attribute that determines others) must be a candidate key.
  - **In BCNF**: LHS of functional dependencies should be CK or SK.

## What is normalization in databases? Why is it important, and can you give an example of normalization?

Normalization in databases is the process of organizing data in a way that reduces redundancy and dependency. It involves breaking down tables into smaller, related tables and defining relationships between them. The goal is to eliminate data anomalies, ensure data consistency, and make the database more efficient.

### Importance of Normalization:

1. **Eliminate Redundancy**: Avoids storing the same data multiple times, reducing the chances of inconsistency.
2. **Improve Data Integrity**: By splitting data into related tables, it maintains relationships between the data, preventing anomalies.
3. **Efficient Queries**: Optimizes the database for efficient data retrieval and updates.

### Example:

Consider an "Employee" table with columns like `EmployeeID`, `Name`, `PhoneNumber`, and `Address`. If an employee has multiple phone numbers or addresses, you'd have duplicate entries, leading to redundancy.

- **Before Normalization**:  
   | EmployeeID | Name | PhoneNumber | Address |
  |------------|-------|-------------|-----------|
  | 1 | John | 12345 | City A |
  | 1 | John | 67890 | City A |
  | 2 | Jane | 54321 | City B |

- **After Normalization**: Break this table into two:

  - **Employee Table**:  
    | EmployeeID | Name | Address |
    |------------|-------|---------|
    | 1 | John | City A |
    | 2 | Jane | City B |

  - **PhoneNumber Table**:  
    | EmployeeID | PhoneNumber |
    |------------|-------------|
    | 1 | 12345 |
    | 1 | 67890 |
    | 2 | 54321 |

By normalizing, you eliminate redundancy in the employee data and store multiple phone numbers in a separate table.

---

- [**SQL**](sql.md)

---

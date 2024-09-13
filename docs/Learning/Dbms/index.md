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

- **Atomicity:** Ensures that all operations in a transaction either complete or none do.
- **Consistency:** Guarantees that transactions lead to a valid state according to the database's rules.
- **Isolation:** Ensures that transactions do not interfere with each other.
- **Durability:** Once a transaction is committed, its changes are permanent, even after a system failure.

### What is meant by normalization and denormalization?

- **Normalization:** Organizing data into multiple related tables to reduce redundancy and improve data integrity.
- **Denormalization:** Combining related tables into a single table to improve read performance, but it can lead to redundancy.

### What is a lock? Explain the major difference between a shared lock and an exclusive lock during a transaction in a database.

- **Lock:** A mechanism that controls access to data during transactions to maintain consistency.
- **Shared Lock:** Multiple transactions can read the data but cannot modify it.
- **Exclusive Lock:** Only one transaction can read and write the data, blocking other transactions from accessing it.

### Explain the difference between the DELETE and TRUNCATE command in a DBMS.

- **DELETE:** Removes rows from a table based on a condition, and each row deletion is logged, which can be rolled back.
- **TRUNCATE:** Quickly removes all rows from a table without logging each row's deletion, and it cannot be rolled back.

### Explain tiers architecture in a DBMS.

- **1-Tier:** The database is directly accessed by the user on the same system.
- **2-Tier:** The client connects to the database server, typically used in client-server applications.
- **3-Tier:** Includes a client (user interface), an application server (logic), and a database server, enhancing scalability and security.

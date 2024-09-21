#### **1. Introduction to SQL**

- **SQL** (Structured Query Language) is the standard language for relational database management.
- It allows users to query, insert, update, and delete data, as well as manage database objects like tables, views, and indexes.

---

#### **2. SQL Data Types**

- **Numeric Types**:
  - `INT`: Integer.
  - `FLOAT`, `DOUBLE`: Floating-point numbers.
  - `DECIMAL(p, s)`: Precise numbers with a fixed number of digits.
- **String Types**:
  - `CHAR(n)`: Fixed-length string.
  - `VARCHAR(n)`: Variable-length string.
  - `TEXT`: Large strings.
- **Date/Time Types**:
  - `DATE`: Stores dates (YYYY-MM-DD).
  - `TIME`: Stores time (HH:MM:SS).
  - `DATETIME`: Stores both date and time.
  - `TIMESTAMP`: Stores date/time with automatic updating on insert/update.
- **Boolean Types**:
  - `BOOLEAN`: True/false values (often `1` for true, `0` for false).

---

#### **3. SQL Commands Overview**

**DML (Data Manipulation Language)**:

- `SELECT`: Query data from a database.
  - ```sql
    SELECT column1, column2 FROM table_name WHERE condition;
    ```
- `INSERT INTO`: Insert new records.
  - ```sql
    INSERT INTO table_name (column1, column2) VALUES (value1, value2);
    ```
- `UPDATE`: Modify existing records.
  - ```sql
    UPDATE table_name SET column1 = value1 WHERE condition;
    ```
- `DELETE`: Remove records.
  - ```sql
    DELETE FROM table_name WHERE condition;
    ```

**DDL (Data Definition Language)**:

- `CREATE TABLE`: Create a new table.
  - ```sql
    CREATE TABLE table_name (
      column1 datatype PRIMARY KEY,
      column2 datatype
    );
    ```
- `ALTER TABLE`: Modify an existing table.
  - Add column:
    ```sql
    ALTER TABLE table_name ADD column_name datatype;
    ```
  - Modify column:
    ```sql
    ALTER TABLE table_name MODIFY column_name datatype;
    ```
  - Drop column:
    ```sql
    ALTER TABLE table_name DROP COLUMN column_name;
    ```
- `DROP TABLE`: Remove a table.
  - ```sql
    DROP TABLE table_name;
    ```

**DCL (Data Control Language)**:

- `GRANT`: Give user access rights.
  - ```sql
    GRANT SELECT, INSERT ON table_name TO user_name;
    ```
- `REVOKE`: Remove user access rights.
  - ```sql
    REVOKE SELECT, INSERT ON table_name FROM user_name;
    ```

**TCL (Transaction Control Language)**:

- `BEGIN`: Start a transaction.
- `COMMIT`: Save changes.
- `ROLLBACK`: Undo changes.
  - ```sql
    BEGIN;
    UPDATE table_name SET column1 = value1 WHERE condition;
    COMMIT;
    ```

---

#### **4. SQL Constraints**

- **PRIMARY KEY**: Uniquely identifies each row in a table.
  - ```sql
    CREATE TABLE Employees (
      EmployeeID INT PRIMARY KEY,
      Name VARCHAR(100)
    );
    ```
- **FOREIGN KEY**: Links a column to a primary key in another table.
  - ```sql
    CREATE TABLE Orders (
      OrderID INT PRIMARY KEY,
      EmployeeID INT,
      FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
    );
    ```
- **UNIQUE**: Ensures all values in a column are unique.
- **NOT NULL**: Prevents `NULL` values from being entered.
- **CHECK**: Ensures a column satisfies a specific condition.
  - ```sql
    CREATE TABLE Employees (
      Age INT CHECK (Age >= 18)
    );
    ```

---

#### **5. SQL Joins**

- **INNER JOIN**: Returns rows that have matching values in both tables.
  - ```sql
    SELECT * FROM Employees
    INNER JOIN Orders ON Employees.EmployeeID = Orders.EmployeeID;
    ```
- **LEFT JOIN**: Returns all rows from the left table and matched rows from the right.
- **RIGHT JOIN**: Returns all rows from the right table and matched rows from the left.
- **FULL OUTER JOIN**: Returns all rows when there is a match in either table.

---

#### **6. SQL Functions**

**Aggregate Functions**:

- `COUNT()`: Counts the number of rows.
  - ```sql
    SELECT COUNT(*) FROM Employees;
    ```
- `SUM()`: Adds up numeric values.
- `AVG()`: Returns the average value.
- `MIN()` / `MAX()`: Finds the minimum/maximum value.

**String Functions**:

- `UPPER()`, `LOWER()`: Convert text to uppercase/lowercase.
  - ```sql
    SELECT UPPER(Name) FROM Employees;
    ```
- `CONCAT()`: Concatenate multiple strings.
  - ```sql
    SELECT CONCAT(FirstName, ' ', LastName) FROM Employees;
    ```
- `LENGTH()`: Returns the length of a string.

**Date Functions**:

- `NOW()`: Returns the current date and time.
- `DATEDIFF()`: Returns the difference between two dates.

---

#### **7. Subqueries**

- **Definition**: A query nested inside another query.
  - Example: Get employees with salaries above the average.
  - ```sql
    SELECT Name FROM Employees
    WHERE Salary > (SELECT AVG(Salary) FROM Employees);
    ```

---

#### **8. Views**

- **Definition**: A virtual table based on the result of a query.
  - ```sql
    CREATE VIEW employee_salaries AS
    SELECT Name, Salary FROM Employees;
    ```
- Can simplify complex queries and abstract details from users.

---

#### **9. Indexing in SQL**

- **Purpose**: Speeds up query performance by reducing the time it takes to find rows.
- **Syntax**:
  - Create index:
    ```sql
    CREATE INDEX idx_name ON table_name(column_name);
    ```
- **Types**:
  - **B-tree index**: Default in most databases; efficient for range queries.
  - **Hash index**: Fast for exact matches but not for range queries.

---

#### **10. Normalization**

- Process to minimize data redundancy and ensure data integrity.
  - **1NF** (First Normal Form): Eliminate duplicate columns; each column contains atomic values.
  - **2NF** (Second Normal Form): Remove subsets of data that apply to multiple rows.
  - **3NF** (Third Normal Form): Eliminate columns not dependent on the primary key.

---

#### **11. SQL Transactions**

- Ensures **ACID** properties (Atomicity, Consistency, Isolation, Durability).
  - **Atomicity**: All parts of a transaction succeed, or none do.
  - **Consistency**: Transaction leaves the database in a valid state.
  - **Isolation**: Transactions don’t interfere with each other.
  - **Durability**: Once a transaction is committed, it is permanent.

---

#### **12. Common SQL Query Patterns**

**Group By**:

- Groups rows that have the same values into summary rows.
  - ```sql
    SELECT Department, COUNT(*) FROM Employees
    GROUP BY Department;
    ```

**Order By**:

- Sorts the result set in ascending (`ASC`) or descending (`DESC`) order.
  - ```sql
    SELECT * FROM Employees ORDER BY Salary DESC;
    ```

**Limit**:

- Restricts the number of rows returned.
  - ```sql
    SELECT * FROM Employees LIMIT 10;
    ```

---

You're right! I forgot to include **Window Functions** in the SQL notes. Let's add them:

---

### **13. SQL Window Functions**

**Window functions** allow you to perform calculations across a set of table rows related to the current row, without grouping the data like aggregate functions. They are commonly used for running totals, ranking, and moving averages.

**Syntax**:

```sql
function_name() OVER (PARTITION BY column ORDER BY column)
```

#### **Common Window Functions**:

1. **ROW_NUMBER()**: Assigns a unique sequential integer to rows within a partition, starting at 1.

   ```sql
   SELECT Name, Salary, ROW_NUMBER() OVER (ORDER BY Salary DESC) AS row_num
   FROM Employees;
   ```

   - This assigns a row number based on the order of `Salary`.

2. **RANK()**: Assigns a rank to each row within a partition, with gaps in the ranking if there are ties.

   ```sql
   SELECT Name, Salary, RANK() OVER (ORDER BY Salary DESC) AS rank
   FROM Employees;
   ```

   - Employees with the same salary will have the same rank, but the next rank will be skipped (e.g., 1, 2, 2, 4).

3. **DENSE_RANK()**: Similar to `RANK()`, but without gaps in the ranking.

   ```sql
   SELECT Name, Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) AS dense_rank
   FROM Employees;
   ```

   - Employees with the same salary will have the same rank, but the next rank is continuous (e.g., 1, 2, 2, 3).

4. **NTILE(n)**: Divides the result set into `n` equal parts (tiles).

   ```sql
   SELECT Name, Salary, NTILE(4) OVER (ORDER BY Salary DESC) AS quartile
   FROM Employees;
   ```

   - This divides the results into 4 quartiles based on `Salary`.

5. **LAG()**: Provides access to a value from a previous row in the result set.

   ```sql
   SELECT Name, Salary, LAG(Salary, 1) OVER (ORDER BY Salary) AS prev_salary
   FROM Employees;
   ```

   - Returns the salary of the previous row for comparison.

6. **LEAD()**: Provides access to a value from a subsequent row.

   ```sql
   SELECT Name, Salary, LEAD(Salary, 1) OVER (ORDER BY Salary) AS next_salary
   FROM Employees;
   ```

   - Returns the salary of the next row for comparison.

7. **SUM() OVER**: Calculate cumulative totals.

   ```sql
   SELECT Name, Salary, SUM(Salary) OVER (ORDER BY Salary) AS cumulative_salary
   FROM Employees;
   ```

   - It calculates a running total of salaries.

8. **AVG() OVER**: Calculate the moving average.
   ```sql
   SELECT Name, Salary, AVG(Salary) OVER (ORDER BY Salary ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) AS moving_avg
   FROM Employees;
   ```
   - Computes the average over a sliding window (previous, current, and next row).

---

#### **Window Function Clauses**:

- **PARTITION BY**: Divides the result set into partitions (subsets) where the window function is applied independently.

  - Example: Rank employees by department.
    ```sql
    SELECT Name, Department, Salary, RANK() OVER (PARTITION BY Department ORDER BY Salary DESC) AS department_rank
    FROM Employees;
    ```

- **ORDER BY**: Specifies the order of rows within each partition.
- **ROWS BETWEEN**: Defines a frame within the partition for running aggregates (e.g., a moving window).
  - `ROWS BETWEEN 1 PRECEDING AND CURRENT ROW`: Defines a window including the current row and the previous one.

---

**Key Use Cases of Window Functions**:

1. Ranking rows in various ways (e.g., `RANK`, `ROW_NUMBER`).
2. Calculating running totals (`SUM() OVER`).
3. Analyzing trends with moving averages (`AVG() OVER`).
4. Accessing previous or next rows for comparison (`LAG`, `LEAD`).

---

### **14. SQL Common Table Expressions (CTE)**

**CTE (Common Table Expressions)** provide a way to create temporary result sets that can be referenced within a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement. They improve the readability of complex queries and can be recursive.

---

#### **Syntax**:

```sql
WITH cte_name AS (
    SELECT column1, column2
    FROM table_name
    WHERE condition
)
SELECT * FROM cte_name;
```

- The **`WITH`** keyword introduces the CTE.
- **`cte_name`**: Name given to the temporary result set.
- The CTE is used immediately after it's defined in the main query.

---

#### **Example:**

1. **Basic CTE**:
   Suppose you have an `Employees` table, and you want to select all employees with a salary greater than the average salary:

   ```sql
   WITH AvgSalary AS (
       SELECT AVG(Salary) AS avg_salary FROM Employees
   )
   SELECT Name, Salary FROM Employees
   WHERE Salary > (SELECT avg_salary FROM AvgSalary);
   ```

2. **Multiple CTEs**:
   You can define multiple CTEs by separating them with commas.
   ```sql
   WITH HighEarners AS (
       SELECT Name, Salary FROM Employees WHERE Salary > 60000
   ),
   LowEarners AS (
       SELECT Name, Salary FROM Employees WHERE Salary <= 60000
   )
   SELECT * FROM HighEarners
   UNION
   SELECT * FROM LowEarners;
   ```

---

### **10 important SQL queries** often asked in interviews:

---

### **1. Retrieve the second highest salary of an employee.**

**Query**:

```sql
SELECT MAX(Salary) AS SecondHighestSalary
FROM Employees
WHERE Salary < (SELECT MAX(Salary) FROM Employees);
```

**Explanation**: This query finds the highest salary less than the maximum salary, effectively giving the second highest.

```sql
SELECT Salary
FROM Employees
ORDER BY Salary DESC
LIMIT 1 OFFSET 1;
```

---

### **2. Find the employee with the highest salary in each department.**

**Query**:

```sql
SELECT Department, Name, Salary
FROM Employees e
WHERE Salary = (SELECT MAX(Salary) FROM Employees WHERE Department = e.Department);
```

**Explanation**: It compares each employee’s salary in their department with the maximum salary for that department.

---

### **3. Retrieve all employees who have the same salary.**

**Query**:

```sql
SELECT Name, Salary
FROM Employees
GROUP BY Salary
HAVING COUNT(*) > 1;
```

**Explanation**: This query groups employees by salary and uses `HAVING COUNT(*) > 1` to filter out only those with the same salary.

---

### **4. Write a query to find all employees whose name starts with 'A'.**

**Query**:

```sql
SELECT * FROM Employees
WHERE Name LIKE 'A%';
```

**Explanation**: The `LIKE` operator with `'A%'` matches all names starting with 'A'.

---

### **5. Display departments along with the total number of employees in each.**

**Query**:

```sql
SELECT Department, COUNT(*) AS TotalEmployees
FROM Employees
GROUP BY Department;
```

**Explanation**: This counts the number of employees in each department using `GROUP BY`.

---

### **6. Retrieve the top 3 highest-paid employees.**

**Query**:

```sql
SELECT Name, Salary
FROM Employees
ORDER BY Salary DESC
LIMIT 3;
```

**Explanation**: This query sorts employees by salary in descending order and limits the result to the top 3 rows.

---

### **7. Find employees who have not received any orders (LEFT JOIN example).**

**Query**:

```sql
SELECT e.Name
FROM Employees e
LEFT JOIN Orders o ON e.EmployeeID = o.EmployeeID
WHERE o.OrderID IS NULL;
```

**Explanation**: The `LEFT JOIN` returns all employees and those without any orders will have `NULL` values in the `Orders` table.

---

### **8. Retrieve the details of employees who have worked for more than 5 years.**

**Query**:

```sql
SELECT Name, HireDate
FROM Employees
WHERE DATEDIFF(NOW(), HireDate) > (5 * 365);
```

**Explanation**: The `DATEDIFF` function calculates the difference in days between the current date and the employee’s hire date. This query filters those who have been employed for over 5 years.

---

### **9. Delete duplicate rows from a table.**

**Query**:

```sql
DELETE e1
FROM Employees e1
JOIN Employees e2
ON e1.Name = e2.Name AND e1.EmployeeID > e2.EmployeeID;
```

**Explanation**: This deletes duplicate rows by joining the table to itself, ensuring that only one entry remains by comparing the employee IDs.

---

### **10. Find the nth highest salary (e.g., 3rd highest).**

**Query**:

```sql
SELECT Salary
FROM Employees e1
WHERE 3 - 1 = (
    SELECT COUNT(DISTINCT Salary)
    FROM Employees e2
    WHERE e2.Salary > e1.Salary
);
```

**Explanation**: This query finds the nth highest salary by counting distinct salaries greater than the current salary and subtracting 1 from `n`.

### **Query**:

```sql
SELECT Salary
FROM Employees
ORDER BY Salary DESC
LIMIT 1 OFFSET n-1;
```

### **Explanation**:

- **`ORDER BY Salary DESC`**: Orders the salaries in descending order (highest salary first).
- **`LIMIT 1`**: Limits the result to 1 row.
- **`OFFSET n-1`**: Skips the first `n-1` rows, so the nth salary is retrieved.

---

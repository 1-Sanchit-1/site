import{_ as a,c as e,o as t,a4 as n}from"./chunks/framework.B7YSrJ1r.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Learning/Dbms/index.md","filePath":"Learning/Dbms/index.md","lastUpdated":1726196479000}'),i={name:"Learning/Dbms/index.md"},s=n('<h3 id="what-is-dbms-and-what-is-its-utility-explain-rdbms-with-examples" tabindex="-1">What is DBMS and what is its utility? Explain RDBMS with examples. <a class="header-anchor" href="#what-is-dbms-and-what-is-its-utility-explain-rdbms-with-examples" aria-label="Permalink to &quot;What is DBMS and what is its utility? Explain RDBMS with examples.&quot;">​</a></h3><ul><li><p><strong>DBMS (Database Management System)</strong> is software that manages and organizes data efficiently. It allows users to store, retrieve, and manipulate data in databases. Its utility lies in providing a structured way to handle large amounts of data with security and control.</p></li><li><p><strong>RDBMS (Relational Database Management System)</strong> is a type of DBMS that organizes data into tables (relations) with rows and columns. Examples include MySQL, Oracle, and SQL Server. These systems use SQL (Structured Query Language) for managing data and relationships between tables.</p></li></ul><h3 id="mention-the-issues-with-traditional-file-based-systems-that-make-dbms-a-better-choice" tabindex="-1">Mention the issues with traditional file-based systems that make DBMS a better choice? <a class="header-anchor" href="#mention-the-issues-with-traditional-file-based-systems-that-make-dbms-a-better-choice" aria-label="Permalink to &quot;Mention the issues with traditional file-based systems that make DBMS a better choice?&quot;">​</a></h3><ul><li><strong>Data Redundancy and Inconsistency:</strong> In file systems, duplicate data might exist, leading to inconsistencies.</li><li><strong>Data Isolation:</strong> Files are stored in different locations, making data sharing and access difficult.</li><li><strong>Lack of Security:</strong> Traditional file systems have limited control over who can access and modify data.</li><li><strong>Concurrency Issues:</strong> File-based systems struggle with handling multiple users accessing the same data at the same time.</li></ul><h3 id="explain-a-few-advantages-of-a-dbms" tabindex="-1">Explain a few advantages of a DBMS. <a class="header-anchor" href="#explain-a-few-advantages-of-a-dbms" aria-label="Permalink to &quot;Explain a few advantages of a DBMS.&quot;">​</a></h3><ul><li><strong>Data Integrity:</strong> Ensures accuracy and consistency of data through rules and constraints.</li><li><strong>Data Security:</strong> Provides controlled access to data, allowing only authorized users to access or modify it.</li><li><strong>Reduced Redundancy:</strong> Minimizes duplicate data, improving storage efficiency.</li><li><strong>Backup and Recovery:</strong> DBMS provides mechanisms for data recovery in case of failure.</li><li><strong>Concurrency Control:</strong> Allows multiple users to access data simultaneously without issues.</li></ul><h3 id="explain-different-languages-present-in-dbms" tabindex="-1">Explain different languages present in DBMS. <a class="header-anchor" href="#explain-different-languages-present-in-dbms" aria-label="Permalink to &quot;Explain different languages present in DBMS.&quot;">​</a></h3><ul><li><strong>DDL (Data Definition Language):</strong> Used to define database structure (e.g., CREATE, ALTER, DROP).</li><li><strong>DML (Data Manipulation Language):</strong> Deals with data retrieval and manipulation (e.g., SELECT, INSERT, UPDATE, DELETE).</li><li><strong>DCL (Data Control Language):</strong> Manages access to the database (e.g., GRANT, REVOKE).</li><li><strong>TCL (Transaction Control Language):</strong> Handles transactions within the database (e.g., COMMIT, ROLLBACK).</li></ul><h3 id="what-is-meant-by-acid-properties-in-dbms" tabindex="-1">What is meant by ACID properties in DBMS? <a class="header-anchor" href="#what-is-meant-by-acid-properties-in-dbms" aria-label="Permalink to &quot;What is meant by ACID properties in DBMS?&quot;">​</a></h3><p>ACID properties ensure safe and reliable transactions in a DBMS:</p><ul><li><strong>Atomicity:</strong> Ensures that all operations in a transaction either complete or none do.</li><li><strong>Consistency:</strong> Guarantees that transactions lead to a valid state according to the database&#39;s rules.</li><li><strong>Isolation:</strong> Ensures that transactions do not interfere with each other.</li><li><strong>Durability:</strong> Once a transaction is committed, its changes are permanent, even after a system failure.</li></ul><h3 id="what-is-meant-by-normalization-and-denormalization" tabindex="-1">What is meant by normalization and denormalization? <a class="header-anchor" href="#what-is-meant-by-normalization-and-denormalization" aria-label="Permalink to &quot;What is meant by normalization and denormalization?&quot;">​</a></h3><ul><li><strong>Normalization:</strong> Organizing data into multiple related tables to reduce redundancy and improve data integrity.</li><li><strong>Denormalization:</strong> Combining related tables into a single table to improve read performance, but it can lead to redundancy.</li></ul><h3 id="what-is-a-lock-explain-the-major-difference-between-a-shared-lock-and-an-exclusive-lock-during-a-transaction-in-a-database" tabindex="-1">What is a lock? Explain the major difference between a shared lock and an exclusive lock during a transaction in a database. <a class="header-anchor" href="#what-is-a-lock-explain-the-major-difference-between-a-shared-lock-and-an-exclusive-lock-during-a-transaction-in-a-database" aria-label="Permalink to &quot;What is a lock? Explain the major difference between a shared lock and an exclusive lock during a transaction in a database.&quot;">​</a></h3><ul><li><strong>Lock:</strong> A mechanism that controls access to data during transactions to maintain consistency.</li><li><strong>Shared Lock:</strong> Multiple transactions can read the data but cannot modify it.</li><li><strong>Exclusive Lock:</strong> Only one transaction can read and write the data, blocking other transactions from accessing it.</li></ul><h3 id="explain-the-difference-between-the-delete-and-truncate-command-in-a-dbms" tabindex="-1">Explain the difference between the DELETE and TRUNCATE command in a DBMS. <a class="header-anchor" href="#explain-the-difference-between-the-delete-and-truncate-command-in-a-dbms" aria-label="Permalink to &quot;Explain the difference between the DELETE and TRUNCATE command in a DBMS.&quot;">​</a></h3><ul><li><strong>DELETE:</strong> Removes rows from a table based on a condition, and each row deletion is logged, which can be rolled back.</li><li><strong>TRUNCATE:</strong> Quickly removes all rows from a table without logging each row&#39;s deletion, and it cannot be rolled back.</li></ul><h3 id="explain-tiers-architecture-in-a-dbms" tabindex="-1">Explain tiers architecture in a DBMS. <a class="header-anchor" href="#explain-tiers-architecture-in-a-dbms" aria-label="Permalink to &quot;Explain tiers architecture in a DBMS.&quot;">​</a></h3><ul><li><strong>1-Tier:</strong> The database is directly accessed by the user on the same system.</li><li><strong>2-Tier:</strong> The client connects to the database server, typically used in client-server applications.</li><li><strong>3-Tier:</strong> Includes a client (user interface), an application server (logic), and a database server, enhancing scalability and security.</li></ul>',19),r=[s];function o(l,d,c,h,u,m){return t(),e("div",null,r)}const p=a(i,[["render",o]]);export{b as __pageData,p as default};

# 💻 Operating Systems Concepts

### 1️⃣ What is an Operating System?

An **Operating System (OS)** acts as an intermediary between the **user** and the **computer hardware**, managing resources and facilitating user interactions.

---

### 2️⃣ Types of Operating Systems:

- **Batched OS**
- **Real-Time OS**
- **Time-Sharing OS**
- **Distributed OS**
- **Multiprogrammed OS**

---

### 3️⃣ Basic Functions of an OS:

- **Resource Allocation**
- **Program Control to Prevent Errors**

---

### 4️⃣ What is the Kernel?

The **kernel** is the **core** of an OS, providing essential services to all parts of the operating system.

---

### 5️⃣ What is a Process?

A **process** is the execution of a program, categorized into:

- **OS Process**
- **User Process**

---

### 6️⃣ States of a Process:

Processes transition through the following states:

- **New → Ready → Running → Waiting → Terminated**
- **Create → Admitted → Interrupt/Dispatch → I/O → Exit**

---

### 7️⃣ What is Starvation and Aging?

- **Starvation:** A resource management issue where a process waits indefinitely for resources.
- **Aging:** A technique to avoid starvation by gradually increasing the priority of waiting processes.

---

### 8️⃣ What is a Semaphore?

A **semaphore** is a variable used for controlling access to common resources.  
**Types:**

- **Binary Semaphore**
- **Counting Semaphore**

---

### 9️⃣ What is Context Switching?

**Context switching** transfers control from one process to another, involving saving and loading the process states.

---

### 🔟 What is a Thread?

A **thread** is a lightweight process, a basic unit of CPU utilization comprising:

- Thread ID
- Program Counter
- Register Set
- Stack

---

### 1️⃣1️⃣ What is Process Synchronization?

**Process synchronization** ensures only one process manipulates shared data at a time, avoiding **race conditions**.

---

### 1️⃣2️⃣ What is Cache Memory?

**Cache memory** is a fast-access memory where the microprocessor first looks for data before accessing RAM.  
Memory hierarchy:

- **Registers → L1 Cache → L2 Cache → RAM → Secondary Memory**

---

### 1️⃣3️⃣ What is Virtual Memory?

**Virtual memory** allows secondary storage to function as main memory.  
Benefits:

- No need for physical address management
- Each process has a virtual-to-physical address mapping

---

### 1️⃣4️⃣ Logical vs Physical Address Space:

- **Logical Address:** Size of the process (virtual space)
- **Physical Address:** Size of the main memory

---

### 1️⃣5️⃣ Compiler vs Interpreter:

- **Compiler:** Translates code into machine code **before** execution.
- **Interpreter:** Translates code **line-by-line** during execution.

---

### 1️⃣6️⃣ Definitions:

- **Throughput:** Number of processes completed per time unit.
- **Turnaround Time:** Time taken to execute a process.
- **Waiting Time:** Time spent in the ready queue.
- **Response Time:** Time between a request and the start of the response.

---

### 1️⃣7️⃣ What is a Real-Time System?

A **real-time system** processes data as it comes with strict time constraints, ensuring prompt responses to events.

---

### 1️⃣8️⃣ Long-Term vs Short-Term Schedulers:

- **Long-Term Scheduler (LTS):** Loads processes into memory from the job queue.
- **Short-Term Scheduler (STS):** Allocates CPU to processes from the ready queue.

---

### 1️⃣9️⃣ What is a Distributed System?

A **distributed system** operates in a network, sharing resources and communication between multiple systems.

---

### 2️⃣0️⃣ What is a Daemon?

A **daemon** is a background program that runs without user input, typically in Unix or Linux systems, managing resources and automating tasks.

---

### 2️⃣1️⃣ What is Busy Waiting?

**Busy waiting** occurs when a process repeatedly checks for a condition to be met before continuing execution.

---

### 2️⃣2️⃣ Dual-Mode Operation:

- **User Mode**
- **Kernel Mode**

---

### 2️⃣3️⃣ Path Types:

- **Absolute Path:** The exact path from the root directory.
- **Relative Path:** A path relative to the current location.

---

### 2️⃣4️⃣ What is DRAM?

**Dynamic RAM (DRAM)** stores data as electrical capacitance, while **Static RAM (SRAM)** stores data as voltage levels.

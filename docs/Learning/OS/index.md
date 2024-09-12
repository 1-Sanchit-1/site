# 💻 Operating Systems Concepts

### What is an Operating System?

An **Operating System (OS)** acts as an intermediary between the **user** and the **computer hardware**, managing resources and facilitating user interactions.

---

### Types of Operating Systems:

- **Batched OS**
- **Real-Time OS**
- **Time-Sharing OS**
- **Distributed OS**
- **Multiprogrammed OS**

---

### Basic Functions of an OS:

- **Resource Allocation**
- **Program Control to Prevent Errors**

---

### What is the Kernel?

The **kernel** is the **core** of an OS, providing essential services to all parts of the operating system.

---

### What is a Process?

A **process** is the execution of a program, categorized into:

- **OS Process**
- **User Process**

---

### States of a Process:

Processes transition through the following states:

- **New → Ready → Running → Waiting → Terminated**
- **Create → Admitted → Interrupt/Dispatch → I/O → Exit**

---

### What is Starvation and Aging?

- **Starvation:** A resource management issue where a process waits indefinitely for resources.
- **Aging:** A technique to avoid starvation by gradually increasing the priority of waiting processes.

---

### What happens during a dead lock?

In a deadlock, processes get stuck waiting for each other’s resources and can’t move forward. This causes everything to come to a halt.

---

### What is a Semaphore?

A **semaphore** is a variable used for controlling access to common resources.  
**Types:**

- **Binary Semaphore**
- **Counting Semaphore**

---

### What is Context Switching?

**Context switching** transfers control from one process to another, involving saving and loading the process states.

---

### What is a Thread?

A **thread** is a lightweight process, a basic unit of CPU utilization comprising:

- Thread ID
- Program Counter
- Register Set
- Stack

---

### What is Process Synchronization?

**Process synchronization** ensures only one process manipulates shared data at a time, avoiding **race conditions**.

---

### What is Cache Memory?

**Cache memory** is a fast-access memory where the microprocessor first looks for data before accessing RAM.  
Memory hierarchy:

- **Registers → L1 Cache → L2 Cache → RAM → Secondary Memory**

---

### What is Virtual Memory?

**Virtual memory** allows secondary storage to function as main memory.  
Benefits:

- No need for physical address management
- Each process has a virtual-to-physical address mapping

---

### Logical vs Physical Address Space:

- **Logical Address:** Size of the process (virtual space)
- **Physical Address:** Size of the main memory

---

### Compiler vs Interpreter:

- **Compiler:** Translates code into machine code **before** execution.
- **Interpreter:** Translates code **line-by-line** during execution.

---

### Definitions:

- **Throughput:** Number of processes completed per time unit.
- **Turnaround Time:** Time taken to execute a process.
- **Waiting Time:** Time spent in the ready queue.
- **Response Time:** Time between a request and the start of the response.

---

### What is a Real-Time System?

A **real-time system** processes data as it comes with strict time constraints, ensuring prompt responses to events.

---

### Long-Term vs Short-Term Schedulers:

- **Long-Term Scheduler (LTS):** Loads processes into memory from the job queue.
- **Short-Term Scheduler (STS):** Allocates CPU to processes from the ready queue.

---

### What is a Distributed System?

A **distributed system** operates in a network, sharing resources and communication between multiple systems.

---

### What is a Daemon?

A **daemon** is a background program that runs without user input, typically in Unix or Linux systems, managing resources and automating tasks.

---

### What is Busy Waiting?

**Busy waiting** occurs when a process repeatedly checks for a condition to be met before continuing execution.

---

### Dual-Mode Operation:

- **User Mode**
- **Kernel Mode**

---

### Path Types:

- **Absolute Path:** The exact path from the root directory.
- **Relative Path:** A path relative to the current location.

---

### What is DRAM?

**Dynamic RAM (DRAM)** stores data as electrical capacitance, while **Static RAM (SRAM)** stores data as voltage levels.

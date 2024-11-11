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

## A medium-term scheduler is a component of an operating system that temporarily moves processes between main memory and secondary memory

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

### Here are some of the most important Operating System (OS) questions frequently asked in Software Development Engineer (SDE) interviews:

---

### 1. **What is a Process and a Thread?**

- **Process**: A process is an instance of a program that is being executed. It has its own memory space and resources.
- **Thread**: A thread is a smaller unit of a process that can be scheduled and executed. Threads within the same process share memory and resources.

---

### 2. **Difference Between Process and Thread?**

- **Process**:
  - Owns memory space and resources.
  - Heavier context-switching.
  - Isolated from other processes.
- **Thread**:
  - Shares memory/resources of its parent process.
  - Lighter context-switching.
  - Can communicate easily within the process.

---

### 3. **What is Deadlock?**

- **Deadlock** occurs when a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process. Conditions for deadlock:
  1.  Mutual Exclusion: only one process can use the resource at any time.
  2.  Hold and Wait:: A process holding at least one resource is waiting to acquire additional resources that are currently being held by other processes
  3.  No Preemption:Once a process is holding a resource then that resource cannot be taken away from that process until the process voluntarily releases
  4.  Circular Wait:A set of processes are in a circular chain where each process is waiting for a resource that the next process in the chain holds

---

### 4. **What are Mutex and Semaphore?**

- **Mutex**: A lock that allows only one thread/process to access a resource at a time. Only the thread that locked it can unlock it.
- **Semaphore**: A signaling mechanism that allows multiple threads/processes to access resources concurrently, with a counter tracking resource availability. It can be used for both synchronization and signaling.

---

### 5. **What is a Critical Section?**

- A **critical section** is a part of a program where shared resources (like variables, memory) are accessed. Mutual exclusion mechanisms (like locks) ensure only one process/thread enters this section at a time.

---

### 6. **Explain Context Switching.**

- **Context Switching** is the process of saving the state of a running process/thread and restoring the state of another. This allows the CPU to switch between different tasks (processes or threads).

---

### 7. **What is Paging?**

- **Paging** is a memory management scheme that eliminates the need for contiguous memory allocation. The process's memory is divided into fixed-size pages, and the physical memory is divided into frames. The OS uses page tables to map virtual addresses to physical addresses.

---

### 8. **Difference Between Paging and Segmentation?**

- **Paging**:
  - Divides memory into fixed-size pages.
  - Solves fragmentation issues.
- **Segmentation**:
  - Divides memory into variable-size segments.
  - Logical division (code, data, stack segments).

---

### 9. **What is Virtual Memory?**

- **Virtual Memory** is a technique that provides an illusion of more memory than physically available by using disk space. It allows processes to execute even if they don’t fit into physical RAM.

---

### 10. **What is Thrashing?**

- **Thrashing** occurs when a system spends most of its time swapping pages in and out of memory (paging) rather than executing instructions. This typically happens when the system has insufficient memory.

---

### 11. **What is a System Call?**

- A **system call** is a way for programs to interact with the operating system. It provides services like process management, I/O, file operations, and more. Examples: `fork()`, `exec()`, `open()`, `read()`.

---

### 12. **What is Inter-Process Communication (IPC)?**

- **IPC** mechanisms allow processes to communicate and synchronize with each other. Common methods include:
  - **Shared Memory**.
  - **Message Passing** (pipes, message queues).
  - **Semaphores**.

---

### 13. **What is a Race Condition?**

- A **race condition** occurs when the behavior of a program depends on the sequence or timing of uncontrollable events like thread scheduling. It can lead to inconsistent or incorrect outcomes if not managed properly using synchronization mechanisms.

---

### 14. **Explain Different CPU Scheduling Algorithms.**

- **First-Come-First-Serve (FCFS)**: Jobs are scheduled in the order they arrive.
- **Shortest Job First (SJF)**: The job with the shortest execution time is scheduled first.
- **Round Robin (RR)**: Each job is given a fixed time slice and is scheduled in a circular order.
- **Priority Scheduling**: Jobs are scheduled based on priority, with higher-priority tasks scheduled first.

---

### 15. **What is the Difference Between Preemptive and Non-Preemptive Scheduling?**

- **Preemptive Scheduling**: The OS can interrupt and switch processes based on priority or time slice.
- **Non-Preemptive Scheduling**: Once a process starts, it runs until completion, blocking all other processes.

---

### 16. **What are the Different Types of Kernels?**

- **Monolithic Kernel**: All OS services run in kernel space. Example: Linux.
- **Microkernel**: Minimal kernel; most services run in user space. Example: Minix, QNX.

---

### 17. **What is a Page Fault?**

- A **page fault** occurs when a process tries to access a page that is not currently in physical memory. The OS fetches the page from disk (virtual memory) into RAM.

---

### 18. **What is Demand Paging?**

- **Demand Paging** is a technique where pages are loaded into memory only when they are needed, rather than loading the entire process into memory at once.

---

### 19. **What is a Daemon?**

- A **daemon** is a background process that runs continuously to handle specific system tasks like logging, file transfers, or network connections. Example: `cron`, `httpd`.

---

### 20. **Explain Banker's Algorithm.**

- The **Banker’s Algorithm** is used to avoid deadlock by ensuring that a system never enters an unsafe state. It evaluates resource allocation requests and grants them only if the system remains in a safe state.

---

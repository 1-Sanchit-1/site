import{_ as e,c as a,o as t,a4 as s}from"./chunks/framework.B7YSrJ1r.js";const p=JSON.parse('{"title":"💻 Operating Systems Concepts","description":"","frontmatter":{},"headers":[],"relativePath":"Learning/OS/index.md","filePath":"Learning/OS/index.md","lastUpdated":1731334235000}'),r={name:"Learning/OS/index.md"},i=s('<h1 id="💻-operating-systems-concepts" tabindex="-1">💻 Operating Systems Concepts <a class="header-anchor" href="#💻-operating-systems-concepts" aria-label="Permalink to &quot;💻 Operating Systems Concepts&quot;">​</a></h1><h3 id="what-is-an-operating-system" tabindex="-1">What is an Operating System? <a class="header-anchor" href="#what-is-an-operating-system" aria-label="Permalink to &quot;What is an Operating System?&quot;">​</a></h3><p>An <strong>Operating System (OS)</strong> acts as an intermediary between the <strong>user</strong> and the <strong>computer hardware</strong>, managing resources and facilitating user interactions.</p><hr><h3 id="types-of-operating-systems" tabindex="-1">Types of Operating Systems: <a class="header-anchor" href="#types-of-operating-systems" aria-label="Permalink to &quot;Types of Operating Systems:&quot;">​</a></h3><ul><li><strong>Batched OS</strong></li><li><strong>Real-Time OS</strong></li><li><strong>Time-Sharing OS</strong></li><li><strong>Distributed OS</strong></li><li><strong>Multiprogrammed OS</strong></li></ul><hr><h3 id="basic-functions-of-an-os" tabindex="-1">Basic Functions of an OS: <a class="header-anchor" href="#basic-functions-of-an-os" aria-label="Permalink to &quot;Basic Functions of an OS:&quot;">​</a></h3><ul><li><strong>Resource Allocation</strong></li><li><strong>Program Control to Prevent Errors</strong></li></ul><hr><h3 id="what-is-the-kernel" tabindex="-1">What is the Kernel? <a class="header-anchor" href="#what-is-the-kernel" aria-label="Permalink to &quot;What is the Kernel?&quot;">​</a></h3><p>The <strong>kernel</strong> is the <strong>core</strong> of an OS, providing essential services to all parts of the operating system.</p><hr><h3 id="what-is-a-process" tabindex="-1">What is a Process? <a class="header-anchor" href="#what-is-a-process" aria-label="Permalink to &quot;What is a Process?&quot;">​</a></h3><p>A <strong>process</strong> is the execution of a program, categorized into:</p><ul><li><strong>OS Process</strong></li><li><strong>User Process</strong></li></ul><hr><h3 id="states-of-a-process" tabindex="-1">States of a Process: <a class="header-anchor" href="#states-of-a-process" aria-label="Permalink to &quot;States of a Process:&quot;">​</a></h3><p>Processes transition through the following states:</p><ul><li><strong>New → Ready → Running → Waiting → Terminated</strong></li><li><strong>Create → Admitted → Interrupt/Dispatch → I/O → Exit</strong></li></ul><hr><h3 id="what-is-starvation-and-aging" tabindex="-1">What is Starvation and Aging? <a class="header-anchor" href="#what-is-starvation-and-aging" aria-label="Permalink to &quot;What is Starvation and Aging?&quot;">​</a></h3><ul><li><strong>Starvation:</strong> A resource management issue where a process waits indefinitely for resources.</li><li><strong>Aging:</strong> A technique to avoid starvation by gradually increasing the priority of waiting processes.</li></ul><hr><h3 id="what-happens-during-a-dead-lock" tabindex="-1">What happens during a dead lock? <a class="header-anchor" href="#what-happens-during-a-dead-lock" aria-label="Permalink to &quot;What happens during a dead lock?&quot;">​</a></h3><p>In a deadlock, processes get stuck waiting for each other’s resources and can’t move forward. This causes everything to come to a halt.</p><hr><h3 id="what-is-a-semaphore" tabindex="-1">What is a Semaphore? <a class="header-anchor" href="#what-is-a-semaphore" aria-label="Permalink to &quot;What is a Semaphore?&quot;">​</a></h3><p>A <strong>semaphore</strong> is a variable used for controlling access to common resources.<br><strong>Types:</strong></p><ul><li><strong>Binary Semaphore</strong></li><li><strong>Counting Semaphore</strong></li></ul><hr><h3 id="what-is-context-switching" tabindex="-1">What is Context Switching? <a class="header-anchor" href="#what-is-context-switching" aria-label="Permalink to &quot;What is Context Switching?&quot;">​</a></h3><p><strong>Context switching</strong> transfers control from one process to another, involving saving and loading the process states.</p><hr><h3 id="what-is-a-thread" tabindex="-1">What is a Thread? <a class="header-anchor" href="#what-is-a-thread" aria-label="Permalink to &quot;What is a Thread?&quot;">​</a></h3><p>A <strong>thread</strong> is a lightweight process, a basic unit of CPU utilization comprising:</p><ul><li>Thread ID</li><li>Program Counter</li><li>Register Set</li><li>Stack</li></ul><hr><h3 id="what-is-process-synchronization" tabindex="-1">What is Process Synchronization? <a class="header-anchor" href="#what-is-process-synchronization" aria-label="Permalink to &quot;What is Process Synchronization?&quot;">​</a></h3><p><strong>Process synchronization</strong> ensures only one process manipulates shared data at a time, avoiding <strong>race conditions</strong>.</p><hr><h3 id="what-is-cache-memory" tabindex="-1">What is Cache Memory? <a class="header-anchor" href="#what-is-cache-memory" aria-label="Permalink to &quot;What is Cache Memory?&quot;">​</a></h3><p><strong>Cache memory</strong> is a fast-access memory where the microprocessor first looks for data before accessing RAM.<br> Memory hierarchy:</p><ul><li><strong>Registers → L1 Cache → L2 Cache → RAM → Secondary Memory</strong></li></ul><hr><h3 id="what-is-virtual-memory" tabindex="-1">What is Virtual Memory? <a class="header-anchor" href="#what-is-virtual-memory" aria-label="Permalink to &quot;What is Virtual Memory?&quot;">​</a></h3><p><strong>Virtual memory</strong> allows secondary storage to function as main memory.<br> Benefits:</p><ul><li>No need for physical address management</li><li>Each process has a virtual-to-physical address mapping</li></ul><hr><h3 id="logical-vs-physical-address-space" tabindex="-1">Logical vs Physical Address Space: <a class="header-anchor" href="#logical-vs-physical-address-space" aria-label="Permalink to &quot;Logical vs Physical Address Space:&quot;">​</a></h3><ul><li><strong>Logical Address:</strong> Size of the process (virtual space)</li><li><strong>Physical Address:</strong> Size of the main memory</li></ul><hr><h3 id="compiler-vs-interpreter" tabindex="-1">Compiler vs Interpreter: <a class="header-anchor" href="#compiler-vs-interpreter" aria-label="Permalink to &quot;Compiler vs Interpreter:&quot;">​</a></h3><ul><li><strong>Compiler:</strong> Translates code into machine code <strong>before</strong> execution.</li><li><strong>Interpreter:</strong> Translates code <strong>line-by-line</strong> during execution.</li></ul><hr><h3 id="definitions" tabindex="-1">Definitions: <a class="header-anchor" href="#definitions" aria-label="Permalink to &quot;Definitions:&quot;">​</a></h3><ul><li><strong>Throughput:</strong> Number of processes completed per time unit.</li><li><strong>Turnaround Time:</strong> Time taken to execute a process.</li><li><strong>Waiting Time:</strong> Time spent in the ready queue.</li><li><strong>Response Time:</strong> Time between a request and the start of the response.</li></ul><hr><h3 id="what-is-a-real-time-system" tabindex="-1">What is a Real-Time System? <a class="header-anchor" href="#what-is-a-real-time-system" aria-label="Permalink to &quot;What is a Real-Time System?&quot;">​</a></h3><p>A <strong>real-time system</strong> processes data as it comes with strict time constraints, ensuring prompt responses to events.</p><hr><h3 id="long-term-vs-short-term-schedulers" tabindex="-1">Long-Term vs Short-Term Schedulers: <a class="header-anchor" href="#long-term-vs-short-term-schedulers" aria-label="Permalink to &quot;Long-Term vs Short-Term Schedulers:&quot;">​</a></h3><ul><li><strong>Long-Term Scheduler (LTS):</strong> Loads processes into memory from the job queue.</li><li><strong>Short-Term Scheduler (STS):</strong> Allocates CPU to processes from the ready queue.</li><li>A medium-term scheduler is a component of an operating system that temporarily moves processes between main memory and secondary memory</li></ul><h3 id="what-is-a-distributed-system" tabindex="-1">What is a Distributed System? <a class="header-anchor" href="#what-is-a-distributed-system" aria-label="Permalink to &quot;What is a Distributed System?&quot;">​</a></h3><p>A <strong>distributed system</strong> operates in a network, sharing resources and communication between multiple systems.</p><hr><h3 id="what-is-a-daemon" tabindex="-1">What is a Daemon? <a class="header-anchor" href="#what-is-a-daemon" aria-label="Permalink to &quot;What is a Daemon?&quot;">​</a></h3><p>A <strong>daemon</strong> is a background program that runs without user input, typically in Unix or Linux systems, managing resources and automating tasks.</p><hr><h3 id="what-is-busy-waiting" tabindex="-1">What is Busy Waiting? <a class="header-anchor" href="#what-is-busy-waiting" aria-label="Permalink to &quot;What is Busy Waiting?&quot;">​</a></h3><p><strong>Busy waiting</strong> occurs when a process repeatedly checks for a condition to be met before continuing execution.</p><hr><h3 id="dual-mode-operation" tabindex="-1">Dual-Mode Operation: <a class="header-anchor" href="#dual-mode-operation" aria-label="Permalink to &quot;Dual-Mode Operation:&quot;">​</a></h3><ul><li><strong>User Mode</strong></li><li><strong>Kernel Mode</strong></li></ul><hr><h3 id="path-types" tabindex="-1">Path Types: <a class="header-anchor" href="#path-types" aria-label="Permalink to &quot;Path Types:&quot;">​</a></h3><ul><li><strong>Absolute Path:</strong> The exact path from the root directory.</li><li><strong>Relative Path:</strong> A path relative to the current location.</li></ul><hr><h3 id="what-is-dram" tabindex="-1">What is DRAM? <a class="header-anchor" href="#what-is-dram" aria-label="Permalink to &quot;What is DRAM?&quot;">​</a></h3><p><strong>Dynamic RAM (DRAM)</strong> stores data as electrical capacitance, while <strong>Static RAM (SRAM)</strong> stores data as voltage levels.</p><h3 id="here-are-some-of-the-most-important-operating-system-os-questions-frequently-asked-in-software-development-engineer-sde-interviews" tabindex="-1">Here are some of the most important Operating System (OS) questions frequently asked in Software Development Engineer (SDE) interviews: <a class="header-anchor" href="#here-are-some-of-the-most-important-operating-system-os-questions-frequently-asked-in-software-development-engineer-sde-interviews" aria-label="Permalink to &quot;Here are some of the most important Operating System (OS) questions frequently asked in Software Development Engineer (SDE) interviews:&quot;">​</a></h3><hr><h3 id="_1-what-is-a-process-and-a-thread" tabindex="-1">1. <strong>What is a Process and a Thread?</strong> <a class="header-anchor" href="#_1-what-is-a-process-and-a-thread" aria-label="Permalink to &quot;1. **What is a Process and a Thread?**&quot;">​</a></h3><ul><li><strong>Process</strong>: A process is an instance of a program that is being executed. It has its own memory space and resources.</li><li><strong>Thread</strong>: A thread is a smaller unit of a process that can be scheduled and executed. Threads within the same process share memory and resources.</li></ul><hr><h3 id="_2-difference-between-process-and-thread" tabindex="-1">2. <strong>Difference Between Process and Thread?</strong> <a class="header-anchor" href="#_2-difference-between-process-and-thread" aria-label="Permalink to &quot;2. **Difference Between Process and Thread?**&quot;">​</a></h3><ul><li><strong>Process</strong>: <ul><li>Owns memory space and resources.</li><li>Heavier context-switching.</li><li>Isolated from other processes.</li></ul></li><li><strong>Thread</strong>: <ul><li>Shares memory/resources of its parent process.</li><li>Lighter context-switching.</li><li>Can communicate easily within the process.</li></ul></li></ul><hr><h3 id="_3-what-is-deadlock" tabindex="-1">3. <strong>What is Deadlock?</strong> <a class="header-anchor" href="#_3-what-is-deadlock" aria-label="Permalink to &quot;3. **What is Deadlock?**&quot;">​</a></h3><ul><li><strong>Deadlock</strong> occurs when a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process. Conditions for deadlock: <ol><li>Mutual Exclusion: only one process can use the resource at any time.</li><li>Hold and Wait:: A process holding at least one resource is waiting to acquire additional resources that are currently being held by other processes</li><li>No Preemption:Once a process is holding a resource then that resource cannot be taken away from that process until the process voluntarily releases</li><li>Circular Wait:A set of processes are in a circular chain where each process is waiting for a resource that the next process in the chain holds</li></ol></li></ul><hr><h3 id="_4-what-are-mutex-and-semaphore" tabindex="-1">4. <strong>What are Mutex and Semaphore?</strong> <a class="header-anchor" href="#_4-what-are-mutex-and-semaphore" aria-label="Permalink to &quot;4. **What are Mutex and Semaphore?**&quot;">​</a></h3><ul><li><strong>Mutex</strong>: A lock that allows only one thread/process to access a resource at a time. Only the thread that locked it can unlock it.</li><li><strong>Semaphore</strong>: A signaling mechanism that allows multiple threads/processes to access resources concurrently, with a counter tracking resource availability. It can be used for both synchronization and signaling.</li></ul><hr><h3 id="_5-what-is-a-critical-section" tabindex="-1">5. <strong>What is a Critical Section?</strong> <a class="header-anchor" href="#_5-what-is-a-critical-section" aria-label="Permalink to &quot;5. **What is a Critical Section?**&quot;">​</a></h3><ul><li>A <strong>critical section</strong> is a part of a program where shared resources (like variables, memory) are accessed. Mutual exclusion mechanisms (like locks) ensure only one process/thread enters this section at a time.</li></ul><hr><h3 id="_6-explain-context-switching" tabindex="-1">6. <strong>Explain Context Switching.</strong> <a class="header-anchor" href="#_6-explain-context-switching" aria-label="Permalink to &quot;6. **Explain Context Switching.**&quot;">​</a></h3><ul><li><strong>Context Switching</strong> is the process of saving the state of a running process/thread and restoring the state of another. This allows the CPU to switch between different tasks (processes or threads).</li></ul><hr><h3 id="_7-what-is-paging" tabindex="-1">7. <strong>What is Paging?</strong> <a class="header-anchor" href="#_7-what-is-paging" aria-label="Permalink to &quot;7. **What is Paging?**&quot;">​</a></h3><ul><li><strong>Paging</strong> is a memory management scheme that eliminates the need for contiguous memory allocation. The process&#39;s memory is divided into fixed-size pages, and the physical memory is divided into frames. The OS uses page tables to map virtual addresses to physical addresses.</li></ul><hr><h3 id="_8-difference-between-paging-and-segmentation" tabindex="-1">8. <strong>Difference Between Paging and Segmentation?</strong> <a class="header-anchor" href="#_8-difference-between-paging-and-segmentation" aria-label="Permalink to &quot;8. **Difference Between Paging and Segmentation?**&quot;">​</a></h3><ul><li><strong>Paging</strong>: <ul><li>Divides memory into fixed-size pages.</li><li>Solves fragmentation issues.</li></ul></li><li><strong>Segmentation</strong>: <ul><li>Divides memory into variable-size segments.</li><li>Logical division (code, data, stack segments).</li></ul></li></ul><hr><h3 id="_9-what-is-virtual-memory" tabindex="-1">9. <strong>What is Virtual Memory?</strong> <a class="header-anchor" href="#_9-what-is-virtual-memory" aria-label="Permalink to &quot;9. **What is Virtual Memory?**&quot;">​</a></h3><ul><li><strong>Virtual Memory</strong> is a technique that provides an illusion of more memory than physically available by using disk space. It allows processes to execute even if they don’t fit into physical RAM.</li></ul><hr><h3 id="_10-what-is-thrashing" tabindex="-1">10. <strong>What is Thrashing?</strong> <a class="header-anchor" href="#_10-what-is-thrashing" aria-label="Permalink to &quot;10. **What is Thrashing?**&quot;">​</a></h3><ul><li><strong>Thrashing</strong> occurs when a system spends most of its time swapping pages in and out of memory (paging) rather than executing instructions. This typically happens when the system has insufficient memory.</li></ul><hr><h3 id="_11-what-is-a-system-call" tabindex="-1">11. <strong>What is a System Call?</strong> <a class="header-anchor" href="#_11-what-is-a-system-call" aria-label="Permalink to &quot;11. **What is a System Call?**&quot;">​</a></h3><ul><li>A <strong>system call</strong> is a way for programs to interact with the operating system. It provides services like process management, I/O, file operations, and more. Examples: <code>fork()</code>, <code>exec()</code>, <code>open()</code>, <code>read()</code>.</li></ul><hr><h3 id="_12-what-is-inter-process-communication-ipc" tabindex="-1">12. <strong>What is Inter-Process Communication (IPC)?</strong> <a class="header-anchor" href="#_12-what-is-inter-process-communication-ipc" aria-label="Permalink to &quot;12. **What is Inter-Process Communication (IPC)?**&quot;">​</a></h3><ul><li><strong>IPC</strong> mechanisms allow processes to communicate and synchronize with each other. Common methods include: <ul><li><strong>Shared Memory</strong>.</li><li><strong>Message Passing</strong> (pipes, message queues).</li><li><strong>Semaphores</strong>.</li></ul></li></ul><hr><h3 id="_13-what-is-a-race-condition" tabindex="-1">13. <strong>What is a Race Condition?</strong> <a class="header-anchor" href="#_13-what-is-a-race-condition" aria-label="Permalink to &quot;13. **What is a Race Condition?**&quot;">​</a></h3><ul><li>A <strong>race condition</strong> occurs when the behavior of a program depends on the sequence or timing of uncontrollable events like thread scheduling. It can lead to inconsistent or incorrect outcomes if not managed properly using synchronization mechanisms.</li></ul><hr><h3 id="_14-explain-different-cpu-scheduling-algorithms" tabindex="-1">14. <strong>Explain Different CPU Scheduling Algorithms.</strong> <a class="header-anchor" href="#_14-explain-different-cpu-scheduling-algorithms" aria-label="Permalink to &quot;14. **Explain Different CPU Scheduling Algorithms.**&quot;">​</a></h3><ul><li><strong>First-Come-First-Serve (FCFS)</strong>: Jobs are scheduled in the order they arrive.</li><li><strong>Shortest Job First (SJF)</strong>: The job with the shortest execution time is scheduled first.</li><li><strong>Round Robin (RR)</strong>: Each job is given a fixed time slice and is scheduled in a circular order.</li><li><strong>Priority Scheduling</strong>: Jobs are scheduled based on priority, with higher-priority tasks scheduled first.</li></ul><hr><h3 id="_15-what-is-the-difference-between-preemptive-and-non-preemptive-scheduling" tabindex="-1">15. <strong>What is the Difference Between Preemptive and Non-Preemptive Scheduling?</strong> <a class="header-anchor" href="#_15-what-is-the-difference-between-preemptive-and-non-preemptive-scheduling" aria-label="Permalink to &quot;15. **What is the Difference Between Preemptive and Non-Preemptive Scheduling?**&quot;">​</a></h3><ul><li><strong>Preemptive Scheduling</strong>: The OS can interrupt and switch processes based on priority or time slice.</li><li><strong>Non-Preemptive Scheduling</strong>: Once a process starts, it runs until completion, blocking all other processes.</li></ul><hr><h3 id="_16-what-are-the-different-types-of-kernels" tabindex="-1">16. <strong>What are the Different Types of Kernels?</strong> <a class="header-anchor" href="#_16-what-are-the-different-types-of-kernels" aria-label="Permalink to &quot;16. **What are the Different Types of Kernels?**&quot;">​</a></h3><ul><li><strong>Monolithic Kernel</strong>: All OS services run in kernel space. Example: Linux.</li><li><strong>Microkernel</strong>: Minimal kernel; most services run in user space. Example: Minix, QNX.</li></ul><hr><h3 id="_17-what-is-a-page-fault" tabindex="-1">17. <strong>What is a Page Fault?</strong> <a class="header-anchor" href="#_17-what-is-a-page-fault" aria-label="Permalink to &quot;17. **What is a Page Fault?**&quot;">​</a></h3><ul><li>A <strong>page fault</strong> occurs when a process tries to access a page that is not currently in physical memory. The OS fetches the page from disk (virtual memory) into RAM.</li></ul><hr><h3 id="_18-what-is-demand-paging" tabindex="-1">18. <strong>What is Demand Paging?</strong> <a class="header-anchor" href="#_18-what-is-demand-paging" aria-label="Permalink to &quot;18. **What is Demand Paging?**&quot;">​</a></h3><ul><li><strong>Demand Paging</strong> is a technique where pages are loaded into memory only when they are needed, rather than loading the entire process into memory at once.</li></ul><hr><h3 id="_19-what-is-a-daemon" tabindex="-1">19. <strong>What is a Daemon?</strong> <a class="header-anchor" href="#_19-what-is-a-daemon" aria-label="Permalink to &quot;19. **What is a Daemon?**&quot;">​</a></h3><ul><li>A <strong>daemon</strong> is a background process that runs continuously to handle specific system tasks like logging, file transfers, or network connections. Example: <code>cron</code>, <code>httpd</code>.</li></ul><hr><h3 id="_20-explain-banker-s-algorithm" tabindex="-1">20. <strong>Explain Banker&#39;s Algorithm.</strong> <a class="header-anchor" href="#_20-explain-banker-s-algorithm" aria-label="Permalink to &quot;20. **Explain Banker&#39;s Algorithm.**&quot;">​</a></h3><ul><li>The <strong>Banker’s Algorithm</strong> is used to avoid deadlock by ensuring that a system never enters an unsafe state. It evaluates resource allocation requests and grants them only if the system remains in a safe state.</li></ul><hr>',142),o=[i];function n(l,h,c,d,g,u){return t(),a("div",null,o)}const f=e(r,[["render",n]]);export{p as __pageData,f as default};

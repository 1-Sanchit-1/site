### 1. **Vector (`vector<int> v`)**

| Method              | Description                                | Time Complexity |
| ------------------- | ------------------------------------------ | --------------- |
| `v.push_back()`     | Adds an element to the end                 | Amortized O(1)  |
| `v.pop_back()`      | Removes the last element                   | O(1)            |
| `v.back()`          | Accesses the last element                  | O(1)            |
| `v.front()`         | Accesses the first element                 | O(1)            |
| `v.size()`          | Returns the number of elements             | O(1)            |
| `v.erase(it)`       | Removes element at iterator `it`           | O(n)            |
| `v.erase(it1, it2)` | Removes elements in the range `[it1, it2)` | O(n)            |
| `v.insert(it, val)` | Inserts `val` before the iterator `it`     | O(n)            |
| `v.clear()`         | Removes all elements                       | O(n)            |
| `v.at(i)`           | Accesses the element at index `i`          | O(1)            |
| `v[i]`              | Accesses the element at index `i`          | O(1)            |

---

### 2. **Map (`map<int, int> mp`)**

| Method                  | Description                                       | Time Complexity |
| ----------------------- | ------------------------------------------------- | --------------- |
| `mp.insert({key, val})` | Inserts a key-value pair                          | O(log n)        |
| `mp.erase(key)`         | Removes an element by key                         | O(log n)        |
| `mp.erase(it)`          | Removes element at iterator `it`                  | O(1)            |
| `mp.find(key)`          | Finds the iterator to the key, if it exists       | O(log n)        |
| `mp.count(key)`         | Checks if the key exists (returns 1 or 0)         | O(log n)        |
| `mp[key]`               | Accesses or inserts the value associated with key | O(log n)        |
| `mp.clear()`            | Removes all elements                              | O(n)            |
| `mp.size()`             | Returns the number of elements                    | O(1)            |

---

| Operation         | `map` (Balanced Tree) | `unordered_map` (Hash Table)  |
| ----------------- | --------------------- | ----------------------------- |
| Insertion         | O(log n)              | O(1) average, O(n) worst case |
| Deletion          | O(log n)              | O(1) average, O(n) worst case |
| Search            | O(log n)              | O(1) average, O(n) worst case |
| Ordered traversal | Yes (in key order)    | No (unordered traversal)      |

---

### 3. **Set (`set<int> s`)**

| Method          | Description                                       | Time Complexity |
| --------------- | ------------------------------------------------- | --------------- |
| `s.insert(val)` | Inserts an element                                | O(log n)        |
| `s.erase(it)`   | Removes element at iterator `it`                  | O(1)            |
| `s.erase(val)`  | Removes the element with value `val`              | O(log n)        |
| `s.find(val)`   | Finds the iterator to the element, if it exists   | O(log n)        |
| `s.count(val)`  | Checks if the value exists                        | O(log n)        |
| `s.clear()`     | Removes all elements                              | O(n)            |
| `s.size()`      | Returns the number of elements                    | O(1)            |
| `s.begin()`     | Returns an iterator to the first element          | O(1)            |
| `s.end()`       | Returns an iterator to the element after the last | O(1)            |

---

| Operation         | `set` (Balanced Tree) | `unordered_set` (Hash Table)  |
| ----------------- | --------------------- | ----------------------------- |
| Insertion         | O(log n)              | O(1) average, O(n) worst case |
| Deletion          | O(log n)              | O(1) average, O(n) worst case |
| Search            | O(log n)              | O(1) average, O(n) worst case |
| Ordered traversal | Yes (in key order)    | No (unordered traversal)      |
| Access by key     | O(log n)              | O(1) average, O(n) worst case |
| Size              | O(1)                  | O(1)                          |
| Clear             | O(n)                  | O(n)                          |

---

### 4. **Queue (`queue<int> q`)**

| Method        | Description                    | Time Complexity |
| ------------- | ------------------------------ | --------------- |
| `q.push(val)` | Adds an element to the back    | O(1)            |
| `q.pop()`     | Removes the front element      | O(1)            |
| `q.front()`   | Accesses the front element     | O(1)            |
| `q.back()`    | Accesses the back element      | O(1)            |
| `q.size()`    | Returns the number of elements | O(1)            |
| `q.empty()`   | Checks if the queue is empty   | O(1)            |

---

### 5. **Priority Queue (`priority_queue<int> pq`)**

| Method         | Description                                       | Time Complexity |
| -------------- | ------------------------------------------------- | --------------- |
| `pq.push(val)` | Adds an element (maintains heap property)         | O(log n)        |
| `pq.pop()`     | Removes the top element (maintains heap property) | O(log n)        |
| `pq.top()`     | Accesses the top element                          | O(1)            |
| `pq.size()`    | Returns the number of elements                    | O(1)            |
| `pq.empty()`   | Checks if the priority queue is empty             | O(1)            |

---

### 6. **Stack (`stack<int> st`)**

| Method         | Description                      | Time Complexity |
| -------------- | -------------------------------- | --------------- |
| `st.push(val)` | Pushes an element onto the stack | O(1)            |
| `st.pop()`     | Removes the top element          | O(1)            |
| `st.top()`     | Accesses the top element         | O(1)            |
| `st.size()`    | Returns the number of elements   | O(1)            |
| `st.empty()`   | Checks if the stack is empty     | O(1)            |

---

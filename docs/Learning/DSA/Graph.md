# Graph

## Breadth-First Search (BFS):

BFS is an algorithm for traversing or searching tree or graph data structures. It starts at the root (or an arbitrary node) and explores the neighbor nodes at the present depth prior to moving on to nodes at the next depth level.

- Initialize a queue and push the starting node.
- Mark the starting node as visited.
- Process nodes in the queue:
- Pop the node from the front of the queue.
- Visit all its adjacent (unvisited) nodes and push them into the queue.
- Repeat until the queue is empty.

```cpp
void BFS(int start, vector<vector<int>> &adj, vector<bool> &visited) {
    queue<int> q;
    q.push(start);
    visited[start] = true;

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
```

## Depth-First Search (DFS):

- Mark the starting node as visited.
- For each adjacent (unvisited) node:
- Recursively call DFS on the adjacent node.
- Continue until all nodes in the current path are visited.
- Backtrack and continue DFS from other unvisited nodes.

```cpp
void DFS(int node, vector<vector<int>> &adj, vector<bool> &visited) {
    visited[node] = true;
    cout << node << " ";

    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            DFS(neighbor, adj, visited);
        }
    }
}
```

## Cycle detection in undirected graph :

- Maintain the node and its parent, now while going through the adjacency list of the node, if we find a x which is visited and is not equal to the node’s parent, then you say that cycle is detected.

- Perform DFS for every unvisited node.
- Track the parent of each node to avoid backtracking to the parent.
- For each adjacent node:
- If it’s unvisited, recursively call DFS on it.
- If it’s visited and not the parent, a cycle is detected.
- Continue DFS for other unvisited nodes.

```cpp
bool isCyclicUtil(int node, int parent, vector<vector<int>> &adj, vector<bool> &visited) {
    visited[node] = true;

    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            if (isCyclicUtil(neighbor, node, adj, visited))
                return true;
        } else if (neighbor != parent) {
            return true;
        }
    }
    return false;
}
```

## Cycle detection in directed graph :

- Perform DFS from every unvisited node.
- Maintain a recursion stack to track the current path of DFS.
- For each adjacent node: 3.1 // If the adjacent node is unvisited, recursively call DFS.
- If the adjacent node is already in the recursion stack, a cycle is detected.
- Remove the node from the recursion stack after DFS completes for that node.

```cpp
bool isCyclicUtil(int node, vector<vector<int>> &adj, vector<bool> &visited, vector<bool> &recStack) {
    if (!visited[node]) {
        visited[node] = true;
        recStack[node] = true;

        for (int neighbor : adj[node]) {
            if (!visited[neighbor] && isCyclicUtil(neighbor, adj, visited, recStack))
                return true;
            else if (recStack[neighbor])
                return true;
        }
    }
    recStack[node] = false;
    return false;
}
```

## Topological Sort :

- we use the queue data structure and an in-degree array. Whenever we get a node whose indegree is zero, we just push that node into the queue. Whenever we pop the front from the queue, pushback it into the the resultant vector.

- Calculate in-degree of each vertex.
- Initialize queue and add all vertices with in-degree 0.
- Process vertices in the queue:
- For each vertex, reduce in-degree of its neighbors.
- If in-degree of any neighbor becomes 0, add it to the queue.Continue until the queue is empty.
- If all vertices are processed, you have a valid topological order. Otherwise, there’s a cycle.

```cpp
// Calculate in-degree of each vertex
for (int i = 0; i < V; ++i) {
    for (int j : adj[i]) {
        inDegree[j]++;
    }
}

// Initialize queue and add all vertices with in-degree 0
queue<int> q;
for (int i = 0; i < V; ++i) {
    if (inDegree[i] == 0) {
        q.push(i);
    }
}

// Process vertices
vector<int> topoOrder;
while (!q.empty()) {
    int u = q.front();
    q.pop();
    topoOrder.push_back(u);

    for (int v : adj[u]) {
        inDegree[v]--;
        if (inDegree[v] == 0) {
            q.push(v);
        }
    }
}

// Check for a cycle
if (topoOrder.size() != V) {
    cout << "The graph contains a cycle. Topological sorting is not possible.\\n";
} else {
    cout << "Topological Sort: ";
    for (int v : topoOrder) {
        cout << v << " ";
    }
    cout << "\\n";
}
```

## Dijkstra’s Algorithm

- Initialize distances of all nodes to infinity, except the source (set to 0).
- Use a priority queue to store nodes by their current shortest distance.
- Process nodes from the priority queue:
- For each node, visit its adjacent nodes.
- If the new path offers a shorter distance, update the distance and push the adjacent node into the queue.
- Repeat until the queue is empty and shortest paths are found

```cpp
void dijkstra(const vector<vector<pair<int, int>>> &adj, int V, int start) {
    vector<int> dist(V, INF);
    dist[start] = 0;

    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, start});

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();

        for (const auto &neighbor : adj[u]) {
            int v = neighbor.first;
            int weight = neighbor.second;

            if (dist[u] != INF && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }

    cout << "Vertex\tDistance from Source\n";
    for (int i = 0; i < V; ++i) {
        cout << i << "\t" << (dist[i] == INF ? "INF" : to_string(dist[i])) << "\n";
    }
}

```

---

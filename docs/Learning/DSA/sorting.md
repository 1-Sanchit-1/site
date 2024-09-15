### 1. **Bubble Sort**

**Description**: Repeatedly swaps adjacent elements if they are in the wrong order. Simple but inefficient for large datasets.

#### Time Complexity:

- Best: O(n) (when array is already sorted)
- Average: O(n²)
- Worst: O(n²)

#### Code:

```cpp
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;  // No swap means array is sorted
    }
}
```

### 2. **Selection Sort**

**Description**: Finds the minimum element from the unsorted portion and swaps it with the first unsorted element.

#### Time Complexity:

- Best, Average, Worst: O(n²)

#### Code:

```cpp
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr[i], arr[minIndex]);
    }
}
```

### 3. **Insertion Sort**

**Description**: Builds the sorted array one item at a time, inserting each new element in its proper place relative to the already sorted elements.

#### Time Complexity:

- Best: O(n)
- Average, Worst: O(n²)

#### Code:

```cpp
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

### 4. **Merge Sort**

**Description**: Divides the array into two halves, sorts each half, and then merges them together in sorted order.

#### Time Complexity:

- Best, Average, Worst: O(n log n)

#### Code:

```cpp

void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    vector<int> L(n1), R(n2);

    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int i = 0; i < n2; i++) R[i] = arr[mid + 1 + i];

    int i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}
```

### 5. **Quick Sort**

**Description**: Picks a pivot, partitions the array around the pivot so that elements smaller than the pivot are on the left and larger on the right, and recursively sorts the subarrays.

#### Time Complexity:

- Best, Average: O(n log n)
- Worst: O(n²)

#### Code:

```cpp

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
```

### 6. **Heap Sort**

**Description**: Uses a binary heap to repeatedly remove the largest element and place it at the end of the array.

#### Time Complexity:

- Best, Average, Worst: O(n log n)

#### Code:

```cpp

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}
```

### 7. **Counting Sort**

**Description**: Counts the occurrences of each unique element and then uses this information to place the elements in sorted order. Only works for a limited range of integers.

#### Time Complexity:

- Best, Average, Worst: O(n + k) where k is the range of the input

#### Code:

```cpp

void countingSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    int minVal = *min_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;

    vector<int> count(range), output(arr.size());

    for (int i = 0; i < arr.size(); i++)
        count[arr[i] - minVal]++;

    for (int i = 1; i < count.size(); i++)
        count[i] += count[i - 1];

    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }

    for (int i = 0; i < arr.size(); i++)
        arr[i] = output[i];
}
```

### 8. **Radix Sort**

**Description**: Sorts numbers digit by digit starting from the least significant digit to the most significant digit, using a stable sorting algorithm like counting sort.

#### Time Complexity:

- Best, Average, Worst: O(nk) where k is the number of digits in the largest number

#### Code:

```cpp
int getMax(const vector<int>& arr) {
    return *max_element(arr.begin(), arr.end());
}

void countingSortForRadix(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n), count(10, 0);

    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];

    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

void radixSort(vector<int>& arr) {
    int maxVal = getMax(arr);

    for (int exp = 1; maxVal / exp > 0; exp *= 10)
        countingSortForRadix(arr, exp);
}
```

### Summary Table:

| Algorithm | Best Time Complexity | Average Time Complexity | Worst Time Complexity | Space Complexity |
| --------- | -------------------- | ----------------------- | --------------------- | ---------------- |

| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) |
| **Counting Sort** | O(n + k) | O(n + k) | O(n + k) | O(n + k) |
| **Radix Sort** | O(nk) | O(nk) | O(nk) | O(n + k) |

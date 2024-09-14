**Binary Search** is an efficient algorithm for finding a target element in a **sorted array**.
It works by repeatedly dividing the search interval in half

- If the target value is **less than** the middle element, the search continues on the left half.
- If the target value is **greater than** the middle element, the search continues on the right half.
- If the middle element is the target, the search is complete.

**Key Condition**: The array must be **sorted**.

## Binary Search Algorithm

### Pseudo-Code:

```cpp
1. Initialize two pointers, `left = 0` and `right = n-1`
2. While `left <= right`:
    a. Calculate `mid = left + (right - left) / 2`
    b. If `target == arr[mid]`, return the index `mid`
    c. If `target < arr[mid]`, search in the left half: `right = mid - 1`
    d. If `target > arr[mid]`, search in the right half: `left = mid + 1`
3. If the element is not found, return -1.
```

---

## Recursive vs Iterative Approach

### Iterative Binary Search

```cpp
int binarySearchIterative(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
       // int mid = left + (right - left) / 2;
        int mid=(i+((j-i)>>1)) ;
        if (nums[mid] == target) return mid;    // Target found
        else if (nums[mid] > target) right = mid - 1;  // Search left half
        else left = mid + 1;  // Search right half
    }

    return -1;  // Target not found
}
```

### Recursive Binary Search

```cpp
int binarySearchRecursive(vector<int>& nums, int left, int right, int target) {
    if (left > right) return -1;  // Base case: Target not found
    int mid = left + (right - left) / 2;
    if (nums[mid] == target) return mid;    // Target found
    else if (nums[mid] > target) return binarySearchRecursive(nums, left, mid - 1, target);  // Search left half
    else return binarySearchRecursive(nums, mid + 1, right, target);  // Search right half
}
```

## Time Complexity

- **Time Complexity**: (O(log n))
- **Space Complexity**:
  - **Iterative**: (O(1)) (constant space).
  - **Recursive**: (O(log n)) due to recursive function calls.

### Lower bound & upper bound

- lower_bound - returns iterator to first element in the given range which is **Equal_to or Greater than val**.

- upper_bound - returns iterator to first element in the given range which is **Greater than val**.

## Common Problems

## Finding the First or Last Occurrence of a Target

- **Problem**: [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
- **Hint**:Use binary search with slight modifications to find the **first** or **last** index where the target occurs.
  **OR**

```cpp
 int lower_index =  lower_bound(nums.begin(), nums.end(), target) - nums.begin() ;
 if (lower_index == nums.size() || nums[lower_index] != target) {
     return {-1, -1};
 }
 int upper_index =  upper_bound(nums.begin(), nums.end(), target) - nums.begin() - 1 ;
    return {lower_index,upper_index};
```

---

## Find Minimum in Rotated Sorted Arra

- **Problem**: [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- **Hint**:
  1. The minimum element in a circularly sorted array is the pivot point.
  2. Use binary search to find the pivot.
  3. The index of the minimum element indicates how many times the array is rotated.

---

## Search in a Circularly Sorted Array

- **Problem**: [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- **Hint**:
  1. Use binary search to identify the pivot point where the array is rotated.
  2. Perform binary search on the appropriate half (either left or right of the pivot) where the target could be.

---

## Find Row with Maximum Ones in a Matrix Sorted by Rows

- **Problem**: [Row with Maximum Number of 1s](https://www.tutorialcup.com/array/row-maximum-number-1s.htm)
- **Hint**:
  1. Start from the top-right corner of the matrix.
  2. If you encounter a 1, move left; if you encounter a 0, move down.
  3. Keep track of the row with the maximum number of 1s.

---

## Find the square root of a given number n using binary search with a specified precision

[**Find the square root of a given number n using binary search with a specified precision**](https://leetcode.com/problems/sqrtx/description/) .

- Approach:
- Use binary search to find the integer part of the square root.
- Refine the result to include the fractional part up to the desired precision p.

```cpp
double morePrecision(int n, int precision, int tempSol) {
    double factor = 1;  // Factor for each decimal place
    double ans = tempSol;  // Start with the integer part solution

    // Loop to add more precision
    for (int i = 0; i < precision; i++) {
        factor /= 10;  // Reduce the factor by 10 (moving to the next decimal place)

        // Linear search for each decimal place
        for (double j = ans; j * j <= n; j += factor) {
            ans = j;  // Update ans if j * j is still <= n
        }
    }

    return ans;  // Return the final result with the desired precision
}
```

## Find an Element in a Matrix Sorted by Rows

- **Problem**: [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
- **Hint**:
  1. Treat the matrix as a 1D sorted array by flattening it conceptually.
  2. Use binary search to search for the target element in the matrix.

---

## Egg Dropping Puzzle

- **Problem**: [Super Egg Drop](https://leetcode.com/problems/super-egg-drop/)
- **Hint**:
  1. This is a dynamic programming problem.
  2. Start with one egg and incrementally add eggs, exploring the minimum number of attempts needed.
  3. Think of the problem in terms of worst-case scenario at each floor drop.

---

## Kth Smallest Element in a Sorted Matrix

- **Problem**: [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)
- **Hint**:
  1. The matrix is row-wise and column-wise sorted.
  2. Use a min-heap (priority queue) to push elements from the matrix in order, or binary search on the value range.

---

## Distribute `n` Candies Among `k` People

- **Problem**: [Distribute Candies to People](https://leetcode.com/problems/distribute-candies-to-people/)
- **Hint**:
  1. Distribute the candies in rounds, where each person receives an incrementally increasing number of candies.
  2. Keep track of how many candies remain and adjust accordingly at each step.
  3. Use modulo operations to loop through the people.

---

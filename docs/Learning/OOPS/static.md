1. **Static Variable**:

   - **What it is**: A variable that belongs to the class, not to objects.
   - **Example**: If you create multiple objects of a class, all of them will share the same `static` variable.
   - **Key Points**:
     - It's shared among all instances of the class.
     - Keeps its value between method calls.
   - **Example**:
     ```cpp
     class MyClass {
         static int count;
     };
     ```
   - This count variable having the single shared memory
   - It can be overridden
   - It can access by using class name

2. **Static Method**:

   - **What it is**: A method that belongs to the class, not an object, and can be called without creating an instance.
   - **Key Points**:
     - Can only access static variables or other static methods.
     - Cannot access instance variables directly.
   - **Example**:

     ```cpp
     class MyClass {
         static void printMessage() {
             cout << "Hello!";
         }
     };
     ```

     - Make the object of the class and pass the instance variable for access the instance variable inside the static method.

3. **Static Class**:
   - **What it is**: A class that cannot be instantiated and only contains static members (variables and methods).
   - **Key Points**:
     - Only static members allowed.
     - Cannot create objects of this class.
   - **Example**:
     ```csharp
     static class MyUtility {
         static void DoSomething() {
             Console.WriteLine("Doing something!");
         }
     }
     MyUtility.DoSomething();  // Can only call methods like this.
     ```

In summary, `static` means something is shared or belongs to the class, not individual objects.

# Evaluation of Prefix and Postfix Expressions Using Stack

## Postfix Expression

### Given Expression:

**{(A\*B) + (C\*D)} - E**

Convert this expression into the postfix form:

```
{(A*B) + (C*D)} - E
Step 1: {(AB*) + (CD*)} - E
Step 2: {(AB*) (CD*) +} E -
Step 3: (AB*) (CD*) + E -
Final Postfix: A B * C D * + E -
```

### Example:

#### Values:

A = 2, B = 3, C = 4, D = 5, E = 6

Expression:  
**{(A\*B) + (C\*D)} - E**

Postfix:  
**A B \* C D \* + E -**

### Step-by-Step Evaluation:

1. Replace the variables with values:

```
2 3 * 4 5 * + 6 -
```

2. Traverse from **left to right**, applying the operator when encountered to the two preceding operands:

   Ente the Operand from left to right into the stack when the operator is encountered pop out two operands and perform the operation on them and again push into the stack.

```
2 3 * 4 5 * + 6 -
=> 6 4 5 * + 6 -  (2*3 = 6)
=> 6 20 + 6 -    (4*5 = 20)
=> 26 6 -        (6+20 = 26)
=> 20            (26-6 = 20)
```

## Prefix Expression

### Given Expression:

**{(A\*B) + (C\*D)} - E**

Convert this expression into the prefix form:

```
{(A*B) + (C*D)} - E
Step 1: - {(+ (* A B) (* C D))} E
Step 2: - + * A B * C D E
Final Prefix: - + * A B * C D E
```

### Example:

#### Values:

A = 2, B = 3, C = 4, D = 5, E = 6

Expression:  
**{(A\*B) + (C\*D)} - E**

Prefix:  
**- + \* A B \* C D E**

### Step-by-Step Evaluation:

1. Replace the variables with values:

```
- + * 2 3 * 4 5 6
```

2. Traverse from **right to left**, applying the operator when encountered to the two subsequent operands:

   Ente the Operand from right to left into the stack when the operator is encountered pop out two operands and perform the operation on them and again push into the stack.

```
- + * 2 3 * 4 5 6
=> - + * 2 3 20 6  (4*5 = 20)
=> - + 6 20 6     (2*3 = 6)
=> - 26 6         (6+20 = 26)
=> 20             (26-6 = 20)
```

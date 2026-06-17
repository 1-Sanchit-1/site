# DRY (Don't Repeat Yourself)

## What Problem Does It Solve?
Duplicated code is a maintenance time bomb. When the same logic lives in five places, a bug fix or requirement change forces you to hunt down every copy — and you *will* miss one. DRY eliminates duplication so that every piece of knowledge has a single, unambiguous representation in the system.

**Analogy:** You find a great lasagna recipe in a cookbook. If you hand-write a copy for each friend, then discover the baking temperature is wrong, you must track down every handwritten note and correct it. Instead, point everyone to page 42 of the same cookbook — fix it once, everyone benefits.

## How to Identify When to Use It

- Do you use copy-paste to reuse code across the project?
- Do you find yourself making the same edit in multiple files for one feature change?
- Are there functions that look suspiciously similar but have slight variations?
- Do your tests duplicate the setup logic from other tests?
- Are constants defined in more than one place?
- Do you copy SQL queries, validation rules, or configuration across modules?
- **Red flag:** A teammate asks "where is X defined?" and the answer is "in all of these files."

## How to Apply It

1. **Follow the Rule of Three.** The first time you write something, you write it. The second time you duplicate, you abstract. The third time, you refactor into a shared home.
2. **Extract repeated expressions into well-named functions.**
3. **Pull shared configuration and constants into a single module.**
4. **Use data, not code, to eliminate duplication.** Groups of similar functions can often be replaced by a lookup table or a loop over data.
5. **Normalise your database schema** — store a fact once, reference it by ID everywhere else.

```python
# BEFORE: Repeated validation logic
def create_user(username: str, email: str):
    if not username or len(username) < 3:
        raise ValueError("Invalid username")
    if "@" not in email:
        raise ValueError("Invalid email")
    # ... insert user

def update_user(user_id: int, username: str, email: str):
    if not username or len(username) < 3:
        raise ValueError("Invalid username")
    if "@" not in email:
        raise ValueError("Invalid email")
    # ... update user

# AFTER: Single source of truth
def validate_username(username: str) -> None:
    if not username or len(username) < 3:
        raise ValueError("Invalid username")

def validate_email(email: str) -> None:
    if "@" not in email:
        raise ValueError("Invalid email")

def create_user(username: str, email: str):
    validate_username(username)
    validate_email(email)
    # ... insert user

def update_user(user_id: int, username: str, email: str):
    validate_username(username)
    validate_email(email)
    # ... update user
```

## Real-World Example

**Before** — API endpoint handlers each build their own error response:

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/users/<int:uid>")
def get_user(uid):
    user = find_user(uid)
    if user is None:
        return jsonify({"error": "not_found", "message": "User not found"}), 404
    return jsonify(user)

@app.route("/posts/<int:pid>")
def get_post(pid):
    post = find_post(pid)
    if post is None:
        return jsonify({"error": "not_found", "message": "Post not found"}), 404
    return jsonify(post)
```

**After** — Extract a reusable error helper:

```python
def not_found(entity: str):
    return jsonify({"error": "not_found", "message": f"{entity} not found"}), 404

@app.route("/users/<int:uid>")
def get_user(uid):
    user = find_user(uid)
    return jsonify(user) if user else not_found("User")

@app.route("/posts/<int:pid>")
def get_post(pid):
    post = find_post(pid)
    return jsonify(post) if post else not_found("Post")
```

## Common Mistakes / Pitfalls

- **Merging things that are accidentally similar.** Two pieces of code that look the same today will diverge tomorrow. DRY should reflect *conceptual* duplication, not coincidental similarity.
- **Creating coupling to eliminate duplication.** Pulling shared code into a utility module is good; making unrelated modules depend on each other's internals is not.
- **Over-abstracting too early.** Premature extraction can hide intent behind indirection. Wait until you see the pattern at least twice.
- **DRY-ing tests.** Test duplication is often okay — tests should be explicit. Shared test helpers can obscure what each test actually verifies.
- **DRY-ing configuration and data.** Not everything that looks the same *is* the same. Two API endpoints that return "not found" may need different response shapes in the future.

## Related Concepts

- [KISS — Keep It Simple, Stupid](kiss.md)
- [YAGNI — You Ain't Gonna Need It](yagni.md)
- [SoC — Separation of Concerns](soc.md)

### **1. CSS Syntax**

- CSS is used to style HTML elements using **selectors** and **declarations**.
  ```css
  selector {
    property: value;
  }
  ```

### **2. Ways to Apply CSS**

- **Inline CSS**: `style` attribute in HTML tags.
  ```html
  <p style="color: red;">This is red text.</p>
  ```
- **Internal CSS**: `<style>` tag in the `<head>` section of HTML.

  ```html
  <style>
    p {
      color: blue;
    }
  </style>
  ```

- **External CSS**: A separate `.css` file linked with `<link>` tag.
  ```html
  <link rel="stylesheet" href="styles.css" />
  ```

---

### **3. Common CSS Selectors**

- **Element Selector**: Targets all instances of an element.

  ```css
  p {
    color: green;
  }
  ```

- **Class Selector**: Targets elements with a specific class (`.`).

  ```css
  .class-name {
    font-size: 16px;
  }
  ```

- **ID Selector**: Targets an element with a unique ID (`#`).

  ```css
  #unique-id {
    background-color: yellow;
  }
  ```

- **Universal Selector**: Selects all elements (`*`).
  ```css
  * {
    margin: 0;
    padding: 0;
  }
  ```

---

### **4. CSS Properties**

#### **Text & Font**

- **`color`**: Text color.
- **`font-size`**: Size of text.
- **`font-family`**: Font type.
- **`font-weight`**: Boldness (`normal`, `bold`, `bolder`, `lighter`).
- **`text-align`**: Align text (`left`, `right`, `center`, `justify`).
- **`line-height`**: Space between lines.
- **`text-transform`**: Uppercase, lowercase, capitalize text.
- **`text-decoration`**: Underline, overline, line-through.

#### **Box Model**

- **`width`, `height`**: Set size of elements.
- **`margin`**: Space outside an element.
- **`padding`**: Space inside an element (around content).
- **`border`**: Border around an element.
- **`box-sizing`**: Includes padding and border in element’s total width/height.
  ```css
  div {
    width: 100px;
    padding: 10px;
    box-sizing: border-box;
  }
  ```

#### **Background**

- **`background-color`**: Element background color.
- **`background-image`**: Image as background.
- **`background-repeat`**: Repeat image (`repeat`, `no-repeat`, `repeat-x`, `repeat-y`).
- **`background-size`**: Size of background image (`cover`, `contain`).

#### **Positioning**

- **`position`**: Element positioning (`static`, `relative`, `absolute`, `fixed`, `sticky`).
- **`top`, `right`, `bottom`, `left`**: Position relative to its container.
- **`z-index`**: Stacking order for overlapping elements.

#### **Display & Visibility**

- **`display`**: How an element is displayed (`block`, `inline`, `inline-block`, `none`).
- **`visibility`**: Hides element without removing space (`visible`, `hidden`).

#### **Flexbox**

- **`display: flex`**: Turns container into a flex container.
- **`justify-content`**: Align items horizontally (`flex-start`, `center`, `space-between`).
- **`align-items`**: Align items vertically (`flex-start`, `center`, `stretch`).
- **`flex-direction`**: Set direction of flex items (`row`, `column`).
  ```css
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```

#### **CSS Grid**

- **`display: grid`**: Turns container into a grid container.
- **`grid-template-columns`**, **`grid-template-rows`**: Define column/row sizes.
- **`grid-gap`**: Spacing between grid items.
  ```css
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  ```

---

### **5. Media Queries**

- Media queries allow for responsive design by applying styles based on screen size or device type.

```css
@media (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

- **Common Breakpoints**:
  - Mobile: `@media (max-width: 600px)`
  - Tablet: `@media (max-width: 768px)`
  - Desktop: `@media (min-width: 1024px)`

---

### **6. Pseudo-Classes and Pseudo-Elements**

#### **Pseudo-Classes**

- Target elements based on state (hover, focus, etc.).
  ```css
  a:hover {
    color: red;
  }
  ```

#### **Pseudo-Elements**

- Target specific parts of an element (first letter, first line, etc.).
  ```css
  p::first-letter {
    font-size: 2em;
    color: red;
  }
  ```

---

### **7. CSS Units**

- **Absolute Units**: `px`, `cm`, `mm` (fixed sizes).
- **Relative Units**: `%`, `em`, `rem`, `vh`, `vw` (relative to parent or viewport).

---

### **8. Animations & Transitions**

#### **Transitions**

- Smoothly animate changes between styles.
  ```css
  div {
    transition: background-color 0.3s ease;
  }
  ```

#### **Keyframe Animations**

- Define complex animations with keyframes.
  ```css
  @keyframes move {
    0% {
      left: 0px;
    }
    100% {
      left: 100px;
    }
  }
  div {
    animation: move 2s infinite;
  }
  ```

---

### **9. CSS Properties for Layout**

- **`float`**: Floats elements left or right.
- **`clear`**: Prevents elements from wrapping around floated elements.
- **`overflow`**: Handles overflow (`visible`, `hidden`, `scroll`, `auto`).

---

### **10. CSS Variables**

- Store reusable values in CSS.
  ```css
  :root {
    --main-color: #3498db;
  }
  div {
    color: var(--main-color);
  }
  ```

---

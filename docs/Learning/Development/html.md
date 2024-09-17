### HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It defines the structure of a webpage using **tags**. Here's an organized guide with semantic differentiation.

---

### **HTML Document Structure**

The basic structure of an HTML document consists of the following tags:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
  </head>
  <body>
    <!-- Page content goes here -->
  </body>
</html>
```

- **`<!DOCTYPE html>`**: Declares the document type and version (HTML5 in this case).
- **`<html>`**: The root element that contains all HTML content.
- **`<head>`**: Contains metadata, title, and linked resources like CSS.
- **`<meta>`**: Defines meta-information like character set and viewport settings.
- **`<title>`**: Specifies the title of the webpage (shown in the browser tab).
- **`<body>`**: Contains the visible content of the page.

---

### **Semantic HTML Tags**

Semantic tags clearly describe their meaning in a human- and machine-readable way. They help with SEO and accessibility.

#### **Structural Tags**

- **`<header>`**: Defines the header section of a webpage, typically containing navigation or branding.

  ```html
  <header>
    <h1>Website Logo</h1>
    <nav><!-- Navigation links --></nav>
  </header>
  ```

- **`<nav>`**: Defines a navigation block, usually for main site links.

  ```html
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
  </nav>
  ```

- **`<section>`**: Represents a thematic grouping of content, typically with a heading.

  ```html
  <section>
    <h2>Our Services</h2>
    <p>Details about services...</p>
  </section>
  ```

- **`<article>`**: Represents independent content, such as blog posts, news articles, etc.

  ```html
  <article>
    <h2>Blog Post Title</h2>
    <p>Post content...</p>
  </article>
  ```

- **`<aside>`**: Defines side content, like sidebars, related links, or ads.

  ```html
  <aside>
    <p>Related Articles</p>
  </aside>
  ```

- **`<footer>`**: Defines the footer section, usually containing copyright information, social links, or contact info.
  ```html
  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
  ```

#### **Content Tags**

- **`<main>`**: Specifies the main content area, which should be unique to the page.

  ```html
  <main>
    <h2>Welcome to Our Site</h2>
    <p>Main content here...</p>
  </main>
  ```

- **`<h1>` to `<h6>`**: Heading tags define titles, with `<h1>` being the most important and `<h6>` the least.

  ```html
  <h1>Main Title</h1>
  <h2>Subheading</h2>
  ```

- **`<p>`**: Defines a paragraph.

  ```html
  <p>This is a paragraph of text.</p>
  ```

- **`<ul>`, `<ol>`, and `<li>`**: Lists – unordered (`<ul>`) and ordered (`<ol>`), with list items (`<li>`).

  ```html
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>

  <ol>
    <li>First</li>
    <li>Second</li>
  </ol>
  ```

- **`<blockquote>`**: Defines a block quote (for longer quoted text).

  ```html
  <blockquote>
    <p>Quote text here...</p>
  </blockquote>
  ```

- **`<figure>` and `<figcaption>`**: Used to group media elements with captions.
  ```html
  <figure>
    <img src="image.jpg" alt="Descriptive Text" />
    <figcaption>Caption for the image</figcaption>
  </figure>
  ```

#### **Inline Semantic Tags**

- **`<strong>`**: Denotes important text (usually bold).

  ```html
  <strong>Important Text</strong>
  ```

- **`<em>`**: Emphasized text (usually italic).

  ```html
  <em>Emphasized Text</em>
  ```

- **`<a>`**: Anchor tag for hyperlinks.

  ```html
  <a href="https://www.example.com">Visit Example</a>
  ```

- **`<span>`**: Generic inline container for text. Useful for styling specific parts of a text.
  ```html
  <p>This is a <span class="highlight">highlighted</span> word.</p>
  ```

#### **Media Tags**

- **`<img>`**: Embeds an image.

  ```html
  <img src="image.jpg" alt="Descriptive text" width="300" height="200" />
  ```

- **`<audio>`**: Embeds sound content.

  ```html
  <audio controls>
    <source src="audio.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
  ```

- **`<video>`**: Embeds video content.
  ```html
  <video width="320" height="240" controls>
    <source src="movie.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  ```

#### **Form Tags**

- **`<form>`**: Creates a form for user input. The `action` attribute specifies where the form data is sent when submitted.

  ```html
  <form action="/submit-form" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" />
    <input type="submit" value="Submit" />
  </form>
  ```

- **`<input>`**: Defines an input field (text, checkbox, radio, etc.).

  ```html
  <input type="text" name="username" />
  <input type="checkbox" name="subscribe" value="yes" /> Subscribe
  ```

- **`<label>`**: Provides a label for form elements.

  ```html
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" />
  ```

- **`<textarea>`**: Allows users to enter multiple lines of text.

  ```html
  <textarea rows="4" cols="50"></textarea>
  ```

- **`<select>` and `<option>`**: Defines a dropdown list.
  ```html
  <select name="cars">
    <option value="volvo">Volvo</option>
    <option value="audi">Audi</option>
  </select>
  ```

---

### **Non-Semantic Tags**

Non-semantic tags do not convey any meaning about the content they contain.

- **`<div>`**: A block-level container with no specific meaning. It is often used for styling or layout.

  ```html
  <div class="container">
    <p>Content inside a div.</p>
  </div>
  ```

- **`<span>`**: An inline container with no specific meaning. It is often used to apply styles to a small part of the content.
  ```html
  <p>This is a <span class="highlight">highlighted</span> word.</p>
  ```

---

### **Special Characters in HTML**

You can use **HTML entities** to display special characters:

- **`&lt;`**: `<` (less-than)
- **`&gt;`**: `>` (greater-than)
- **`&amp;`**: `&` (ampersand)
- **`&quot;`**: `"` (double quote)
- **`&apos;`**: `'` (single quote)

---

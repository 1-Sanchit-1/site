
# 📘 Next.js Documentation 

---

## 📍 **Introduction to Next.js**

* **What is Next.js?**
  A React-based framework for building **full-stack** and **production-grade** web applications with server-side rendering (SSR), static site generation (SSG), and API routes.

* **Key Features**

  * File-based routing
  * Hybrid SSR + SSG support
  * API routes (backend support)
  * Built-in CSS & Sass support
  * Image Optimization
  * Fast refresh & hot reloading
  * TypeScript support out of the box

---

## 🚀 **Getting Started**

### Installation

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

> App runs on `http://localhost:3000`

### Project Structure

```
my-app/
├── pages/
│   ├── index.js
│   ├── about.js
│   ├── api/
├── public/
├── styles/
├── next.config.js
├── package.json
```

---

## 📂 **Routing (Pages)**

* **Pages = Routes** (`pages/index.js → /`)
* Dynamic Routes:
  `/pages/post/[id].js → /post/1`

```js
// pages/post/[id].js
import { useRouter } from 'next/router';
export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  return <p>Post: {id}</p>;
}
```

* **Catch-all Routes**
  `[...slug].js → /a/b/c`

---

## 🛠️ **Pre-rendering**

### Static Generation (SSG)

```js
export async function getStaticProps() {
  return { props: { data: 'Hello World' } };
}
```

### Static Generation with Paths

```js
export async function getStaticPaths() {
  return { paths: [{ params: { id: '1' } }], fallback: false };
}
```

### Server-Side Rendering (SSR)

```js
export async function getServerSideProps() {
  return { props: { data: 'SSR Data' } };
}
```

---

## 🖼️ **Image Optimization**

```js
import Image from 'next/image';

<Image src="/me.png" alt="Me" width={500} height={500} />
```

---

## ✨ **CSS and Styling**

* **Global CSS** — `pages/_app.js`

```js
import '../styles/global.css';
```

* **CSS Modules**

```js
import styles from './Home.module.css';
<p className={styles.title}>Hello</p>
```

* **Sass Support**
  Install Sass → `npm install sass`

---

## ⚙️ **API Routes (Backend Support)**

```js
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello API' });
}
```

---

## 🔌 **Environment Variables**

* `.env.local`

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

* Usage:
  `process.env.NEXT_PUBLIC_API_URL`

---

## 🔄 **Data Fetching with SWR**

```bash
npm install swr
```

```js
import useSWR from 'swr';
const fetcher = url => fetch(url).then(res => res.json());
const { data, error } = useSWR('/api/user', fetcher);
```

---

## 📈 **Deployment**

* **Vercel (Recommended)**
  `npx vercel`

* **Custom Server Deployment**

  ```bash
  npm run build
  npm start
  ```

---

## 🧩 **Advanced Concepts**

### Custom `_app.js`

```js
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Custom `_document.js` (HTML structure)

```js
import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

## 📜 **API Middleware (Advanced)**

```js
export default function handler(req, res) {
  if (req.method === 'POST') {
    res.status(200).json({ message: 'POST Success' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
```

---

## ⚡ **Middleware (Edge Functions)**

```js
// middleware.ts
import { NextResponse } from 'next/server';
export function middleware(request) {
  return NextResponse.redirect(new URL('/login', request.url));
}
```

---

## 🛠️ **next.config.js (Configuration)**

```js
module.exports = {
  images: { domains: ['example.com'] },
  reactStrictMode: true,
};
```

---

## 🧹 **Incremental Static Regeneration (ISR)**

```js
export async function getStaticProps() {
  return {
    props: { data: 'Hello ISR' },
    revalidate: 10, // Regenerate page every 10 seconds
  };
}
```

---

## 🔥 **API Authentication (with NextAuth)**

```bash
npm install next-auth
```

```js
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
export default NextAuth({ providers: [] });
```

---

## 📦 **TypeScript Support**

```bash
touch tsconfig.json
npm run dev
```

* Files become `.tsx`, `.ts`
* Types auto-generated

---

## 🏆 **Best Practices**

* Use **ISR** for dynamic + fast updates
* Prefer **CSS Modules** or **Tailwind CSS** for scalable styling
* Use **SWR** or **React Query** for client data fetching
* Host on **Vercel** for built-in optimizations
* Use **API Routes** for lightweight backend tasks

---

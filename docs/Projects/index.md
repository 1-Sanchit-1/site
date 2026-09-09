---
lastUpdated: true

prev:
  text: "← Back to Education"
  link: "/Education/index"

next:
  text: "Learnings →"
  link: "/Learning/index"
---

# ✍️ **Projects Portfolio**

---

::: danger ✍️ **Project Philosophy**
"Every project is an opportunity to learn, figure out problems, invent, and reinvent."
:::

---

## 🚀 **Self-Hosted GPU Inference Platform**

💻 **[Code Repository](https://github.com/1-Sanchit-1/AI-inference)**

**Tech Stack:**
`vLLM` | `Kubernetes (MicroK8s)` | `FastAPI` | `Qdrant` | `Docker` | `Prometheus` | `Grafana` | `Ollama`

**Objective:**
A self-hosted, GPU-accelerated AI platform deployed entirely from versioned Kubernetes manifests on
a single NVIDIA GPU node. Serves an OpenAI-compatible LLM endpoint via vLLM, alongside Open WebUI
and a FastAPI retrieval-augmented generation service backed by Qdrant vector search.

The ingest pipeline chunks and embeds text, PDF, DOCX and image uploads, falling back to OCR via
Tesseract when a PDF's text layer is missing or too sparse, with page caps that fail fast instead of
exhausting host memory. Ships a full observability stack (Prometheus, Grafana, Loki, Tempo,
OpenTelemetry) and a CPU-only Docker Compose path using Ollama, so the whole system also runs on a
laptop with no GPU. Deployment is driven by 20 numbered, idempotent shell phases plus a runbook: a
clean Ubuntu host reaches a working platform in one command.

---

## 🔗 **Distributed URL Shortener**

💻 **[Code Repository](https://github.com/1-Sanchit-1/url-shortener)**

**Tech Stack:**
`Python` | `FastAPI` | `PostgreSQL` | `Redis`

**Objective:**
A high-throughput redirection service with custom aliases, click analytics, authentication and rate
limiting, holding sub-100ms latency under load testing. Designed the schema, indexing and cache
strategy for high-volume concurrent reads, then profiled and removed the query bottlenecks that
appeared under contention.

---

## 🌐 **Campus Connect**

🔗 **[Live ](https://campus-connect-client-one.vercel.app/)**  
💻 **[Code Repository](https://github.com/1-Sanchit-1?tab=repositories)**

**Tech Stack:**  
`MERN Stack` (MongoDB, Express.js, React, Node.js)

**Objective:**  
Developed a Campus Connect web portal using MERN stack. It includes user authentication, admission form submissions, and admin management. Improved user experience with React and ensured efficient data management using MongoDB.

---

## 🌾 **AgroSmart**

💻 **[App Code](https://github.com/1-Sanchit-1/AgroSmart)**

**Tech Stack:**  
`Django` | `Python` | `Machine Learning` | `HTML` | `CSS` | `JavaScript`

**Objective:**  
Consolidated soil nutrient analysis, rainfall data, crop recommendations, and yield predictions using machine learning. The app helps farmers make informed decisions on crop selection and yield forecasts.

**Features:**

- Soil analysis
- Rainfall insights
- Crop recommendations
- Virtual Market for organic products
- Secure logout

---

## 🧘‍♂️ **The Yoga Instructor**

💻 **[Code Repository](https://github.com/1-Sanchit-1/yoga_mentor)**

**Tech Stack:**  
`Numpy` | `Matplotlib` | `OpenCV`

**Objective:**  
Implemented a pre-trained deep learning model to estimate body poses in real-time and predict yoga asanas. The system helps guide users in performing correct yoga poses by detecting and measuring angles.

---

## 🤖 **LLAMA_Chatbot (Finderr)**

💻 **[App Code](https://github.com/1-Sanchit-1/LLAMA_Chatbot/tree/master)**

**Tech Stack:**  
`Python` | `GPT 3.5` | `JavaScript` | `HTML` | `CSS` | `Llama-Index` | `Django`

**Objective:**  
Finderr employs the LlamaIndex and RAG (Retrieval Augmented Generation) to enrich its responses with custom data sources. The chatbot assists users in finding college-related information, improving user interaction with swift, accurate responses.

---

## ✍️ **Blogs Site**

💻 **[App Code](https://github.com/1-Sanchit-1/Blogs)**

**Tech Stack:**  
`Python` | `Django` | `Bootstrap` | `SQLite`

**Objective:**  
A web application that allows users to create, publish, and manage blog posts. It offers a user-friendly interface for both administrators and visitors to interact with the blog content.

---

## 🎮 **Games Info App**

💻 **[App Code](https://github.com/1-Sanchit-1/Appophilia)**

**Tech Stack:**  
`Flutter` | `Dart` | `API` | `Firebase`

**Objective:**  
API integration for authentication and UI design. This application provides a platform for users to browse PC games and read reviews.

---

**_Keep Exploring More Projects_** ✨

---

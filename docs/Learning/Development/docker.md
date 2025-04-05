#### **1. What is Docker?**

Docker is a platform to develop, ship, and run applications inside lightweight **containers**. It ensures consistency across different environments.

#### **2. Key Concepts**

- **Image** → A blueprint for containers (e.g., `ubuntu`, `nginx`).
- **Container** → A running instance of an image.
- **Dockerfile** → A script to automate image creation.
- **Registry** → A storage for images (e.g., Docker Hub).
- **Volume** → Persistent storage for containers.
- **Network** → Communication between containers.

#### **3. Essential Commands**

🔹 **Check Docker version:**

```bash
docker --version
```

🔹 **List running containers:**

```bash
docker ps
```

🔹 **List all containers (including stopped):**

```bash
docker ps -a
```

🔹 **Stop a container:**

```bash
docker stop <container_id>
```

🔹 **Start a container:**

```bash
docker start <container_id>
```

🔹 **Restart a container:**

```bash
docker restart <container_id>
```

🔹 **Remove a container:**

```bash
docker rm <container_id>
```

🔹 **Pull an image:**

```bash
docker pull <image_name>
```

🔹 **Run a container:**

```bash
docker run -d --name <name> -p <host_port>:<container_port> <image>
```

🔹 **Remove an image:**

```bash
docker rmi <image_id>
```

🔹 **Check logs:**

```bash
docker logs <container_id>
```

🔹 **Exec into a running container:**

```bash
docker exec -it <container_id> bash
```

#### **4. Docker Compose**

- Used to manage multi-container applications using `docker-compose.yml`.
- **Start services:**
  ```bash
  docker-compose up -d
  ```
- **Stop services:**
  ```bash
  docker-compose down
  ```

#### **5. Dockerfile Example**

```dockerfile
FROM python:3.9
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

#### **6. Common Issues & Fixes**

✅ **"Cannot connect to Docker daemon"** → Start Docker:

```bash
sudo systemctl start docker
```

## ✅ **"Port already in use"** → Use a different port or stop conflicting service.

## 🧱 **1. Image = Blueprint**

A **Docker image** is like a blueprint or recipe for creating containers.

### 👉 How to Create (or Pull) an Image:

```bash
docker pull ubuntu
```

⬆️ This downloads the **Ubuntu** image from Docker Hub.

You can also **create your own image** using a `Dockerfile` (we’ll come to that later).

---

## 📦 **2. Container = Running App**

A **container** is like a running machine built from the image.

### 👉 How to Create and Run a Container:

```bash
docker run -it ubuntu
```

This will:

- Use the `ubuntu` image
- Start an interactive shell (`-it`)
- Put you inside the Ubuntu container

Now you’re inside the container’s terminal! Type `exit` to come back out.

### 👉 Run a container in background:

```bash
docker run -d ubuntu sleep 9999
```

### 👉 List containers:

```bash
docker ps -a
```

---

## 📸 **3. Create Your Own Image**

Use a **Dockerfile** to define an image:

### 🔧 Example: Dockerfile

```Dockerfile
# Use Ubuntu as base
FROM ubuntu

# Install curl
RUN apt update && apt install -y curl

# Default command
CMD ["bash"]
```

### 👉 Build your image:

```bash
docker build -t myubuntu .
```

Now check your image:

```bash
docker images
```

---

## 💾 **4. Volume = Data Storage**

Volumes let you **store data** outside the container so it won’t be lost when the container stops.

### 👉 Create a volume:

```bash
docker volume create myvolume
```

### 👉 Use volume in a container:

```bash
docker run -it -v myvolume:/data ubuntu
```

This mounts the volume `myvolume` to `/data` inside the container.

Now any file saved in `/data` will persist even after the container is deleted.

---

## Useful Commands

```bash
docker ps -a            # List all containers
docker images           # List all images
docker volume ls        # List all volumes
docker rm <container>   # Remove container
docker rmi <image>      # Remove image
docker volume rm <vol>  # Remove volume
```

---

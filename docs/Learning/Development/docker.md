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

✅ **"Port already in use"** → Use a different port or stop conflicting service.

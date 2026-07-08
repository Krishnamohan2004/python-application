# Vcube Secure Video Engine - Dockerized Application

This is the containerized version of the Vcube Secure Video Engine, featuring a React frontend (built using Vite) and a Python backend (built using Flask and served via Waitress).

## Prerequisites

- **Docker** installed on your system.
- **Docker Compose** installed on your system.

---

## Getting Started

### 1. Build and Run the Container

To build the Docker image and start the application in the background (detached mode), run:

```bash
docker compose up --build -d
```

This command will:
1. Spin up a build stage with Node.js to install NPM dependencies and build the React frontend application into static assets.
2. Build the final Python container, copying all application files, including the prebuilt frontend assets.
3. Start the Flask app using Waitress on port `5000`.

### 2. Access the Application

Open your browser and navigate to:
[http://localhost:5000](http://localhost:5000)

- **Admin Page**: `/admin` (Master password: `vcube_admin2026`)
- **Student Login Page**: `/student-login`

---

## Directory Mounts & Persistence

The `docker-compose.yml` mounts the following files from your host system into the container to ensure persistence:
- `students.json`: Student credentials registry.
- `videos.json`: Video library metadata.
- `placements/`: Placement images.

Any updates made to students or videos from the admin panel will write directly to these JSON files on your host machine and persist across container restarts.

---

## Useful Commands

### Check Logs
To view live logs from the containerized application:
```bash
docker compose logs -f
```

### Stop the Server
To stop the running application container:
```bash
docker compose down
```

### Restart the Server
To restart the application:
```bash
docker compose restart
```

# Docker Setup for IMDB Project Frontend

This project is containerized using Docker to ensure consistent development environments across different machines.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Quick Start

### Development Mode (with hot reload)

1. **Build and start the development container:**
   ```bash
   docker-compose up frontend-dev
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000

3. **Stop the container:**
   - Press `Ctrl+C` in the terminal
   - Or run: `docker-compose down`

### Production Mode (optimized build)

1. **Build and start the production container:**
   ```bash
   docker-compose --profile production up frontend-prod
   ```

2. **Access the application:**
   - Frontend: http://localhost:8080

## Environment Variables

The application requires environment variables to connect to the backend API.

### Option 1: Using .env file (Recommended for local)

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set your backend URL:
   ```
   REACT_APP_API_HOST=localhost:3001
   ```

### Option 2: Docker Compose environment (Already configured)

The `docker-compose.yml` automatically sets:
```yaml
environment:
  - REACT_APP_API_HOST=host.docker.internal:3001
```

**Note:** `host.docker.internal` allows the Docker container to connect to services running on your host machine (like your backend on port 3001).

## Docker Commands Reference

### Build the image
```bash
# Development
docker-compose build frontend-dev

# Production
docker-compose build frontend-prod
```

### Start containers
```bash
# Development (with logs)
docker-compose up frontend-dev

# Development (detached/background)
docker-compose up -d frontend-dev

# Production
docker-compose --profile production up frontend-prod
```

### Stop containers
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f frontend-dev
```

### Rebuild and restart (when dependencies change)
```bash
docker-compose up --build frontend-dev
```

### Remove all containers and volumes
```bash
docker-compose down -v
```

### Execute commands inside container
```bash
docker-compose exec frontend-dev sh
```

## How It Works

### Development Mode
- Uses Node 18 Alpine image
- Mounts your source code for hot reload
- Runs `npm start` on port 3000
- Changes to `src/` and `public/` reflect immediately

### Production Mode
- Multi-stage build process:
  1. Builds optimized React bundle with `npm run build`
  2. Serves static files using Nginx
- Smaller image size
- Better performance
- Runs on port 80 (mapped to 8080 on host)

## Connecting to Backend

### Backend running locally (not in Docker)
Use in docker-compose.yml:
```yaml
environment:
  - REACT_APP_API_HOST=host.docker.internal:3001
```

### Backend running in Docker
Update docker-compose.yml to use service name:
```yaml
environment:
  - REACT_APP_API_HOST=backend:3001
```

## Troubleshooting

### Port already in use
If port 3000 or 8080 is already in use, change the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Maps host port 3001 to container port 3000
```

### Changes not reflecting
1. Ensure volumes are mounted correctly in docker-compose.yml
2. Try: `docker-compose up --build frontend-dev`
3. Check that `CHOKIDAR_USEPOLLING=true` is set

### Cannot connect to backend
1. Verify backend is running on port 3001
2. Check `REACT_APP_API_HOST` environment variable
3. Use `host.docker.internal:3001` for backend on host machine
4. Check browser console for CORS errors

### npm install fails
This is handled automatically with `--legacy-peer-deps` flag in Dockerfile to resolve the react-elastic-carousel peer dependency issue.

## Node Version

This Docker setup uses **Node 18** (specified in Dockerfile) to ensure consistency across all development machines, eliminating "works on my machine" issues.

## Next Steps

- Add backend to Docker Compose (optional)
- Configure Nginx for custom routing (production)
- Add health checks
- Implement multi-environment configurations

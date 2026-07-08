# Stage 1: Build the React frontend
FROM node:20-alpine AS build-stage
WORKDIR /app/client

# Copy package files
COPY client/package*.json ./

# Install packages
RUN npm ci

# Copy the client application code
COPY client/ ./

# Build the frontend application
RUN npm run build

# Stage 2: Run the Flask backend and serve the application
FROM python:3.11-slim
WORKDIR /app

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy all other backend files and static files
COPY . .

# Overwrite /app/client/dist with the freshly built assets from build-stage
COPY --from=build-stage /app/client/dist ./client/dist

# Expose Waitress server port
EXPOSE 5000

# Set python environment variables
ENV PYTHONUNBUFFERED=1

# Execute server
CMD ["python", "server_react.py"]

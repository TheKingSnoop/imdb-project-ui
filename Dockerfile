# Multi-stage Dockerfile for React Frontend

# Development stage
FROM node:18-alpine AS development

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies with legacy peer deps to handle react-elastic-carousel
RUN npm install --legacy-peer-deps

# Copy the entire application (public, src, etc.)
COPY . .

# Expose port 3000 for React dev server
EXPOSE 3000

# Start development server
CMD ["npm", "start"]

# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config (optional, using default for now)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

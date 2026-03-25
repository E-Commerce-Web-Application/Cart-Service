# Base image
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies stage
FROM base AS deps

# Copy only package files (for caching)
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci 

# Build stage (if you ever need transpiling, etc.)
FROM base AS build

COPY . .

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package.json (needed for metadata)
COPY package*.json ./

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy only necessary source files
COPY src ./src
COPY app/generated ./app/generated
COPY grpc_server.js ./
COPY server.js ./
COPY start.js ./
COPY cartHandler.js ./

# Expose ports
EXPOSE 50052 8001

# Run app
CMD ["node", "start.js"]
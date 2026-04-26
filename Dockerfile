# Base image
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies stage
FROM base AS deps

# Copy only package files (for caching)
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package.json (needed for metadata)
COPY package*.json ./

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy pre-generated gRPC files
COPY app/generated ./app/generated

# Copy only necessary source files
COPY src ./src
COPY grpc_server.js ./
COPY server.js ./
COPY start.js ./
COPY cartHandler.js ./

# Expose ports (REST: 8003, gRPC: 50053)
EXPOSE 8003 50053

# Run app
CMD ["node", "start.js"]
# Use official Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose the port your app uses
# Change this if your gRPC server uses a different port
EXPOSE 50051

# Start the app
CMD ["node", "grpc_server.js"]
# Use Node.js as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with clean npm cache to reduce image size
RUN npm ci --silent \
  && npm cache clean --force

# Copy the rest of the application code
COPY . .
# Set NODE_ENV before build
ENV NODE_ENV=development
# Skip TypeScript checks and build directly with Vite
RUN npx vite build

# Install serve to run the application
RUN npm install -g serve


# Expose port 5173
EXPOSE 5173

# Start the application using serve
CMD ["serve", "-s", "dist", "-l", "5173"]
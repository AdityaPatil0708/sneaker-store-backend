# Use Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy rest of the application
COPY . .

# Expose app port (change if your app uses a different port)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]

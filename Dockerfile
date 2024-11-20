# Use an official Node.js image as the base
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy files from the host to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the ports
EXPOSE 3000
EXPOSE 5555

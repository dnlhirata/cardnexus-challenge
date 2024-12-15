# Use an official Node.js image as the base
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Expose the application's default port (if applicable)
EXPOSE 3000

# Define the default command to run the application
CMD ["npm", "start"]

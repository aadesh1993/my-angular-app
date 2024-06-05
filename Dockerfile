# Use an official Node runtime as a parent image
FROM node:18.19-alpine

# Set the working directory
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 4200
EXPOSE 4200

# Serve the application
CMD ["ng", "serve", "--host", "0.0.0.0"]

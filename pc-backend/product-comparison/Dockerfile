# Step 1: Use an official Node.js image as the base image
FROM node:16 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY pc-backend/product-comparison/package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the backend files into the container
COPY pc-backend/product-comparison ./

# Step 6: Build the NestJS application
RUN npm run build

# Step 7: Expose the backend API port (you can adjust the port number as needed)
EXPOSE 3003

# Step 8: Start the application
CMD ["npm", "run", "start:prod"]
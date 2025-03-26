# Step 1: Use an official Node.js image as the base image for building the Angular app
FROM node:16 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY frontend/package*.json ./

# Step 4: Install Angular CLI and other dependencies
RUN npm install -g @angular/cli
RUN npm install

# Step 5: Copy the rest of the frontend files into the container
COPY pc-frontend ./

# Step 6: Build the Angular app for production
RUN ng build --prod

# Step 7: Use a lightweight web server (like Nginx) to serve the built app
FROM nginx:alpine

# Step 8: Copy the Angular build output to Nginx's public directory
COPY --from=build /app/dist/product-comparison /usr/share/nginx/html

# Step 9: Expose the port for the web server
EXPOSE 80

# Step 10: Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

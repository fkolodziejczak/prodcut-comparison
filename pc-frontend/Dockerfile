FROM node:22 AS frontend-build

# Set working directory for the frontend
WORKDIR /pc-frontend

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the frontend code
COPY . .

# Build the Angular frontend in production mode
RUN ng build --configuration=production

FROM nginx:latest AS final-nginx

# Copy the built Angular frontend from the frontend build stage into Nginx's default directory
COPY --from=frontend-build /pc-frontend/dist/product-comparison/browser /usr/share/nginx/html

# Expose the port for both frontend (via Nginx) and backend (via Node.js)
EXPOSE 80

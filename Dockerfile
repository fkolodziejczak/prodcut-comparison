# ---- Backend Build Stage ----
FROM node:22 AS backend-build

# Set working directory for the backend
WORKDIR /pc-backend

# Copy package.json and package-lock.json first to install dependencies
COPY pc-backend/product-comparison/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application
COPY pc-backend/product-comparison/ .

# Build the NestJS app
RUN npm run build


# ---- Frontend Build Stage ----
FROM node:22 AS frontend-build

# Set working directory for the frontend
WORKDIR /pc-frontend

# Copy package.json and package-lock.json first to install dependencies
COPY pc-frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the frontend code
COPY pc-frontend .

# Build the Angular frontend in production mode
RUN ng build --configuration=production


# ---- Final Production Image (Both Frontend and Backend) ----
FROM node:22 AS final

# ---- Backend setup ----
# Set working directory for the backend
WORKDIR /pc-backend

# Copy the build output from the backend build stage
COPY --from=backend-build /pc-backend/dist /pc-backend/dist

# Copy the package.json and package-lock.json for production environment
COPY pc-backend/product-comparison/package*.json ./

# Install production dependencies for the backend
RUN npm install --only=production

# ---- Frontend setup ----
# Use Nginx to serve the frontend
FROM nginx:latest AS final-nginx

# Copy the built Angular frontend from the frontend build stage into Nginx's default directory
COPY --from=frontend-build /pc-frontend/dist/product-comparison/browser /usr/share/nginx/html

# Expose the port for both frontend (via Nginx) and backend (via Node.js)
EXPOSE 80
EXPOSE 3003

# Run both services (Frontend via Nginx and Backend via Node.js)
CMD ["node", "dist/main"]

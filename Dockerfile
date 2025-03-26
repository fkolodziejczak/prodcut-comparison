# Stage 1: Build Angular (Frontend)
FROM node:16 AS angular-build

WORKDIR /product-comparison

# Copy frontend package.json and install dependencies
COPY pc-frontend/package*.json ./pc-frontend/
WORKDIR /product-comparison/pc-frontend
RUN npm install

# Copy frontend source code and build the Angular app
COPY pc-frontend/ ./
RUN npm run build --prod

# Stage 2: Build NestJS (Backend)
FROM node:16 AS nestjs-build

WORKDIR /product-comparison

# Copy backend package.json and install dependencies
COPY pc-backend/product-comparison/package*.json ./pc-backend/product-comparison/
WORKDIR /product-comparison/pc-backend/product-comparison
RUN npm install

# Copy backend source code and build the NestJS app
COPY pc-backend/product-comparison/ ./
RUN npm run build

# Stage 3: Setup Final Image with Nginx for Angular + Node.js for NestJS
FROM nginx:alpine AS final

# Serve the Angular app using Nginx
COPY --from=angular-build /product-comparison/pc-frontend/dist/product-comparison /usr/share/nginx/html

# Install Node.js for the NestJS API
FROM node:16 AS nestjs-runtime

WORKDIR /product-comparison
COPY --from=nestjs-build /product-comparison/pc-backend/product0-comparison /product-comparison
WORKDIR /product-comparison
RUN npm install --production

# Expose backend and frontend ports
EXPOSE 80 3003

# Start both the Angular app and NestJS backend together
CMD ["sh", "-c", "npm run start:prod --prefix /product-comparison && nginx -g 'daemon off;'"]
# Stage 1: Build Angular (Frontend)
FROM node:16 AS angular-build

WORKDIR /app

# Copy frontend package.json and install dependencies
COPY pc-frontend/package*.json ./pc-frontend/
WORKDIR /app/pc-frontend
RUN npm install

# Copy frontend source code and build the Angular app
COPY pc-frontend/ ./
RUN npm run build --prod

# Stage 2: Build NestJS (Backend)
FROM node:16 AS nestjs-build

WORKDIR /app

# Copy backend package.json and install dependencies
COPY pc-backend/product-comparison/package*.json ./backend/
WORKDIR /app/pc-backend/product-comparison
RUN npm install

# Copy backend source code and build the NestJS app
COPY pc-backend/product-comparison/ ./
RUN npm run build

# Stage 3: Setup Final Image with Nginx for Angular + Node.js for NestJS
FROM nginx:alpine AS final

# Serve the Angular app using Nginx
COPY --from=angular-build /app/pc-frontend/dist/product-comparison /usr/share/nginx/html

# Install Node.js for the NestJS API
FROM node:16 AS nestjs-runtime

WORKDIR /app
COPY --from=nestjs-build /app/pc-backend/product0-comparison /app
WORKDIR /app
RUN npm install --production

# Expose backend and frontend ports
EXPOSE 80 3000

# Start both the Angular app and NestJS backend together
CMD ["sh", "-c", "npm run start:prod --prefix /app && nginx -g 'daemon off;'"]
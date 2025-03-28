# Use official Node.js image for NestJS
FROM node:22 AS build

# Set working directory for the backend
WORKDIR /pc-backend

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application
COPY . .

# Build the NestJS app
RUN npm run build

# Use official Node.js image as the base for the runtime container
FROM node:22

# Set working directory for the backend
WORKDIR /pc-backend

# Copy the build output from the build stage
COPY --from=build /pc-backend/dist /pc-backend/dist

# Copy the package.json and package-lock.json for the production environment
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Expose the port that the NestJS app will run on
EXPOSE 3000

# Run the NestJS app
CMD ["node", "dist/main"]
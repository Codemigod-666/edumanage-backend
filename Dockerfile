# # Stage 1: Build
# FROM node:20-alpine AS builder

# WORKDIR /app

# COPY package*.json ./

# # Install all dependencies including dev dependencies
# RUN npm install

# # Copy rest of the app (source code)
# COPY . .

# # Build TypeScript to dist/
# RUN npm run build

# # Stage 2: Production image
# FROM node:20-alpine AS production

# WORKDIR /app

# # Copy only package.json and install prod dependencies
# COPY package*.json ./
# RUN npm install --omit=dev

# # Copy built code from builder
# COPY --from=builder /app/dist ./dist

# # Copy any other needed folders (like public, assets, etc.)
# # COPY --from=builder /app/public ./public

# # Start the app
# CMD ["node", "dist/server.js"]

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine as production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/server.js"]

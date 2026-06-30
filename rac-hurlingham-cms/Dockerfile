# ─── Stage 1: Builder ──────────────────────────────────────────────
# Install ALL dependencies and build Strapi.
FROM node:22-slim AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

# Install dependencies first for better layer caching.
# .npmrc carries `legacy-peer-deps=true`; package.json carries the
# @strapi/* version `overrides` — both are honored by `npm ci`.
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# Copy source and build the admin panel + compile TS.
COPY . .
RUN npm run build

# ─── Stage 2: Runner ──────────────────────────────────────────────
# Slim production image — no compilers.
FROM node:22-slim AS runner

RUN apt-get update && apt-get install -y \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
WORKDIR /opt/app

# Manifest needed for the `start` script.
COPY package.json ./

# Copy node_modules from builder (same base image, native binaries are compatible)
COPY --from=builder /opt/app/node_modules ./node_modules

# Copy source and prebuilt artifacts from builder
COPY --from=builder /opt/app/tsconfig.json ./
COPY --from=builder /opt/app/src ./src
COPY --from=builder /opt/app/dist ./dist
COPY --from=builder /opt/app/public ./public

# Place the admin panel build where Strapi expects it at runtime
RUN mkdir -p node_modules/@strapi/admin/dist/server/server/build && \
    cp -r dist/build/* node_modules/@strapi/admin/dist/server/server/build/

EXPOSE 1337
CMD ["npm", "run", "start"]

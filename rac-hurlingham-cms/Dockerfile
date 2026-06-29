# ─── Stage 1: Builder ──────────────────────────────────────────────
# Install ALL dependencies (including devDependencies) and build Strapi.
FROM node:22-slim AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

COPY package.json yarn.lock ./
RUN yarn config set network-timeout 600000 -g && \
    yarn install --frozen-lockfile

COPY . .
RUN yarn build

# ─── Stage 2: Runner ──────────────────────────────────────────────
# Slim production image — no compilers, no devDependencies.
FROM node:22-slim AS runner

RUN apt-get update && apt-get install -y \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
WORKDIR /opt/app

# Copy dependency manifests and install production-only deps
COPY package.json yarn.lock ./
RUN yarn config set network-timeout 600000 -g && \
    yarn install --production --frozen-lockfile

# Copy source (needed for TS runtime resolution) and prebuilt artifacts from builder
COPY --from=builder /opt/app/tsconfig.json ./
COPY --from=builder /opt/app/src ./src
COPY --from=builder /opt/app/dist ./dist
COPY --from=builder /opt/app/public ./public

# Place the admin panel build where Strapi expects it at runtime
RUN mkdir -p node_modules/@strapi/admin/dist/server/server/build && \
    cp -r dist/build/* node_modules/@strapi/admin/dist/server/server/build/

EXPOSE 1337
CMD ["yarn", "start"]

# ─── Stage 1: Builder ──────────────────────────────────────────────
# Install ALL dependencies and build Strapi.
FROM node:22-slim AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

# Copy Yarn Berry config, release, and dependency manifests
COPY .yarnrc.yml .yarn package.json yarn.lock ./
COPY .yarn ./.yarn

COPY . .
RUN yarn install && yarn build

# ─── Stage 2: Runner ──────────────────────────────────────────────
# Slim production image — no compilers, no devDependencies.
FROM node:22-slim AS runner

RUN apt-get update && apt-get install -y \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
WORKDIR /opt/app

# Copy Yarn Berry config (needed for `yarn start`)
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json ./
COPY --from=builder /opt/app/yarn.lock ./yarn.lock

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
CMD ["yarn", "start"]

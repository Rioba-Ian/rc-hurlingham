# ─── Stage 1: Builder ──────────────────────────────────────────────
# Install ALL dependencies (including devDependencies) and build Strapi.
FROM node:22-slim AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

# Copy Yarn Berry config and release FIRST so `yarn install` uses v4
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock ./

RUN yarn install --immutable

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

# Copy Yarn Berry config so `yarn start` uses the correct version
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY package.json yarn.lock ./

RUN yarn workspaces focus --production

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

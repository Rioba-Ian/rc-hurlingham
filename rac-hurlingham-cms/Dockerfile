FROM node:22-slim

# Install runtime dependency for image processing (sharp)
RUN apt-get update && apt-get install -y \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
WORKDIR /opt/app

# Copy dependency manifests
COPY package.json yarn.lock ./

# Install production dependencies only (much faster, no devDependencies)
RUN yarn config set network-timeout 600000 -g && \
    yarn install --production --frozen-lockfile

# Copy the prebuilt folders and tsconfig.json from your local machine
COPY tsconfig.json ./
COPY dist ./dist
COPY public ./public

EXPOSE 1337

CMD ["yarn", "start"]


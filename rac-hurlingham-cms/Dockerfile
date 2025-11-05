FROM node:22-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm install --global node-gyp
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps
RUN npm run build -- --debug
EXPOSE 1337
CMD ["npm", "start"]

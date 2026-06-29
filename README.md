# RC Hurlingham

Website, CMS, Email marketing, Ecommerce

## Overview

The website features a cms using strapi, which allows for easy content management and customization. The client folder includes the necessary files for the website's frontend, such as HTML, CSS, and JavaScript.

### Installation

Ensure you have these installed

1. Node.js (>=20)
2. Yarn (>=1.22.17)
3. Docker (>=20.10.17)
4. Docker Compose (Optional)

## CMS Deployment Workflow

The CMS uses a **multi-stage Docker build**. The Dockerfile has two stages:

1. **Builder** — installs all dependencies (including devDependencies), compiles TypeScript, and builds the Strapi Admin Panel.
2. **Runner** — a slim production image that copies only the compiled output and installs production dependencies.

This means you **do not** need to run `yarn build` locally or commit the `dist/` directory. Just push your source code changes and the server handles the rest.

```bash
# Make your CMS changes, then simply:
git add .
git commit -m "feat: update cms schema"
git push
```

The server will automatically build and deploy.



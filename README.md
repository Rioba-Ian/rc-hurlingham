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

To prevent Out-Of-Memory (OOM) errors and speed up deployment on the server, **the CMS is served as a prebuilt application** inside Docker. This means the server does not compile TypeScript or bundle the Admin UI during deployment.

Whenever you make changes to the CMS (schema, configs, controllers, etc.), you **must** build the project locally and commit the `dist` folder before pushing:

### 1. Build the CMS locally
From the root of the project, run:
```bash
cd rac-hurlingham-cms
pnpm build # or yarn build
cd ..
```

### 2. Commit and Push the `dist` folder
Make sure the compiled `dist` folder is added and pushed to Git:
```bash
git add rac-hurlingham-cms/dist/
git commit -m "feat: update cms and rebuild dist"
git push
```

### 3. Server Rebuild
The server's Docker container will automatically rebuild using the prebuilt `dist` and `public` folders, resulting in a near-instant deployment without high memory/CPU overhead.


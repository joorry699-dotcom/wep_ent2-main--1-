# AdReach Estimator

Modern Next.js + TypeScript advertising reach estimator.

## What is included
- `app/page.tsx`: UI page with Arabic/English support and responsive design
- `app/api/estimate/route.ts`: concurrent multi-platform estimation endpoint
- `next.config.mjs`: rewrite rule for `/api/estimate/` to `/api/estimate`
- `vercel.json`: ready for Vercel deployment

## Local setup
```bash
cd "c:\Users\96653\Downloads\wep_ent2-main (1)\wep_ent2-main"
npm install
npm run build
npm run dev
```

Open `http://localhost:3004` if you start the dev server with `--port 3004`, or the default `http://localhost:3000`.

## Deployment (GitHub + Vercel)
1. Initialize Git if needed:
   ```bash
git init
git add .
git commit -m "Initial AdReach Estimator commit"
```
2. Create a GitHub repository and push:
   ```bash
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```
3. In Vercel:
   - Click **New Project**
   - Import your GitHub repository
   - Select the project and deploy

## Vercel notes
- The API route is available at `/api/estimate`
- A request to `/api/estimate/` is rewritten to `/api/estimate` by `next.config.mjs`
- If you get a Vercel `401` or `404`, check the project privacy and deploy status in Vercel dashboard.

## Useful commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm start` — start production server after build

## Important
Do not commit the `.next/`, `node_modules/`, or `.vercel/` folders. These are already ignored.

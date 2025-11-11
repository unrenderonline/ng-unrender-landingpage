# GitHub Pages Deployment Guide

## Static Site Generation (SSG) with CSR Hydration

This project uses **Static Site Generation** with **Client-Side Rendering (CSR) hydration** for optimal performance and SEO on GitHub Pages.

### Features
- ✅ Pre-rendered static HTML for all routes (SSG)
- ✅ Client-side hydration for dynamic interactivity
- ✅ No SSR or platform-server packages required
- ✅ GitHub Actions automatic deployment
- ✅ Works without baseHref configuration

## How It Works

1. **Build**: Angular builds the client application (`ng build --configuration production`)
2. **Prerender**: A Node.js script uses Playwright to visit each route and capture the fully-rendered HTML
3. **Deploy**: Static HTML files are deployed to GitHub Pages

### Routes Pre-rendered
- `/` (root)
- `/inicio`
- `/sobre`
- `/ecossistema`

All routes get static HTML files with full content for SEO and fast initial load, then the Angular app hydrates for interactivity.

## Deployment Methods

### Automatic Deployment (Recommended)

The GitHub Actions workflow automatically deploys to GitHub Pages on every push to `main`:

**Setup Steps:**
1. Go to your GitHub repository settings
2. Navigate to **Pages** section
3. Under **Source**, select **GitHub Actions**
4. Push your code to the `main` branch
5. The workflow will automatically:
   - Install dependencies
   - Install Playwright browsers
   - Build the Angular app
   - Prerender all routes to static HTML
   - Deploy to GitHub Pages

### Manual Build & Deploy

```bash
# Install dependencies (first time only)
npm install

# Build and prerender all routes
npm run build:ssg

# Or use the GitHub Pages specific command
npm run build:gh-pages
```

## Build Scripts

- `npm run build` - Standard production build (client only)
- `npm run build:ssg` - Build + prerender all routes (SSG)
- `npm run build:gh-pages` - Same as build:ssg (GitHub Pages optimized)
- `npm run deploy:gh-pages` - Build, prerender, and deploy to GitHub Pages

## Testing Locally

To test the production build locally:

```bash
# Build for production
npm run build:gh-pages

# Serve the dist folder (you can use any static server)
npx http-server dist/ng-unrender-landing-page/browser -p 8080
```

Then open `http://localhost:8080` in your browser.

## Important Notes

1. **No Hash Routing**: The app uses standard Angular routing (no hash) for clean URLs
2. **No baseHref needed**: Routes work at root level on GitHub Pages
3. **404.html**: Handles client-side routing on GitHub Pages (SPA fallback)
4. **.nojekyll file**: Prevents GitHub Pages from processing files through Jekyll
5. **SSG + CSR Hydration**: Each route has pre-rendered HTML that hydrates on load for full interactivity

## Troubleshooting

### If deployment fails:
1. Check GitHub Actions logs in the **Actions** tab
2. Ensure GitHub Pages is enabled in repository settings
3. Verify the workflow has proper permissions

### If routes don't work:
1. Verify all routes are listed in `scripts/prerender.js`
2. Check that the 404.html redirect script is in place
3. Clear browser cache and try again
4. Ensure the build completed successfully (check for errors in the prerender step)

## File Structure

```
.github/
  workflows/
    deploy-gh-pages.yml  # GitHub Actions workflow
public/
  .nojekyll              # Prevents Jekyll processing
  404.html               # SPA fallback for client-side routing
scripts/
  prerender.js           # SSG prerender script (uses Playwright)
dist/
  ng-unrender-landing-page/
    browser/
      index.html         # Root route (pre-rendered)
      inicio/
        index.html       # /inicio route (pre-rendered)
      sobre/
        index.html       # /sobre route (pre-rendered)
      ecossistema/
        index.html       # /ecossistema route (pre-rendered)
```

## GitHub Pages URL

After deployment, your site will be available at:
`https://<username>.github.io/<repository-name>/`

For this repository:
`https://unrenderonline.github.io/ng-unrender-landingpage/`

# GitHub Pages Deployment Guide

## Static Site Generation Setup

This project is configured for static site generation and deployment to GitHub Pages without using `baseHref` (since hash routing is enabled).

### Features
- ✅ Static prerendering enabled
- ✅ No SSR or platform-server packages required
- ✅ Hash routing for GitHub Pages compatibility
- ✅ GitHub Actions automatic deployment
- ✅ No baseHref configuration needed

## Build Configuration

The project uses Angular's built-in prerendering capabilities:

- **Prerendering**: Enabled (`prerender: true`)
- **SSR**: Disabled (`ssr: false`)
- **Output**: `dist/ng-unrender-landing-page/browser`

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the `main` branch.

**Setup Steps:**
1. Go to your GitHub repository settings
2. Navigate to **Pages** section
3. Under **Source**, select **GitHub Actions**
4. Push your code to the `main` branch
5. The workflow will automatically build and deploy

### Method 2: Manual Deployment

Build and deploy manually using npm scripts:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Deploy to GitHub Pages (optional - if you want manual deployment)
npm run deploy:gh-pages
```

## Build Scripts

- `npm run build` - Standard production build
- `npm run build:gh-pages` - Build optimized for GitHub Pages deployment
- `npm run deploy:gh-pages` - Build and deploy to GitHub Pages manually

## Routes That Will Be Pre-rendered

The following routes are automatically pre-rendered as static HTML:

- `/` (redirects to `/#/inicio`)
- `/#/inicio`
- `/#/sobre`
- `/#/ecossistema`

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

1. **Hash Routing**: The app uses hash routing (`useHash: true`), which works perfectly with GitHub Pages without any baseHref configuration
2. **No baseHref needed**: Since hash routing is used, you don't need to configure baseHref
3. **.nojekyll file**: Included to prevent GitHub Pages from processing files through Jekyll
4. **Clean URLs**: While hash routing adds `#` to URLs, it ensures all routes work correctly on GitHub Pages

## Troubleshooting

### If deployment fails:
1. Check GitHub Actions logs in the **Actions** tab
2. Ensure GitHub Pages is enabled in repository settings
3. Verify the workflow has proper permissions

### If routes don't work:
1. Verify hash routing is enabled in `app-routing-module.ts`
2. Check that all routes are properly defined
3. Clear browser cache and try again

## File Structure

```
.github/
  workflows/
    deploy-gh-pages.yml  # GitHub Actions workflow
public/
  .nojekyll              # Prevents Jekyll processing
dist/
  ng-unrender-landing-page/
    browser/             # Deployed to GitHub Pages
```

## GitHub Pages URL

After deployment, your site will be available at:
`https://<username>.github.io/<repository-name>/`

For this repository:
`https://unrenderonline.github.io/ng-unrender-landingpage/`

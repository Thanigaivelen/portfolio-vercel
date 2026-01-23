# Vercel Deployment Guide

This guide will help you deploy your 3D Portfolio to Vercel.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account
- A Vercel account (sign up at [vercel.com](https://vercel.com))

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to a Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import your project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect Nuxt.js

3. **Configure build settings** (usually auto-detected)
   - **Framework Preset:** Nuxt.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.output` (auto-detected)
   - **Install Command:** `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd 3D-Portfolio
   vercel
   ```

4. **For production deployment**
   ```bash
   vercel --prod
   ```

## Configuration Files

The project includes:
- `vercel.json` - Vercel configuration with caching headers for static assets
- `.vercelignore` - Files to exclude from deployment
- `nuxt.config.ts` - Configured with Vercel preset

## Environment Variables

If you need to add environment variables:
1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy

## Troubleshooting

### Build Errors

- **Error: Module not found**
  - Run `npm install` locally to ensure all dependencies are in `package.json`
  - Check that `node_modules` is in `.gitignore`

- **Error: Build timeout**
  - Check your build logs in Vercel dashboard
  - Ensure large files are in `public/` directory, not in source code

### Audio/Image Files Not Loading

- Ensure all files in `public/sounds/` and `public/images/` are committed to git
- Check file paths are correct (case-sensitive on some systems)
- Verify MIME types in `layouts/default.vue` match your file formats

### 3D Models Not Loading

- Ensure GLTF files are in `public/models/` directory
- Check browser console for CORS or loading errors
- Verify file paths in your Three.js scene code

## Post-Deployment

After deployment:
1. Test all navigation links
2. Verify audio playback works
3. Check 3D scene loads correctly
4. Test on mobile devices
5. Check performance in Vercel Analytics

## Custom Domain

To add a custom domain:
1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your domain
4. Follow DNS configuration instructions

## Performance Optimization

The project is configured with:
- Static asset caching (1 year for images, sounds, models)
- Nuxt.js optimizations
- Vercel Edge Network for fast global delivery

---

For more help, visit [Vercel Documentation](https://vercel.com/docs)

# Frontend Deployment Guide

This guide covers deploying the Grimdarkly frontend to Render as a Static Site.

## 🚀 Render Static Site Setup

### 1. Create Static Site in Render

1. **Go to Render Dashboard** → **New** → **Static Site**
2. **Connect Repository**: Select your GitHub repository
3. **Configure Settings**:
   - **Name**: `grimdarkly-frontend`
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: `18` (optional, but recommended)

### 2. Environment Variables

Set these in the Render dashboard under **Environment**:

```bash
# API Configuration
VITE_API_URL=https://grimdarkly-backend.onrender.com/api
```

### 3. Build Configuration

The project includes a `render.yaml` file with optimized settings:

- **Security headers** for production
- **Cache control** for static assets
- **SPA routing** support (all routes → index.html)
- **Build optimization** with vendor chunking

## 🔧 Local Development

### Development Server
```bash
npm run dev
```
- Runs on `http://localhost:3001`
- Uses Vite proxy for API calls to `http://localhost:5001`

### Production Build
```bash
npm run build
```
- Outputs to `dist/` directory
- Optimized for production with code splitting
- Vendor libraries separated into chunks

## 📁 Build Output

The build process creates:
```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-*.css         # Styles
│   ├── index-*.js          # Main app code
│   └── vendor-*.js         # Third-party libraries
```

## 🌐 API Configuration

### Development
- Uses Vite proxy: `/api` → `http://localhost:5001`
- No environment variables needed

### Production
- Uses environment variable: `VITE_API_URL`
- Defaults to: `https://grimdarkly-backend.onrender.com/api`
- Can be overridden in Render dashboard

## 🔒 Security Headers

The deployment includes security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Cache-Control` for static assets

## 🚀 Deployment Process

1. **Push to GitHub** → Automatic deployment
2. **Build Process**:
   - Install dependencies (`npm ci`)
   - TypeScript compilation (`tsc`)
   - Vite build (`vite build`)
   - Deploy static files
3. **URL**: `https://grimdarkly-frontend.onrender.com`

## 🔄 Updates

- **Automatic**: Push to main branch triggers deployment
- **Manual**: Use Render dashboard to trigger rebuild
- **Environment**: Update `VITE_API_URL` if backend URL changes

## 🐛 Troubleshooting

### Build Failures
- Check Node.js version (18+ recommended)
- Verify all dependencies are in `package.json`
- Check TypeScript compilation errors

### API Connection Issues
- Verify `VITE_API_URL` environment variable
- Check backend is deployed and accessible
- Test API endpoints directly

### Routing Issues
- Ensure `render.yaml` includes SPA rewrite rules
- Check that all routes redirect to `index.html`

## 📊 Performance

- **Code Splitting**: Vendor libraries separated
- **Asset Optimization**: Gzip compression enabled
- **Caching**: Static assets cached for 1 year
- **CDN**: Global content delivery via Render

## 🔗 Related

- **Backend**: [grimdarkly-backend](../grimdarkly-backend/README.md)
- **API Documentation**: Backend README
- **Development**: See main project README

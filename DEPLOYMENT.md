# Deployment Guide

This guide covers deploying your portfolio to various platforms.

## Quick Deploy to Vercel (Recommended)

Vercel is the easiest option for Next.js deployments and offers excellent performance.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Environment Variables** (if needed)
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add any variables from `.env.example`

4. **Custom Domain** (optional)
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

**Deploy Time:** ~2 minutes ⚡

---

## Deploy to Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18+

2. **Deploy**
   ```bash
   npm install netlify-cli -g
   npm run build
   netlify deploy --prod
   ```

3. **Or use Netlify UI**
   - Go to [netlify.com](https://netlify.com)
   - "Add new site" → "Import from Git"
   - Select your repository
   - Configure build settings
   - Deploy

---

## Deploy with Docker

1. **Create Dockerfile**

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY portfolio .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

2. **Update next.config.js**

```javascript
const nextConfig = {
  output: 'standalone',
  // ... rest of config
}
```

3. **Build and Run**

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

---

## Deploy to AWS (EC2)

1. **Launch EC2 Instance**
   - Use Ubuntu 22.04 LTS
   - t2.micro is sufficient for most portfolios
   - Configure security group (allow port 80, 443)

2. **SSH into instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone and Setup**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   npm install
   npm run build
   ```

5. **Use PM2 for Process Management**
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx as Reverse Proxy**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/portfolio
   ```

   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable and restart:
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## Deploy to DigitalOcean App Platform

1. **Connect Repository**
   - Go to DigitalOcean → App Platform
   - Create new app
   - Connect GitHub repository

2. **Configure**
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Environment: Node.js

3. **Deploy**
   - Click "Deploy"
   - Auto-deploys on git push

---

## Deploy to Cloudflare Pages

1. **Connect Repository**
   - Go to Cloudflare Pages
   - "Create a project" → Connect Git

2. **Build Settings**
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Framework preset: Next.js

3. **Deploy**
   - Automatically deploys on push

---

## Performance Optimization Tips

### 1. Image Optimization
- Use Next.js Image component
- Compress images before upload
- Use WebP format when possible

### 2. Code Splitting
- Already handled by Next.js
- Use dynamic imports for heavy components

### 3. Caching
```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}
```

### 4. CDN
- Vercel automatically uses CDN
- For other platforms, consider Cloudflare CDN

### 5. Analytics
Add Google Analytics or Plausible:

```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Post-Deployment Checklist

- [ ] Test all pages and links
- [ ] Verify mobile responsiveness
- [ ] Check 3D animations performance
- [ ] Test contact form (if integrated)
- [ ] Verify social media links
- [ ] Test on different browsers
- [ ] Check SEO with Google Search Console
- [ ] Setup analytics
- [ ] Configure custom domain
- [ ] Setup SSL certificate
- [ ] Test page load speed (aim for <3s)
- [ ] Submit sitemap to search engines

---

## Troubleshooting

### Build Fails
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: Should be 18+

### 3D Animations Not Working
- Check browser console for WebGL errors
- Verify Three.js dependencies are installed
- Test on different browsers

### Slow Performance
- Enable production mode: `npm run build && npm start`
- Optimize images
- Check Network tab in DevTools
- Reduce 3D polygon count

### CSS Not Loading
- Verify Tailwind config
- Clear build cache
- Check postcss.config.js

---

## Monitoring

### Vercel Analytics
- Built-in with Vercel deployment
- Real-time performance monitoring

### Google PageSpeed Insights
- Test: https://pagespeed.web.dev/
- Aim for score >90

### Uptime Monitoring
- Use [UptimeRobot](https://uptimerobot.com) (free)
- Set up alerts for downtime

---

## Updating Your Portfolio

```bash
# Make changes locally
git add .
git commit -m "Update projects"
git push

# Vercel/Netlify automatically redeploys
# For manual deployments, SSH into server and:
git pull
npm install
npm run build
pm2 restart portfolio
```

---

## Support

Need help deploying? Check:
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- GitHub Issues

Good luck with your deployment! 🚀

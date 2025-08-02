# ROI Calculator Pro - Deployment Guide

This guide covers multiple deployment options for the ROI Calculator Pro application.

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Environment variables configured

## Environment Variables

Create a `.env` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/roi_calculator?schema=public"

# Authentication
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
JWT_SECRET="your-jwt-secret-key-here-change-in-production"

# App Configuration
APP_NAME="ROI Calculator Pro"
APP_URL="https://your-domain.com"

# Email (Optional)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
FROM_EMAIL=""
```

## Deployment Options

### 1. Vercel Deployment (Recommended)

Vercel provides the easiest deployment for Next.js applications.

#### Steps:

1. **Connect to Vercel:**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Configure Environment Variables:**
   - Go to your Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add all required environment variables

3. **Database Setup:**
   - Use Vercel Postgres, PlanetScale, or any PostgreSQL provider
   - Update `DATABASE_URL` in environment variables

4. **Deploy:**
   ```bash
   vercel --prod
   ```

#### Automatic Deployments:
- Push to main branch triggers automatic deployment
- GitHub Actions workflow included for CI/CD

### 2. Netlify Deployment

#### Steps:

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify login
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

3. **Configure Environment Variables:**
   - Go to Netlify dashboard
   - Site settings > Environment variables
   - Add all required variables

### 3. Docker Deployment

#### Local Docker:

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Or build manually:**
   ```bash
   docker build -t roi-calculator .
   docker run -p 3000:3000 --env-file .env roi-calculator
   ```

#### Production Docker:

1. **Build for production:**
   ```bash
   docker build -t roi-calculator:prod .
   ```

2. **Run with external database:**
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="your-production-db-url" \
     -e NEXTAUTH_SECRET="your-secret" \
     -e JWT_SECRET="your-jwt-secret" \
     roi-calculator:prod
   ```

### 4. Traditional VPS/Server Deployment

#### Steps:

1. **Install dependencies:**
   ```bash
   npm ci
   ```

2. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

3. **Run database migrations:**
   ```bash
   npx prisma db push
   ```

4. **Build application:**
   ```bash
   npm run build
   ```

5. **Start with PM2:**
   ```bash
   npm install -g pm2
   pm2 start npm -- start
   pm2 startup
   pm2 save
   ```

### 5. AWS/Azure/GCP Deployment

#### AWS (using Elastic Beanstalk):

1. **Install EB CLI:**
   ```bash
   pip install awsebcli
   ```

2. **Initialize and deploy:**
   ```bash
   eb init
   eb create production
   eb deploy
   ```

#### Azure (using App Service):

1. **Install Azure CLI:**
   ```bash
   az login
   ```

2. **Create and deploy:**
   ```bash
   az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name roi-calculator --runtime "NODE|18-lts"
   az webapp deployment source config --name roi-calculator --resource-group myResourceGroup --repo-url https://github.com/your-repo --branch main
   ```

## Database Setup

### PostgreSQL Setup:

1. **Local PostgreSQL:**
   ```bash
   # Install PostgreSQL
   # Create database
   createdb roi_calculator
   
   # Run migrations
   npx prisma db push
   ```

2. **Cloud PostgreSQL Options:**
   - **Vercel Postgres** (recommended for Vercel deployments)
   - **PlanetScale** (MySQL-compatible)
   - **Supabase** (PostgreSQL with additional features)
   - **Railway** (PostgreSQL with easy setup)
   - **AWS RDS** (managed PostgreSQL)

### Database Migration:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Or use migrations (recommended for production)
npx prisma migrate deploy
```

## SSL/HTTPS Setup

### Using Cloudflare:
1. Add your domain to Cloudflare
2. Enable SSL/TLS encryption
3. Update DNS records

### Using Let's Encrypt (for VPS):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Performance Optimization

### 1. Enable Compression:
```nginx
# Nginx configuration
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types
  application/javascript
  application/json
  text/css
  text/plain
  text/xml;
```

### 2. Cache Headers:
```nginx
# Static assets caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

### 3. CDN Setup:
- Use Vercel's built-in CDN
- Or configure CloudFlare CDN
- Or use AWS CloudFront

## Monitoring and Logging

### 1. Application Monitoring:
- **Vercel Analytics** (for Vercel deployments)
- **Google Analytics**
- **Plausible Analytics** (privacy-focused)

### 2. Error Tracking:
- **Sentry** (recommended)
- **LogRocket**
- **Bugsnag**

### 3. Uptime Monitoring:
- **UptimeRobot**
- **Pingdom**
- **StatusCake**

## Security Checklist

- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Database access restricted
- [ ] Regular backups enabled
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] Input validation in place

## Backup Strategy

### Database Backups:

1. **Automated backups:**
   ```bash
   # Daily backup script
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
   ```

2. **Cloud provider backups:**
   - Enable automatic backups on your cloud database provider
   - Set retention period (recommended: 30 days)

### File Backups:
- Application code is version controlled (Git)
- User uploads (if any) should be backed up separately

## Troubleshooting

### Common Issues:

1. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all environment variables are set
   - Check TypeScript errors

2. **Database Connection Issues:**
   - Verify DATABASE_URL format
   - Check network connectivity
   - Ensure database exists and migrations are run

3. **Authentication Issues:**
   - Verify JWT_SECRET and NEXTAUTH_SECRET are set
   - Check cookie settings for production domains

4. **Performance Issues:**
   - Enable caching
   - Optimize images
   - Use CDN for static assets

### Logs:

```bash
# Docker logs
docker logs roi-calculator

# PM2 logs
pm2 logs

# Vercel logs
vercel logs

# Check application logs in your deployment platform
```

## Support

For deployment issues:
1. Check this deployment guide
2. Review application logs
3. Check environment variable configuration
4. Verify database connectivity
5. Contact support if issues persist

## Updates and Maintenance

### Regular Updates:
1. **Dependencies:**
   ```bash
   npm audit
   npm update
   ```

2. **Security patches:**
   - Monitor security advisories
   - Apply patches promptly
   - Test in staging environment first

3. **Database maintenance:**
   - Regular backups
   - Performance monitoring
   - Index optimization

### Rolling Updates:
- Use blue-green deployment strategy
- Test in staging environment
- Monitor application health after deployment
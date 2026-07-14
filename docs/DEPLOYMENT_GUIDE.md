# MediAssist AI - Deployment Guide

## Prerequisites

- MongoDB Atlas account
- Google Gemini API key
- Render account (for backend)
- Vercel account (for frontend)
- GitHub account

## MongoDB Atlas Setup

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create Cluster**
   - Click "Build a Database"
   - Select "Free" tier
   - Choose a region close to your users
   - Create the cluster

3. **Create Database User**
   - Go to Database Access
   - Click "Add New Database User"
   - Choose username and password
   - Select "Read and write to any database"

4. **Whitelist IP**
   - Go to Network Access
   - Add IP address `0.0.0.0/0` (for development)
   - For production, add specific IPs

5. **Get Connection String**
   - Click "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

## Backend Deployment (Render)

### 1. Prepare Backend

```bash
cd backend
```

Update `application.properties`:

```properties
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/mediassist?retryWrites=true&w=majority
jwt.secret=your-production-secret-key
jwt.expiration=86400000
gemini.api.key=your-gemini-api-key
cors.allowed-origins=https://your-frontend-domain.vercel.app
```

### 2. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 3. Deploy on Render

1. Go to [Render](https://render.com)
2. Click "New +"
3. Select "Web Service"
4. Connect your GitHub repository
5. Configure:

   **Name**: `mediassist-backend`
   
   **Build Command**:
   ```bash
   mvn clean package -DskipTests
   ```
   
   **Start Command**:
   ```bash
   java -jar target/mediassist-backend-1.0.0.jar
   ```

6. Add Environment Variables:
   - `SPRING_DATA_MONGODB_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `CORS_ALLOWED_ORIGINS`

7. Click "Create Web Service"
8. Wait for deployment to complete

## Frontend Deployment (Vercel)

### 1. Prepare Frontend

```bash
cd frontend
```

Update `.env`:

```env
REACT_APP_API_URL=https://your-backend-domain.onrender.com/api
REACT_APP_GEMINI_API_KEY=your-gemini-api-key
```

### 2. Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:

   **Framework Preset**: Create React App
   
   **Root Directory**: `frontend`
   
   **Build Command**: `npm run build`
   
   **Output Directory**: `build`

5. Add Environment Variables:
   - `REACT_APP_API_URL`
   - `REACT_APP_GEMINI_API_KEY`

6. Click "Deploy"
7. Wait for deployment to complete

## Docker Deployment

### Using Docker Compose

1. Update `docker-compose.yml` with your environment variables

2. Build and run:
```bash
docker-compose up -d
```

3. Check status:
```bash
docker-compose ps
```

4. View logs:
```bash
docker-compose logs -f
```

5. Stop services:
```bash
docker-compose down
```

## Production Checklist

### Security
- [ ] Change JWT secret to a strong random key
- [ ] Enable HTTPS
- [ ] Set up proper CORS origins
- [ ] Enable rate limiting
- [ ] Implement input validation
- [ ] Set up monitoring and logging

### Database
- [ ] Configure MongoDB backup
- [ ] Set up database indexing
- [ ] Enable MongoDB authentication
- [ ] Configure connection pooling

### Application
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure CDN for static assets
- [ ] Enable caching
- [ ] Set up health checks
- [ ] Configure auto-scaling

### Monitoring
- [ ] Set up application monitoring
- [ ] Configure log aggregation
- [ ] Set up uptime monitoring
- [ ] Configure alerting

## Environment Variables

### Production Backend
```properties
# MongoDB
SPRING_DATA_MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mediassist

# Security
JWT_SECRET=<strong-random-key>
JWT_EXPIRATION=86400000

# AI
GEMINI_API_KEY=<your-gemini-key>

# CORS
CORS_ALLOWED_ORIGINS=https://your-domain.com

# Server
SERVER_PORT=8080
```

### Production Frontend
```env
REACT_APP_API_URL=https://api.your-domain.com
REACT_APP_GEMINI_API_KEY=<your-gemini-key>
```

## Troubleshooting

### Backend Issues

**Problem**: Application won't start
- Check logs: `Render logs` or `docker-compose logs`
- Verify environment variables
- Check MongoDB connection string

**Problem**: Database connection failed
- Verify MongoDB credentials
- Check IP whitelist in MongoDB Atlas
- Ensure cluster is running

### Frontend Issues

**Problem**: Build fails
- Check Node.js version (should be 18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check environment variables

**Problem**: API calls failing
- Verify REACT_APP_API_URL
- Check CORS configuration
- Verify backend is running

### Common Solutions

**Clear Docker Cache**
```bash
docker system prune -a
```

**Rebuild Docker Images**
```bash
docker-compose build --no-cache
```

**Reset Render Deployment**
1. Go to Render dashboard
2. Click "Manual Deploy"
3. Select "Clear build cache & deploy"

## Scaling

### Backend Scaling
- Enable auto-scaling in Render
- Add load balancer
- Implement caching (Redis)
- Use CDN for static assets

### Database Scaling
- Upgrade MongoDB cluster
- Implement read replicas
- Use connection pooling
- Optimize queries

## Backup Strategy

### MongoDB Backup
- Enable automated backups in MongoDB Atlas
- Set retention period (e.g., 30 days)
- Test restore process regularly

### Application Backup
- Backup configuration files
- Export data regularly
- Document deployment process

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and apply security patches
- Monitor resource usage
- Review logs for errors
- Test backup restore process

### Updates
1. Test in staging environment
2. Create backup before update
3. Deploy during low-traffic hours
4. Monitor after deployment
5. Rollback if issues occur

## Support

For deployment issues:
- Check Render status page
- Review Vercel deployment logs
- Check MongoDB Atlas status
- Open GitHub issue with details

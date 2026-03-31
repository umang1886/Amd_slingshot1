# 🚀 NutriSense — Cloud Run Deployment Guide

---

## 1. Prerequisites

```bash
# Required tools
node >= 18.0.0
npm >= 9.0.0
docker >= 24.0.0
gcloud CLI >= 450.0.0

# Verify installations
node --version
docker --version
gcloud --version
```

### 1.1 GCP Setup

```bash
# Login to Google Cloud
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable secretmanager.googleapis.com
```

---

## 2. Project Structure

```
nutrisense/
├── 📁 frontend/                 # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIAdvisor/
│   │   │   ├── Dashboard/
│   │   │   ├── MealLogger/
│   │   │   └── Onboarding/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
│
├── 📁 backend/                  # Express API server
│   ├── src/
│   │   ├── routes/
│   │   │   ├── chat.ts
│   │   │   ├── nutrition.ts
│   │   │   └── mealplan.ts
│   │   ├── services/
│   │   │   ├── claude.ts
│   │   │   └── fooddb.ts
│   │   ├── middleware/
│   │   │   ├── rateLimit.ts
│   │   │   └── cors.ts
│   │   └── index.ts
│   └── package.json
│
├── 🐳 Dockerfile                # Multi-stage build
├── 📄 .dockerignore
├── 📄 cloudbuild.yaml           # Cloud Build config
├── 📄 .env.example
└── 📄 README.md
```

---

## 3. Dockerfile

```dockerfile
# ===== Stage 1: Build Frontend =====
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


# ===== Stage 2: Build Backend =====
FROM node:18-alpine AS backend-build

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/ ./
RUN npm run build 2>/dev/null || true


# ===== Stage 3: Production Image =====
FROM node:18-alpine AS production

# Security: run as non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nutrisense -u 1001

WORKDIR /app

# Copy backend production deps
COPY --from=backend-build --chown=nutrisense:nodejs /app/backend/node_modules ./node_modules
COPY --from=backend-build --chown=nutrisense:nodejs /app/backend/src ./src
COPY --from=backend-build --chown=nutrisense:nodejs /app/backend/package.json ./

# Copy built frontend into backend's public folder
COPY --from=frontend-build --chown=nutrisense:nodejs /app/frontend/dist ./public

USER nutrisense

# Cloud Run uses PORT env variable
ENV PORT=8080
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:8080/health || exit 1

CMD ["node", "src/index.js"]
```

---

## 4. Environment Variables

### 4.1 Local Development (.env)

```bash
# .env (never commit this file)
ANTHROPIC_API_KEY=sk-ant-your-key-here
NODE_ENV=development
PORT=8080
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_MAX=100
```

### 4.2 Cloud Run Secrets Setup

```bash
# Create secret in Google Secret Manager
echo -n "sk-ant-your-api-key-here" | \
  gcloud secrets create ANTHROPIC_API_KEY \
    --replication-policy="automatic" \
    --data-file=-

# Verify secret was created
gcloud secrets list
gcloud secrets versions access latest --secret=ANTHROPIC_API_KEY
```

---

## 5. Cloud Build Configuration

```yaml
# cloudbuild.yaml
steps:
  # Step 1: Build Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/nutrisense:$COMMIT_SHA'
      - '-t'
      - 'gcr.io/$PROJECT_ID/nutrisense:latest'
      - '.'

  # Step 2: Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'gcr.io/$PROJECT_ID/nutrisense:$COMMIT_SHA'

  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'gcr.io/$PROJECT_ID/nutrisense:latest'

  # Step 3: Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'nutrisense'
      - '--image=gcr.io/$PROJECT_ID/nutrisense:$COMMIT_SHA'
      - '--region=asia-south1'
      - '--platform=managed'
      - '--allow-unauthenticated'
      - '--port=8080'
      - '--memory=512Mi'
      - '--cpu=1'
      - '--min-instances=0'
      - '--max-instances=10'
      - '--set-secrets=ANTHROPIC_API_KEY=ANTHROPIC_API_KEY:latest'

images:
  - 'gcr.io/$PROJECT_ID/nutrisense:$COMMIT_SHA'
  - 'gcr.io/$PROJECT_ID/nutrisense:latest'

options:
  logging: CLOUD_LOGGING_ONLY
```

---

## 6. Deployment Steps

### Option A: Manual Deployment

```bash
# 1. Build Docker image locally
docker build -t nutrisense .

# 2. Test locally first
docker run -p 8080:8080 \
  -e ANTHROPIC_API_KEY=your_key \
  -e NODE_ENV=production \
  nutrisense

# Open http://localhost:8080 to verify

# 3. Tag for GCR
docker tag nutrisense gcr.io/YOUR_PROJECT_ID/nutrisense:v1.0

# 4. Authenticate Docker with GCR
gcloud auth configure-docker

# 5. Push image
docker push gcr.io/YOUR_PROJECT_ID/nutrisense:v1.0

# 6. Deploy to Cloud Run
gcloud run deploy nutrisense \
  --image=gcr.io/YOUR_PROJECT_ID/nutrisense:v1.0 \
  --region=asia-south1 \
  --platform=managed \
  --allow-unauthenticated \
  --port=8080 \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10 \
  --set-secrets=ANTHROPIC_API_KEY=ANTHROPIC_API_KEY:latest

# 7. Get your live URL
gcloud run services describe nutrisense \
  --region=asia-south1 \
  --format='value(status.url)'
```

### Option B: Cloud Build (CI/CD)

```bash
# Trigger build from source
gcloud builds submit . \
  --config=cloudbuild.yaml \
  --substitutions=COMMIT_SHA=$(git rev-parse --short HEAD)
```

### Option C: Connect GitHub Repo (Recommended)

```bash
# Via Cloud Console:
# Cloud Build → Triggers → Connect Repository → GitHub
# Set trigger: push to main branch → runs cloudbuild.yaml
```

---

## 7. Cloud Run Service Configuration

```bash
# Update service configuration
gcloud run services update nutrisense \
  --region=asia-south1 \
  --memory=512Mi \
  --cpu=1 \
  --concurrency=80 \
  --timeout=300 \
  --min-instances=0 \
  --max-instances=10
```

| Setting | Value | Reason |
|---------|-------|--------|
| Memory | 512Mi | Sufficient for Node.js + AI responses |
| CPU | 1 vCPU | Adequate for API handling |
| Concurrency | 80 | Node.js async handles well |
| Timeout | 300s | Allow for Claude API calls |
| Min instances | 0 | Cost-saving (cold start acceptable) |
| Max instances | 10 | Auto-scale for demo traffic |

---

## 8. Health Check Endpoint

```typescript
// In backend/src/index.ts
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: process.env.npm_package_version,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});
```

---

## 9. Verify Deployment

```bash
# Get service URL
SERVICE_URL=$(gcloud run services describe nutrisense \
  --region=asia-south1 \
  --format='value(status.url)')

echo "🚀 App live at: $SERVICE_URL"

# Health check
curl $SERVICE_URL/health

# Test AI endpoint
curl -X POST $SERVICE_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What should I eat for breakfast?", "context": {}}'
```

---

## 10. Cost Estimation (Cloud Run)

| Resource | Usage | Est. Cost |
|----------|-------|-----------|
| Cloud Run | 100K requests/month | ~$0.24 |
| Container Registry | 1 GB image | ~$0.10 |
| Secret Manager | 1 secret | ~$0.006 |
| Anthropic API | 1K requests/day | ~$5–10 |
| **Total** | | **~$6–11/month** |

> Cloud Run has a generous free tier: 2M requests/month free

---

## 11. Rollback

```bash
# List revisions
gcloud run revisions list --service=nutrisense --region=asia-south1

# Rollback to previous revision
gcloud run services update-traffic nutrisense \
  --region=asia-south1 \
  --to-revisions=nutrisense-00001-abc=100
```

---

## 12. Monitoring

```bash
# View logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=nutrisense" \
  --limit=50 \
  --format="table(timestamp, jsonPayload.message)"

# Stream live logs
gcloud alpha run services logs tail nutrisense --region=asia-south1
```

---

*Region `asia-south1` (Mumbai) selected for best latency from India. Change to preferred region as needed.*

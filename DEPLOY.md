# Deployment Guide

## Vercel Deployment

The app is ready to deploy to Vercel. Follow these steps:

### 1. Set up Anthropic API Key

Before deploying, you need a Claude API key:

1. Get your API key from https://console.anthropic.com/
2. You'll add this as an environment variable in Vercel

### 2. Deploy to Vercel

#### Option A: Connect via GitHub (Recommended)

1. Go to https://vercel.com/new
2. Import the repository: `NKAlfredBot/catskills-flora`
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - Name: `VITE_ANTHROPIC_API_KEY`
   - Value: [Your Anthropic API key]
5. Click "Deploy"

#### Option B: CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --yes

# When prompted, add the environment variable:
# VITE_ANTHROPIC_API_KEY=[your-api-key]

# Deploy to production
vercel --prod
```

### 3. Environment Variables in Vercel Dashboard

After deployment, ensure the API key is set:

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add: `VITE_ANTHROPIC_API_KEY` with your Claude API key
4. Redeploy if needed

### 4. Test the Deployment

Once deployed:
- Visit the live URL
- Test the identification feature (requires API key to be set)
- Try adding specimens to your catalog
- Generate DIY ideas for found plants

## Notes

- The app uses IndexedDB for local storage - all user data stays in the browser
- API calls to Claude are proxied through Vercel serverless functions in the `/api` directory
- The first deployment may take a few minutes
- Subsequent deployments are faster

## Troubleshooting

**Build fails?**
- Check that Node.js version is compatible (recommended: v20 or v22)
- Ensure all dependencies are installed: `npm install`

**API calls failing?**
- Verify the `VITE_ANTHROPIC_API_KEY` environment variable is set in Vercel
- Check the API key is valid
- Redeploy after adding/updating environment variables

**Images not uploading?**
- Check browser console for errors
- Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

## Repository

GitHub: https://github.com/NKAlfredBot/catskills-flora

Collaborators:
- NKAlfredBot (owner)
- nkumar23 (invited)

# Deployment Guide for ELITEIIT Marketing Tools

## Quick Start: Deploying to Vercel

### Step 1: Get Your API Keys

Before deploying, you'll need to obtain the following API keys:

#### 1. Supabase (Authentication)
- Go to [Supabase](https://supabase.com)
- Create a new project or use an existing one
- Go to Project Settings > API
- Copy:
  - `Project URL` → This is your `NEXT_PUBLIC_SUPABASE_URL`
  - `anon/public key` → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 2. OpenRouter (AI Message Generation)
- Go to [OpenRouter](https://openrouter.ai)
- Sign up or log in
- Go to Keys section
- Create a new API key → This is your `OPENROUTER_API_KEY`
- Note: We use the free model `meta-llama/llama-3.3-70b-instruct:free`

#### 3. Freepik (Image Generation)
- Go to [Freepik API](https://www.freepik.com/api)
- Sign up for API access
- Get your API key → This is your `FREEPIK_API_KEY`

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**:
   In the Vercel deployment settings, add these environment variables:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   OPENROUTER_API_KEY=<your-openrouter-key>
   FREEPIK_API_KEY=<your-freepik-key>
   ```

4. **Deploy**: Click "Deploy" and wait for the build to complete

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variables**:
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add OPENROUTER_API_KEY
   vercel env add FREEPIK_API_KEY
   ```

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Step 3: Configure Supabase Authentication

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Email provider
4. Add your Vercel deployment URL to:
   - Authentication > URL Configuration > Site URL
   - Authentication > URL Configuration > Redirect URLs

### Step 4: Create Your First User

1. Go to Supabase dashboard
2. Navigate to Authentication > Users
3. Click "Add User"
4. Enter email and password
5. Use these credentials to login to your deployed app

## Testing Your Deployment

1. Visit your Vercel deployment URL
2. You should be redirected to the login page
3. Login with your Supabase credentials
4. Test the AI Message Creator:
   - Enter a campaign idea like "20% off all courses"
   - Select platform (WhatsApp/SMS)
   - Click Generate Message
5. Test the AI Image Generator:
   - Enter an image idea like "Students in classroom"
   - Click Generate Image
   - View the enhanced prompt and generated image

## Troubleshooting

### Issue: Login not working
- **Solution**: Check that your Supabase URL and keys are correctly set in Vercel environment variables
- Verify user exists in Supabase Authentication dashboard

### Issue: Message generation fails
- **Solution**: Verify your OpenRouter API key is valid and has credits
- Check that you're using the free model: `meta-llama/llama-3.3-70b-instruct:free`

### Issue: Image generation fails
- **Solution**: Verify your Freepik API key is valid
- Check Freepik API documentation for rate limits

### Issue: "Application error" on deployment
- **Solution**: Check Vercel deployment logs for specific errors
- Ensure all dependencies are properly installed
- Verify Next.js version compatibility

## Environment Variables Summary

| Variable | Where to Get It | Required |
|----------|----------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project Settings > API | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Project Settings > API | Yes |
| `OPENROUTER_API_KEY` | OpenRouter Keys section | Yes |
| `FREEPIK_API_KEY` | Freepik API Dashboard | Yes |

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to Domains
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions
5. Update Supabase redirect URLs with your custom domain

## Support

For issues specific to:
- **Vercel deployment**: Check [Vercel Documentation](https://vercel.com/docs)
- **Supabase auth**: Check [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- **OpenRouter**: Check [OpenRouter Documentation](https://openrouter.ai/docs)
- **Freepik API**: Check [Freepik API Documentation](https://www.freepik.com/api/docs)

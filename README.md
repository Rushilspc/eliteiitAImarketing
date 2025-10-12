# ELITEIIT Marketing Tools

A modern, production-ready SaaS web application for ELITEIIT Coaching Institute. This app provides AI-powered marketing tools including message generation and image creation.

## Features

- **AI Message Creator**: Generate WhatsApp/SMS marketing messages using OpenRouter's Llama model
- **AI Image Generator**: Create marketing images using Freepik's API with enhanced prompts
- **Supabase Authentication**: Secure login system for authorized users

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Authentication**: Supabase
- **AI Services**: OpenRouter (Llama 3.3), Freepik API
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Supabase account and project
- OpenRouter API key
- Freepik API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd eliteiit-marketing-tools
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OpenRouter API (for LLM)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Freepik API (for Image Generation)
FREEPIK_API_KEY=your_freepik_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Method 1: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure environment variables in the Vercel dashboard:
   - Add all variables from `.env.local`
6. Click "Deploy"

### Method 2: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add OPENROUTER_API_KEY
vercel env add FREEPIK_API_KEY
```

5. Deploy to production:
```bash
vercel --prod
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `OPENROUTER_API_KEY` | OpenRouter API key for LLM | Yes |
| `FREEPIK_API_KEY` | Freepik API key for image generation | Yes |

## Usage

1. **Login**: Use your Supabase credentials to login
2. **Message Creator**: 
   - Enter your campaign idea
   - Select platform (WhatsApp/SMS/Interakt)
   - Click "Generate Message"
   - Copy the generated message
3. **Image Generator**:
   - Enter your image idea
   - Click "Generate Image"
   - View enhanced prompt and generated image
   - Download image or open in ChatGPT/Gemini

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── message/route.ts    # Message generation API
│   │   └── image/route.ts      # Image generation API
│   ├── dashboard/page.tsx      # Main dashboard
│   ├── login/page.tsx          # Login page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page (redirects to login)
├── components/
│   ├── MessageCreator.tsx      # Message creator component
│   └── ImageGenerator.tsx      # Image generator component
├── lib/
│   └── supabase.ts             # Supabase client
└── .env.example                # Environment variables template
```

## Branding

- **Primary Color**: White (#ffffff)
- **Secondary Color**: Blue (#2563eb)
- **Font**: Nunito (clean, modern, non-AI style)
- **Design**: Minimal, uncluttered, professional

## License

Proprietary - ELITEIIT Coaching Institute

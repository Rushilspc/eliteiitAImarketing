# ELITEIIT Marketing Tools

## Overview

ELITEIIT Marketing Tools is a SaaS web application designed for ELITEIIT Coaching Institute in Bangalore, Karnataka. The platform provides AI-powered marketing tools to help generate promotional content including WhatsApp/SMS messages and marketing images. Built with Next.js 15 and designed for deployment on Vercel's free tier, the application serves authenticated users who need to create professional marketing materials quickly and efficiently.

The application features a clean, modern interface with a white and blue color scheme reflecting the ELITEIIT brand. It leverages AI services to transform simple campaign ideas into polished marketing content that follows platform-specific compliance guidelines (TRAI for SMS, Meta standards for WhatsApp).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 15 with React 19 and TypeScript
- **Routing**: App Router with file-based routing
- **Styling**: Tailwind CSS v4 with custom theme configuration
- **Font**: Nunito from Google Fonts for brand consistency
- **State Management**: React hooks (useState, useEffect) for local component state
- **HTTP Client**: Axios for API communication

**Key Pages**:
- `/` - Root redirects to login
- `/login` - Authentication page with Supabase integration
- `/dashboard` - Main application interface (authenticated users only)

**Reusable Components**:
- `MessageCreator` - AI-powered message generation interface
- `ImageGenerator` - AI-powered image prompt enhancement interface

**Design Decisions**:
- Server-side rendering for initial page loads
- Client-side interactivity with 'use client' directive
- Responsive design optimized for desktop workflow
- Error boundaries for graceful error handling

### Backend Architecture

**API Structure**: Next.js API routes (serverless functions)
- `/api/message` - Handles AI message generation requests
- `/api/image` - Handles AI image prompt enhancement requests

**Authentication Flow**:
1. Client authenticates via Supabase on login page
2. Session token stored in browser
3. API routes validate token with Supabase on each request
4. Unauthorized requests rejected with 401 status

**AI Processing Pipeline**:

*Message Generation*:
1. Receives promotional idea and platform type (WhatsApp/SMS)
2. Constructs platform-specific system prompt with compliance rules
3. Calls OpenRouter API with Llama 3.3 70B model (free tier)
4. Returns formatted message following TRAI/Meta guidelines

*Image Enhancement*:
1. Receives basic image description
2. Constructs detailed prompt engineering instructions for Imagen 3
3. Calls OpenRouter API to enhance prompt with technical specifications
4. Returns production-ready image generation prompt

**Environment Configuration**:
- Development: Port 5000 with Turbopack for fast refresh
- Production: Vercel's edge network with automatic optimization
- Environment variables validated at runtime with clear error messages

### Data Storage & Authentication

**Supabase Integration**:
- **Purpose**: User authentication only (no custom database tables)
- **Auth Flow**: Email/password authentication with JWT tokens
- **Client Setup**: Browser-side client in `lib/supabase.ts`
- **Server Validation**: Token verification in API routes
- **Session Management**: Automatic redirect on auth state changes

**Design Rationale**:
- Chose Supabase for zero-config authentication on Vercel free tier
- No database needed since app doesn't persist user-generated content
- JWT tokens provide stateless auth suitable for serverless functions

### Security & Compliance

**Authentication Security**:
- Bearer token validation on all protected API routes
- Supabase handles password hashing and secure storage
- Client-side session checks prevent unauthorized UI access
- Auth state listener ensures real-time logout on token invalidation

**Marketing Compliance**:
- TRAI (India) compliance built into SMS message generation
- Meta WhatsApp Business API standards enforced
- Mandatory opt-out instructions in all messages
- Brand identification and location tags required

## External Dependencies

### Third-Party APIs

**OpenRouter** (`https://openrouter.ai/api/v1/chat/completions`)
- **Purpose**: AI text generation for messages and prompt enhancement
- **Model**: `meta-llama/llama-3.3-70b-instruct:free` (zero cost)
- **Authentication**: API key in `OPENROUTER_API_KEY` environment variable
- **Usage**: All AI generation features

**Freepik API** (`https://api.freepik.com/v1/ai/text-to-image/imagen3`)
- **Purpose**: Referenced for future image generation capability
- **Authentication**: API key in `FREEPIK_API_KEY` environment variable
- **Status**: Prompt enhancement implemented, direct API integration planned

**Supabase** (`https://supabase.com`)
- **Purpose**: User authentication and session management
- **Configuration**: 
  - `NEXT_PUBLIC_SUPABASE_URL` - Project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anonymous/public API key
- **Version**: `@supabase/supabase-js` v2.75.0

### External Services Configuration

**Required Environment Variables**:
```
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
OPENROUTER_API_KEY=[api-key]
FREEPIK_API_KEY=[api-key]
```

**Deployment Platform**: Vercel
- Framework auto-detection for Next.js
- Serverless function deployment for API routes
- Edge network CDN for static assets
- Environment variable injection via dashboard

**Known Configuration Issues**:
- Supabase URL must include `https://` protocol prefix
- Environment variables must be set in both Replit Secrets and Vercel dashboard
- Missing variables trigger graceful error messages with setup instructions

### NPM Packages

**Core Dependencies**:
- `next` 15.5.4 - React framework with App Router
- `react` 19.1.0 - UI library
- `react-dom` 19.1.0 - DOM rendering
- `@supabase/supabase-js` 2.75.0 - Authentication client
- `axios` 1.12.2 - HTTP client for API calls

**Development Dependencies**:
- `typescript` 5.x - Type safety
- `tailwindcss` 4.x - Utility-first CSS framework
- `@tailwindcss/postcss` 4.x - PostCSS integration
- Type definitions for Node, React, and React DOM
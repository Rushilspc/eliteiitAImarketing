# ⚠️ IMPORTANT: Fix Required for Supabase URL

## Issue Found
Your Supabase URL secret is missing the `https://` protocol prefix.

## Current Value (Incorrect)
```
//wbtjxbosszpsyuabsnxb.supabase.co
```

## Correct Value Needed
```
https://wbtjxbosszpsyuabsnxb.supabase.co
```

## How to Fix

### Option 1: Update in Replit Secrets (Recommended)
1. Go to the Secrets tab in Replit (lock icon in left sidebar)
2. Find `NEXT_PUBLIC_SUPABASE_URL`
3. Update the value to: `https://wbtjxbosszpsyuabsnxb.supabase.co`
4. The server will automatically restart

### Option 2: Delete the Secret
1. Go to Secrets tab
2. Delete `NEXT_PUBLIC_SUPABASE_URL`
3. The app will use the correct value from `.env.local` file

## After Fixing
The login page will work correctly and you can access the dashboard.

## Next Steps After URL Fix

### 1. Create a Supabase User
1. Go to https://supabase.com
2. Open your project dashboard
3. Navigate to: Authentication → Users
4. Click "Add User" or "Invite User"
5. Enter email and password
6. Save the user

### 2. Test the Application
1. Use the webview to access your app
2. Login with the credentials you created
3. Test the AI Message Creator:
   - Enter a campaign idea (e.g., "20% Diwali offer")
   - Select platform (WhatsApp/SMS)
   - Click Generate
4. Test the AI Image Generator:
   - Enter image idea (e.g., "students in classroom")
   - Click Generate
   - View enhanced prompt and image

## Technical Details
- Replit Secrets override `.env.local` file values
- Next.js requires `NEXT_PUBLIC_*` variables to have valid URLs
- The `.env.local` file already has the correct value

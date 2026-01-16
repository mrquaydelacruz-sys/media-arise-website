# Fixing Vercel Deployment

## The Issue
Vercel is building from: `storycruzfilms/media-arise-website`
But your code is in: `mrquaydelacruz-sys/media-arise-website`

## Solution: Update Vercel Project Settings

1. Go to https://vercel.com/dashboard
2. Select your project (media-arise-website)
3. Go to **Settings** → **Git**
4. Click **"Disconnect"** or **"Edit"** next to the current repository
5. Click **"Connect Git Repository"**
6. Select: `mrquaydelacruz-sys/media-arise-website`
7. Click **"Import"**
8. Make sure Environment Variables are set:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `1bny7eub`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
9. Click **"Deploy"**

This will trigger a new build from the correct repository with all the fixes!

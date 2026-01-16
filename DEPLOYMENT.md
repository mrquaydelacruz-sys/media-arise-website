# Deployment Guide for media-arise.com

This guide will help you deploy your Next.js website to Vercel and connect it to your GoDaddy domain (media-arise.com).

## Prerequisites

- A GitHub account (free)
- A Vercel account (free) - sign up at https://vercel.com
- Your GoDaddy domain: media-arise.com

## Step 1: Push Code to GitHub

1. Go to https://github.com and create a new repository (e.g., `media-arise-website`)
2. Don't initialize it with README, .gitignore, or license
3. Run these commands in your terminal:

```bash
cd /Users/quaydelacruz/Desktop/Media-Arise-Website
git remote add origin https://github.com/YOUR_USERNAME/media-arise-website.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign up/login with GitHub
2. Click "Add New Project"
3. Import your repository `media-arise-website`
4. Vercel will auto-detect Next.js settings (keep defaults)
5. **Important: Add Environment Variables**
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_SANITY_PROJECT_ID` = `1bny7eub`
   - Add: `NEXT_PUBLIC_SANITY_DATASET` = `production`
6. Click "Deploy"

Your site will be live at a URL like: `media-arise-website.vercel.app`

## Step 3: Connect Your GoDaddy Domain

1. In Vercel, go to your project → Settings → Domains
2. Click "Add Domain"
3. Enter: `media-arise.com` and `www.media-arise.com`
4. Vercel will show you DNS records to add

### Update DNS in GoDaddy

1. Go to https://godaddy.com and log in
2. Go to "My Products" → Click "DNS" next to your domain
3. Add/Update these records:

**For media-arise.com:**
- Type: `A`
- Name: `@`
- Value: Vercel's IP (shown in Vercel dashboard - usually something like `76.76.21.21`)
- TTL: `600` (or default)

**For www.media-arise.com:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `600` (or default)

4. Save the DNS records
5. Wait 24-48 hours for DNS to propagate (usually takes a few minutes to a few hours)

## Step 4: Verify Sanity CORS Settings

1. Go to https://www.sanity.io/manage
2. Select your project (project ID: `1bny7eub`)
3. Go to Settings → API → CORS origins
4. Add your domain:
   - `https://media-arise.com`
   - `https://www.media-arise.com`
   - Your Vercel preview URL: `https://media-arise-website.vercel.app`
   - Keep `http://localhost:3000` for local development

## Step 5: Test Everything

1. Visit `https://media-arise.com` (once DNS propagates)
2. Test all pages: Home, About Us, Ministry, Blog, Media, Contact
3. Verify Sanity CMS content loads correctly
4. Test the contact form
5. Check that media items display properly

## Troubleshooting

- **DNS not working?** Wait 24-48 hours, or check GoDaddy DNS settings
- **Content not loading?** Check Sanity CORS settings and environment variables in Vercel
- **Build errors?** Check Vercel deployment logs

## Future Updates

After deployment, any time you push to GitHub:
```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically redeploy your site!

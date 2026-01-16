# Media Arise Website

A modern website for Media Arise built with Next.js and Sanity CMS, allowing content to be edited without coding.

## Features

- **Latest Fellowship Session**: Display the most recent online fellowship session with a play button that opens an embedded YouTube video
- **Announcements**: Show active announcements on the homepage
- **Upcoming Events**: Display upcoming events in a card layout

## Tech Stack

- **Next.js 14** - React framework with App Router
- **Sanity CMS** - Headless CMS for content management
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **date-fns** - Date formatting

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Sanity CMS

First, install Sanity dependencies:

```bash
cd sanity
npm install
cd ..
```

Then, initialize your Sanity project:

```bash
npm run sanity init
```

During initialization:
- Create a new project or use an existing one
- Choose "Production" as your dataset
- Set up your project ID and dataset name

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 4. Deploy Sanity Studio

To make your CMS accessible online, deploy it:

```bash
cd sanity
npm run sanity deploy
```

Or run it locally for development:

```bash
npm run sanity:dev
```

This will open Sanity Studio at `http://localhost:3333` where you can:
- Add fellowship sessions (mark one as "Latest" to show on homepage)
- Create announcements
- Add upcoming events

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your website.

## Content Management

### Adding a Fellowship Session

1. Go to your Sanity Studio (either locally or deployed)
2. Click "Fellowship Session" in the sidebar
3. Click "Create new"
4. Fill in:
   - **Title**: Session title
   - **Description**: Brief description
   - **YouTube Video URL**: Full YouTube URL
   - **Thumbnail Image**: Upload an image
   - **Date**: Session date
   - **Mark as Latest**: Check this box to display on homepage
5. Click "Publish"

### Adding Announcements

1. Go to Sanity Studio
2. Click "Announcement"
3. Click "Create new"
4. Fill in title, content, date
5. Set "Is Active" to show on homepage
6. Set priority (higher numbers appear first)
7. Click "Publish"

### Adding Events

1. Go to Sanity Studio
2. Click "Event"
3. Click "Create new"
4. Fill in title, description, date, location (optional), image (optional)
5. Ensure "Is Upcoming" is checked
6. Click "Publish"

## Production Deployment

### Deploy Next.js

You can deploy to Vercel, Netlify, or any hosting platform that supports Next.js.

### Keep Sanity Studio Accessible

Make sure your Sanity Studio is deployed so you can edit content anytime. You can access it at the URL you configured during `sanity deploy`.

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── FellowshipSection.tsx
│   ├── AnnouncementsSection.tsx
│   └── EventsSection.tsx
├── lib/                # Utilities
│   ├── sanity.client.ts
│   ├── sanity.image.ts
│   └── queries.ts
└── sanity/             # Sanity CMS configuration
    ├── schemas/        # Content schemas
    └── sanity.config.ts
```

## License

Private project for Media Arise.

# Deploying Trip OS to Vercel

This guide will help you deploy the Trip OS app to Vercel so it works from anywhere, including when you're traveling in Japan.

## Prerequisites

1. A Vercel account (free tier works)
2. GitHub repository connected to Vercel

## Setup Steps

### 1. Add Vercel Postgres Database

1. Go to your Vercel project dashboard
2. Navigate to **Storage** → **Create Database** → **Postgres**
3. Create a new Postgres database (free tier: Hobby plan)
4. Note the connection string (will be auto-set as `POSTGRES_URL`)

### 2. Set Environment Variables

In your Vercel project settings, add these environment variables:

- `POSTGRES_URL` - Automatically set when you create the Postgres database
- `POSTGRES_PRISMA_URL` - Also auto-set
- `POSTGRES_URL_NON_POOLING` - Also auto-set
- `JWT_SECRET` - Generate a random secret: `openssl rand -base64 32`
- `NEXT_PUBLIC_WEATHER_API_KEY` (optional) - Your OpenWeatherMap API key

### 3. Deploy

1. Push your code to GitHub
2. Vercel will automatically deploy
3. The database tables will be created on first API call

### 4. Initialize Trip Data

On first deployment, the trip data will be automatically initialized when someone logs in. The `initializeDemoData()` function will:
- Create the database tables
- Insert the Japan 2026 trip data
- Create traveler accounts (tom/courtney with password: password123)

## Accessing from Japan

Once deployed, you can access the app from anywhere:
- `https://your-project.vercel.app/travel`
- Works on any device, any network
- No need for your computer to be running

## Local Development

For local development, the app will automatically use the file-based database. To test with Vercel Postgres locally:

1. Set `USE_VERCEL_DB=true` in your `.env.local`
2. Add your `POSTGRES_URL` to `.env.local`
3. Restart your dev server

## Database Schema

The Vercel Postgres database uses two tables:

- **trips**: Stores trip data as JSONB
  - `id` (TEXT PRIMARY KEY)
  - `data` (JSONB)
  - `updated_at` (TIMESTAMP)

- **travelers**: Stores traveler credentials
  - `trip_id` (TEXT)
  - `traveler_id` (TEXT)
  - `password_hash` (TEXT)
  - `role` (TEXT)
  - `name` (TEXT)
  - PRIMARY KEY (trip_id, traveler_id)

## Troubleshooting

- **Database connection errors**: Make sure `POSTGRES_URL` is set in Vercel
- **Tables not created**: The tables are created automatically on first API call
- **Login fails**: Check that travelers were created (they're auto-created on first login)



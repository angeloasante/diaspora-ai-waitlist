# Supabase Setup Guide

This guide will help you set up Supabase as the database for your Waitly application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project

## Setup Steps

### 1. Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project name (e.g., "waitly")
5. Enter a strong database password
6. Choose your region
7. Click "Create new project"

### 2. Set Up the Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase-schema.sql` from this project
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema

### 3. Get Your Environment Variables

1. In your Supabase dashboard, go to Settings → API
2. Copy the following values:
   - **Project URL** (this is your `SUPABASE_URL`)
   - **Project API Keys → anon public** (this is your `SUPABASE_ANON_KEY`)

### 4. Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```env
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here

# Keep your existing variables
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_email@domain.com
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

### 5. Install Dependencies

```bash
pnpm install
```

This will install the new Supabase dependency that was added to `package.json`.

### 6. Test the Setup

1. Run your development server:
   ```bash
   pnpm dev
   ```

2. Try signing up for the waitlist to test the database integration

## Database Schema

The `waitlist` table includes:

- `id` (UUID, primary key)
- `name` (VARCHAR(255))
- `email` (VARCHAR(255), unique)
- `referral_code` (VARCHAR(50), unique)
- `referred_by` (VARCHAR(50), nullable)
- `referrer_id` (UUID, foreign key to waitlist.id)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP, auto-updated)

## Features

- **Referral System**: Users can refer others using their unique referral code
- **Duplicate Prevention**: Email uniqueness prevents duplicate signups
- **Performance**: Indexes on key columns for fast queries
- **Security**: Row Level Security (RLS) enabled with appropriate policies
- **Audit Trail**: Created and updated timestamps

## Querying the Data

You can view and manage your waitlist data through:

1. **Supabase Dashboard**: Go to Table Editor → waitlist
2. **SQL Editor**: Write custom queries
3. **API**: Use Supabase's auto-generated REST or GraphQL APIs

Example queries:

```sql
-- Get total waitlist count
SELECT COUNT(*) FROM waitlist;

-- Get recent signups
SELECT name, email, created_at 
FROM waitlist 
ORDER BY created_at DESC 
LIMIT 10;

-- Get referral statistics
SELECT 
  referral_code,
  name,
  (SELECT COUNT(*) FROM waitlist w2 WHERE w2.referred_by = w1.referral_code) as referral_count
FROM waitlist w1
ORDER BY referral_count DESC;
```

## Migration from Notion

If you're migrating from Notion, the key differences are:

1. **Data Structure**: More normalized with proper foreign key relationships
2. **Performance**: Much faster queries and better scalability
3. **Real-time**: Built-in real-time subscriptions if needed
4. **Security**: Row Level Security for data protection
5. **API**: Auto-generated REST and GraphQL APIs

The referral system works the same way - each user gets a unique code that others can use to sign up.
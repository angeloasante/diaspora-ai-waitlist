<h1>Diaspora AI - Intelligent Flight Booking Platform</h1>

![Diaspora AI](/src/app/opengraph-image.png)

<p>
  The future of flight booking for the African diaspora and global travelers. Diaspora AI uses artificial intelligence to search, compare, and book flights instantly with real airline data, visa assistance, and seamless payment processing.
</p>

<p>
  <strong>Created by:</strong> <a href="https://travisdevelops.com" target="_blank" rel="noopener noreferrer">Travis Moore (travisdevelops.com)</a>
</p>

<p>
  <strong>Live Demo:</strong> <a href="https://diasporaai.dev" target="_blank" rel="noopener noreferrer">diaspora.ai</a>
</p>

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frevokslab%2Fwaitly&env=SUPABASE_URL,SUPABASE_ANON_KEY,RESEND_API_KEY,RESEND_FROM_EMAIL&envDescription=Environment%20variables%20needed%20for%20Diaspora%20AI%20waitlist.&project-name=diaspora-ai-waitlist&repository-name=diaspora-ai-waitlist&template=diaspora-ai)

## Core Features

- **AI-Powered Flight Search**: Intelligent search using real airline data from Duffel API
- **Instant Booking**: Search, compare, and book flights in real-time with live pricing
- **Visa Assistant**: Integrated visa requirements and document guidance via Sherpa API
- **Multi-Currency Support**: Pay in your local currency with Stripe and Paystack integration
- **Check-in Automation**: Automated reminders with QR codes for seamless check-in
- **Referral System**: Viral waitlist growth with unique referral tracking
- **Real-time Updates**: Live flight status and booking confirmations
- **Next.js 15 + Supabase**: Modern tech stack with PostgreSQL database and real-time capabilities
- **TypeScript**: Full type safety for robust, maintainable code

## About Diaspora AI

Diaspora AI is revolutionizing flight booking for the global African diaspora and international travelers. Built by Travis Moore, this platform combines artificial intelligence with real airline data to create the most seamless flight booking experience possible.

**What Makes Diaspora AI Special:**

- **Real Airline Integration**: Direct connection to airline systems via Duffel API for accurate, live pricing
- **Smart Automation**: AI-powered search that learns your preferences and finds the best deals
- **Diaspora-Focused**: Specialized routes and partnerships for African diaspora travel needs
- **End-to-End Service**: From search to check-in, everything is automated and intelligent
- **Multi-Payment Support**: Local payment methods including African mobile money and cards
- **Visa Intelligence**: Built-in visa requirements and application guidance for any destination

## Prerequisites: Setting Up External Services

Before you can run Diaspora AI locally, you'll need to configure these services:

### 1. Resend (Email Service)

Upstash provides serverless Redis. This template uses it for rate limiting signups.

1.  Sign up for a free account at [Upstash](https://upstash.com/).
2.  Create a new Redis database.
3.  From the database details page, note down the `REST API -> Endpoint` (this is your `UPSTASH_REDIS_REST_URL`) and `REST API -> Read-only Token` or a custom token with write access (this is your `UPSTASH_REDIS_REST_TOKEN`). Ensure the token has write permissions if you're using it for operations that modify data.

### 2. Resend

Resend is used for sending transactional emails (e.g., signup confirmations).

1.  Create an account at [Resend](https://resend.com/).
2.  Add and verify your domain (e.g., `yourdomain.com`).
3.  Generate an API key from the "API Keys" section. This will be your `RESEND_API_KEY`.
4.  Note the email address you'll send from (e.g., `waitlist@yourdomain.com`). This will be your `RESEND_FROM_EMAIL`.

### 3. Supabase

Your waitlist data will be stored in a Supabase PostgreSQL database.

**Quick Setup:**
See the detailed [Supabase Setup Guide](./SUPABASE_SETUP.md) for complete instructions.

**Summary:**
1. Create a free Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the SQL schema from `supabase-schema.sql` in the SQL Editor
4. Get your project URL and anon key from Settings → API
5. Add them to your environment variables as `SUPABASE_URL` and `SUPABASE_ANON_KEY`

The database includes a referral system where users get unique codes to share with others, creating a viral growth mechanism for your waitlist.

## Local Development Setup

To run Diaspora AI on your local machine:

1.  **Fork and Clone the Repository:**
    First, fork this repository to your own GitHub account. Then, clone your fork:

    ```bash
    git clone https://github.com/YOUR_USERNAME/diaspora-ai-waitlist.git
    # Replace YOUR_USERNAME with your GitHub username
    cd diaspora-ai-waitlist
    ```

2.  **Install Dependencies:**
    This project uses `pnpm` as the package manager in the example commands. You can use `npm`, `yarn`, or `bun` if you prefer, by adjusting the commands accordingly.

    ```bash
    pnpm install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env.local` file in the root of your project. You can copy `.env.example` and fill in the values you obtained from the prerequisite steps:

    ```env
    # Supabase Database
    SUPABASE_URL=your_supabase_project_url
    SUPABASE_ANON_KEY=your_supabase_anon_key

    # Resend Email Service
    RESEND_API_KEY=your_resend_api_key
    RESEND_FROM_EMAIL=waitlist@diasporaai.com # Email address to send from (must be verified in Resend)
    # RESEND_REPLY_TO_EMAIL=reply@diasporaai.com # Optional: Email address for replies
    ```

4.  **Set Up the Database:**
    Run the SQL schema to create the necessary tables:

    ```bash
    # Copy the contents of diaspora-ai-schema.sql and run it in your Supabase SQL Editor
    # Or use the Supabase CLI (if installed):
    supabase db reset
    ```

5.  **Run the Development Server:**

    ```bash
    pnpm dev
    ```

    Your Diaspora AI waitlist should now be running on `http://localhost:3000`.

6.  **Run the Email Preview Server (Optional):**
    If you're working on email templates, you can preview them locally:
    ```bash
    pnpm email
    ```
    This starts the email preview server on `http://localhost:3001`.


<h1>Diaspora AI - Global AI Travel Assistant & Waitlist</h1>

![Diaspora AI](https://diasporaai.dev/opengraph-image.png)

<p>
  🌍 <strong>Diaspora AI</strong> is your intelligent travel companion that revolutionizes how you search, book, and manage flights globally. Built for travelers worldwide, with special focus on African diaspora travel needs.
</p>

<p>
  <strong>🚀 Live Waitlist:</strong> <a href="https://diasporaai.dev" target="_blank" rel="noopener noreferrer">diasporaai.dev</a>
</p>

<p>
  <strong>👨‍💻 Created by:</strong> <a href="https://travisdevelops.com" target="_blank" rel="noopener noreferrer">Travis Moore</a> (Angelo Asante)
</p>

## 🎯 What is Diaspora AI?

Diaspora AI combines artificial intelligence with real-time flight data to create the most intelligent travel booking experience. Whether you're planning a trip home, exploring new destinations, or managing complex multi-city journeys, Diaspora AI is your AI-powered travel assistant.</p>

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fangeloasante%2Fdiaspora-ai-waitlist&env=SUPABASE_URL,SUPABASE_ANON_KEY,RESEND_API_KEY,RESEND_FROM_EMAIL,ADMIN_EXPORT_KEY&envDescription=Environment%20variables%20needed%20for%20Diaspora%20AI%20waitlist%20and%20admin%20features.&project-name=diaspora-ai-waitlist&repository-name=diaspora-ai-waitlist)

## ✨ Key Features

### 🤖 AI-Powered Intelligence
- **Smart Flight Search**: Advanced AI algorithms find the best routes and prices
- **Price Refresh Technology**: Real-time price monitoring and alerts
- **Intelligent Recommendations**: Personalized travel suggestions based on your preferences

### 🌐 Global Travel Tools  
- **Duffel API Integration**: Direct access to airline inventory and live pricing
- **Visa Requirements Checker**: Automated visa guidance for any destination
- **Multi-Currency Support**: Pay in your local currency worldwide
- **Travel Document Assistant**: AI-powered document preparation help

### 🚀 Modern Technology Stack
- **Next.js 15**: Latest React framework with App Router
- **Supabase**: Real-time PostgreSQL database with instant APIs
- **TypeScript**: Full type safety for reliable, maintainable code
- **Tailwind CSS**: Modern, responsive design system
- **Resend**: Professional email delivery system

## 🎯 Why Diaspora AI?

**Built for Global Travelers, Inspired by Diaspora Needs**

Diaspora AI was created by Travis Moore (Angelo Asante) to solve real travel challenges faced by diaspora communities and global travelers. Our AI-powered platform eliminates the frustration of complex flight searches, visa confusion, and booking complications.

### 🌟 What Sets Us Apart:

- **🧠 Intelligent by Design**: Our AI learns your travel patterns and preferences
- **🌍 Diaspora-Focused**: Specialized for complex international travel needs  
- **⚡ Real-Time Everything**: Live pricing, instant booking, real-time updates
- **🔒 Secure & Reliable**: Enterprise-grade security with transparent pricing
- **📱 Mobile-First**: Seamless experience across all devices
- **🎯 Personal Touch**: AI that understands your unique travel requirements

### 🚀 The Vision
We're building more than a booking platform — we're creating an intelligent travel ecosystem that makes global travel as simple as booking a local ride.

## Prerequisites: Setting Up External Services

Before you can run Diaspora AI locally, you'll need to configure these services:

### 1. Resend (Email Service)

Resend is used for sending transactional emails (e.g., signup confirmations).

1.  Create an account at [Resend](https://resend.com/).
2.  Add and verify your domain (e.g., `yourdomain.com`).
3.  Generate an API key from the "API Keys" section. This will be your `RESEND_API_KEY`.
4.  Note the email address you'll send from (e.g., `waitlist@yourdomain.com`). This will be your `RESEND_FROM_EMAIL`.

### 2. Supabase

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


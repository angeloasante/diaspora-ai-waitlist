import { NextResponse } from "next/server";
import { supabase, checkSupabaseConfig } from "~/lib/supabase";

// Admin endpoint to export all waitlist subscribers
export async function GET(request: Request) {
  try {
    checkSupabaseConfig();
    
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get("key");
    
    // Simple admin key check - you should set this in your environment
    const ADMIN_KEY = process.env.ADMIN_EXPORT_KEY || "diaspora-admin-2024";
    
    if (!adminKey || adminKey !== ADMIN_KEY) {
      console.log("Admin key check failed:", { 
        provided: adminKey, 
        expected: ADMIN_KEY,
        match: adminKey === ADMIN_KEY 
      });
      return NextResponse.json(
        { error: "Unauthorized - Invalid admin key" },
        { status: 401 }
      );
    }

    // Fetch all waitlist subscribers
    const { data: subscribers, error } = await supabase
      .from("waitlist")
      .select(`
        id,
        name,
        email,
        referral_code,
        referred_by,
        created_at
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching subscribers:", error);
      return NextResponse.json(
        { error: "Failed to fetch subscribers" },
        { status: 500 }
      );
    }

    const format = searchParams.get("format") || "csv";

    if (format === "json") {
      // Return JSON format
      return NextResponse.json({
        total: subscribers?.length || 0,
        subscribers: subscribers || [],
        exported_at: new Date().toISOString()
      });
    }

    // Default: CSV format for easy import to email services
    const csvHeaders = [
      "Name",
      "Email", 
      "Referral Code",
      "Referred By",
      "Signup Date"
    ];

    const csvRows = subscribers?.map(sub => [
      `"${sub.name || ''}"`,
      `"${sub.email}"`,
      `"${sub.referral_code}"`,
      `"${sub.referred_by || ''}"`,
      `"${new Date(sub.created_at).toLocaleDateString()}"`
    ]) || [];

    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map(row => row.join(","))
    ].join("\n");

    // Return CSV file
    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="diaspora-ai-subscribers-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });

  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get subscriber statistics
export async function POST(request: Request) {
  try {
    checkSupabaseConfig();
    
    const { adminKey } = await request.json();
    const ADMIN_KEY = process.env.ADMIN_EXPORT_KEY || "diaspora-admin-2024";
    
    if (!adminKey || adminKey !== ADMIN_KEY) {
      console.log("Stats admin key check failed:", { 
        provided: adminKey, 
        expected: ADMIN_KEY 
      });
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get subscriber statistics
    const { data: stats, error } = await supabase
      .from("waitlist")
      .select("created_at");

    if (error) {
      console.error("Stats fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }

    const totalSubscribers = stats?.length || 0;
    
    // Signups by day (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSignups = stats?.filter(s => 
      new Date(s.created_at) > thirtyDaysAgo
    ).length || 0;

    // Signups by day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const weeklySignups = stats?.filter(s => 
      new Date(s.created_at) > sevenDaysAgo
    ).length || 0;

    return NextResponse.json({
      total: totalSubscribers,
      recent_signups_30d: recentSignups,
      recent_signups_7d: weeklySignups,
      last_updated: new Date().toISOString()
    });

  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
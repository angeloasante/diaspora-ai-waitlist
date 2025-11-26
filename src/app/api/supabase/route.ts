import { NextResponse } from "next/server";
import { supabase, checkSupabaseConfig } from "~/lib/supabase";
import { generateCode } from "~/lib/utils";

export async function POST(request: Request) {
  try {
    // Check environment variables at runtime
    checkSupabaseConfig();
    const { email, firstname, referredBy } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existing, error: existingError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .single();

    if (existingError && existingError.code !== "PGRST116") {
      console.error("Error checking existing email:", existingError);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        { error: "You're already on the waitlist!" },
        { status: 409 }
      );
    }

    // Generate unique referral code
    const code = generateCode();

    // Find referrer by referral code
    let referrerId: string | null = null;
    if (referredBy) {
      const { data: referrer } = await supabase
        .from("waitlist")
        .select("id")
        .eq("referral_code", referredBy)
        .single();

      if (referrer) {
        referrerId = referrer.id;
      }
    }

    // Create new waitlist entry
    const { data: newEntry, error: insertError } = await supabase
      .from("waitlist")
      .insert({
        name: firstname || email.split("@")[0],
        email,
        referral_code: code,
        referred_by: referredBy || null,
        referrer_id: referrerId,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        {
          error: "Failed to save to database",
          details: insertError.message,
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Added to waitlist",
        code, // Used in form to generate share link
        id: newEntry.id,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Database API error:", errorMessage);
    return NextResponse.json(
      {
        error: "Failed to save to database",
        details: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}
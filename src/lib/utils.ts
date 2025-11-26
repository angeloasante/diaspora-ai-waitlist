import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { supabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function getWaitlistCount() {
  try {
    // Import and check config at runtime to avoid build-time issues
    const { checkSupabaseConfig } = await import("./supabase");
    checkSupabaseConfig();
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error fetching waitlist count:", error);
      throw error;
    }

    // Add base number for social proof (remove if you want pure count)
    const baseCount = 1000; // Starting number
    return (count || 0) + baseCount;
  } catch (error) {
    console.error("Error fetching waitlist count:", error);
    throw error;
  }
}

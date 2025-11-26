import { LandingPage } from "./page.client";
import { connection } from "next/server";
import { getWaitlistCount } from "~/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const [waitlistPeople] = await Promise.all([
      await getWaitlistCount(),
      // forces the page to be dynamically rendered
      await connection(),
    ]);

    return <LandingPage waitlistPeople={waitlistPeople} />;
  } catch (error) {
    // Fall back to default count if database is not configured (e.g., during build)
    console.warn("Could not fetch waitlist count, using fallback:", error);
    return <LandingPage waitlistPeople={12500} />;
  }
}

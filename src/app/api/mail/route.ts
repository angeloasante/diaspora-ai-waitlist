import { Resend } from "resend";
import { type NextRequest, NextResponse } from "next/server";

import WelcomeTemplate from "~/emails";

// Initialize services with placeholder values during build, real values at runtime
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

function checkMailConfig() {
	if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
		throw new Error("Missing required environment variables: RESEND_API_KEY and RESEND_FROM_EMAIL");
	}
}

export async function POST(request: NextRequest) {
	try {
		// Check environment variables at runtime
		checkMailConfig();

		const { email, name } = await request.json();

		const { data, error } = await resend.emails.send({
			from: process.env.RESEND_FROM_EMAIL || "",
			to: [email],
			subject: "Welcome to Diaspora AI - The Future of Flight Booking",
			react: WelcomeTemplate({ userFirstname: name }),
		});

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		if (!data) {
			return NextResponse.json(
				{ error: "Failed to send email" },
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 },
		);
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		console.error("Mail API error:", errorMessage);
		return NextResponse.json(
			{ error: "Failed to send email", details: errorMessage },
			{ status: 500 }
		);
	}
}
import type { Metadata } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import Header from "~/components/header";
import { ThemeProvider } from "~/providers/theme-provider";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const interTight = Inter_Tight({
	variable: "--font-inter-tight",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Diaspora AI — Intelligent Flight Booking Platform",
	description:
		"Join the waitlist for Diaspora AI, the intelligent flight booking platform that combines AI-powered search, visa requirements checking, and seamless booking experience for travelers worldwide.",
	keywords: ["flight booking", "AI travel", "diaspora", "intelligent booking", "visa requirements", "travel platform"],
	authors: [{ name: "Travis Moore" }],
	creator: "Travis Moore",
	openGraph: {
		title: "Diaspora AI — Intelligent Flight Booking Platform",
		description: "Join the waitlist for the future of AI-powered flight booking",
		url: "https://diaspora-ai.com",
		siteName: "Diaspora AI",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Diaspora AI — Intelligent Flight Booking Platform",
		description: "Join the waitlist for the future of AI-powered flight booking",
		creator: "@diaspora_ai",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<body
				className={`${interTight.variable} ${geistMono.variable} antialiased flex flex-col h-full`}
			>
				<ThemeProvider>
					<Header />
					<Toaster />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import Header from "~/components/header";
import { ThemeProvider } from "~/providers/theme-provider";
import StructuredData from "~/components/structured-data";

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
	metadataBase: new URL("https://diasporaai.dev"),
	title: "Diaspora AI — Global AI Travel Assistant & Waitlist",
	description:
		"Join the waitlist for Diaspora AI — a global AI-powered travel assistant that helps you search and refresh flight prices, book flights through Duffel, check visa requirements, and access smart travel tools. Built by Travis Moore.",
	keywords: [
		"Diaspora AI",
		"AI travel app",
		"travel assistant",
		"flight booking",
		"visa checker",
		"Duffel API",
		"travel AI",
		"waitlist",
		"Travis Moore",
	],
	authors: [{ name: "Travis Moore" }],
	creator: "Travis Moore",
	openGraph: {
		title: "Diaspora AI — AI Travel Assistant",
		description:
			"Join the waitlist for early access to Diaspora AI — your AI-powered flight search, pricing refresh, visa advisor and global travel companion.",
		url: "https://diasporaai.dev",
		siteName: "Diaspora AI",
		type: "website",
		images: [
			{
				url: "/opengraph-image.png",
				width: 1200,
				height: 630,
				alt: "Diaspora AI — Global AI Travel Assistant",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Diaspora AI — Global AI Travel Assistant",
		description:
			"Search flights, refresh prices, get visa help & join the waitlist for early access to Diaspora AI.",
		images: ["/opengraph-image.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/logo.png",
	},
	alternates: {
		canonical: "https://diasporaai.dev",
	},
	verification: {
		google: "64wivj40c9CocK6S5xiQwabC_gbSXOHA79FWrVgeU8Y",
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
				<StructuredData />
				<ThemeProvider>
					<Header />
					<Toaster />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

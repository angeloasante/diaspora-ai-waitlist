import Script from "next/script";

export default function StructuredData() {
	const organizationLdJson = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Diaspora AI",
		url: "https://diasporaai.dev",
		logo: "https://diasporaai.dev/logo.png",
		foundingDate: "2024",
		founder: {
			"@type": "Person",
			name: "Travis Moore",
			alternateName: "Angelo Asante",
			url: "https://travisdevelops.com",
		},
		description:
			"Diaspora AI is a global AI-powered travel assistant offering real-time flight search, booking via Duffel, visa guidance, and intelligent travel tools.",
	};

	const softwareAppLdJson = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Diaspora AI Travel Assistant",
		operatingSystem: "iOS, Android, Web",
		applicationCategory: "TravelApplication",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "GBP",
		},
		creator: {
			"@type": "Person",
			name: "Travis Moore",
		},
		url: "https://diasporaai.dev",
	};

	const websiteLdJson = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Diaspora AI",
		url: "https://diasporaai.dev",
		potentialAction: {
			"@type": "SubscribeAction",
			target: "https://diasporaai.dev#waitlist",
			description:
				"Join the Diaspora AI waitlist for early access and launch updates.",
		},
	};

	return (
		<>
			<Script
				id="organization-schema"
				type="application/ld+json"
				strategy="beforeInteractive"
			>
				{JSON.stringify(organizationLdJson)}
			</Script>
			<Script
				id="software-app-schema"
				type="application/ld+json"
				strategy="beforeInteractive"
			>
				{JSON.stringify(softwareAppLdJson)}
			</Script>
			<Script
				id="website-schema"
				type="application/ld+json"
				strategy="beforeInteractive"
			>
				{JSON.stringify(websiteLdJson)}
			</Script>
		</>
	);
}
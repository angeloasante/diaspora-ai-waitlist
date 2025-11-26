import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

export default function Faq() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 py-10">
			<div className="flex flex-col items-center justify-center gap-2 max-w-md">
				<h2 className="sm:text-3xl text-2xl font-semibold text-foreground">
					Frequently Asked Questions
				</h2>
				<p className="sm:text-base text-sm text-muted-foreground text-center">
					Everything you need to know about Diaspora AI. Find answers to common
					questions about flight booking and travel.
				</p>
			</div>
			<div className="w-full max-w-4xl">
				<Accordion
					type="single"
					collapsible
					className="w-full flex flex-col gap-4"
				>
					<AccordionItem value="item-1">
						<AccordionTrigger className="hover:no-underline">
							What is Diaspora AI?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Diaspora AI is an intelligent travel assistant that helps you search, compare, and book flights instantly. It uses real airline data and AI to simplify the entire travel process.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="hover:no-underline">
							Where does Diaspora AI get flight prices from?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							All flight prices and availability come directly from airline systems through our official Partners and IATA Certified.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="hover:no-underline">
							Are the prices shown real and final?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Yes. Diaspora AI refreshes flight offers before booking to ensure you always get the most accurate, live price.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-4">
						<AccordionTrigger className="hover:no-underline">
							Can I book round-trip flights?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Yes — we support one-way, round-trip, and multi-segment bookings. Diaspora AI correctly handles separate outbound and return offers.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-5">
						<AccordionTrigger className="hover:no-underline">
							Do I get a booking confirmation?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Yes. After payment, you receive: Your booking reference (PNR), Airline confirmation code, E-ticket number, and Receipt + Itinerary email.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-6">
						<AccordionTrigger className="hover:no-underline">
							Which payment methods do you accept?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Card payments (Visa, Mastercard, Amex) via Stripe, Apple Pay & Google Pay, and Local African cards (via Paystack for Ghana coming soon).
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-7">
						<AccordionTrigger className="hover:no-underline">
							Is my payment secure?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Yes. All payments are processed through PCI-compliant gateways (Stripe/Paystack). Diaspora AI never stores your card details.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-8">
						<AccordionTrigger className="hover:no-underline">
							How do I check in?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							24–48 hours before your flight, Diaspora AI sends you: Airline check-in link, Your flight details, and A QR code that takes you straight to the check-in page.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-9">
						<AccordionTrigger className="hover:no-underline">
							Does Diaspora AI help with visa information?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Yes. We use our advance systems to show visa requirements for your nationality + destination. We generate document checklists, step-by-step application guides, and embassy-specific instructions.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-10">
						<AccordionTrigger className="hover:no-underline">
							How can I get support?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							You can reach us via: In-app chat, WhatsApp support, or Email (info@diasporaai.dev).
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-11">
						<AccordionTrigger className="hover:no-underline">
							What makes Diaspora AI different?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Instant flight price refresh, Smart booking automation, Check-in reminders with QR, Visa advisor, AI assistance throughout your journey, Clean, simple chat-based interface, and Real airline integrations.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-12">
						<AccordionTrigger className="hover:no-underline">
							Is Diaspora AI available worldwide?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Yes. Anyone can search and book flights globally.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}

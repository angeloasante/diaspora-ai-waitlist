import * as React from 'react';
import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
	Tailwind,
} from '@react-email/components';

const WaitlistEmail = ({ userFirstname }: { userFirstname: string }) => {
	const currentYear = new Date().getFullYear();

	return (
		<Html>
			<Tailwind>
				<Head>
					<title>Welcome to Diaspora AI</title>
					<Preview>Thanks for joining our waitlist! We'll keep you in the loop.</Preview>
					<style>
						{`
              @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700&display=swap');
            `}
					</style>
				</Head>
				<Body className="bg-[#09090B] py-[40px]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
					<Container className="bg-[#18181B] rounded-[8px] mx-auto p-[32px] max-w-[600px]">
						<Section className="mt-[16px] text-center">
							<Text className="text-[28px] font-bold text-white m-0">
								Welcome to <span className="text-[#DFFF1A]">Waitly</span>
							</Text>

							<Text className="text-[18px] text-[#A1A1AA] mt-[16px] mb-[16px]">
								We're thrilled to have you join our waitlist
							</Text>

							<Hr className="border-solid border-[#27272A] my-[16px] w-[80px] mx-auto" />
						</Section>

						<Section>
							<Text className="text-[16px] leading-[24px] text-white mt-[32px]">
								Hi {userFirstname},
							</Text>

							<Text className="text-[16px] leading-[24px] text-[#E4E4E7]">
								Thanks for joining the waitlist for Diaspora AI! I'm Travis Moore, the creator behind this intelligent flight booking platform that's revolutionizing how people book travel, especially for the African diaspora.
							</Text>

							<Text className="text-[16px] leading-[24px] text-[#E4E4E7]">
								I'll personally keep you updated on our progress and let you know the moment Diaspora AI is ready for you to search, compare, and book flights instantly. Got questions or ideas in the meantime? Just hit reply – I read every email and would love to hear from you.
							</Text>

							<Section className="my-[32px] text-center">
								<Button
									className="bg-[#DFFF1A] text-[#09090B] font-bold py-[12px] px-[24px] rounded-[12px] no-underline text-center box-border"
									href="https://cal.com/idee8/quick-chat"
								>
									<span style={{ display: 'inline-flex', alignItems: 'center' }}>
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											style={{ marginRight: '8px' }}
										>
											<title>Calendar</title>
											<path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M8 14H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M12 14H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M16 14H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M8 18H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M16 18H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										Book a call
									</span>
								</Button>
							</Section>

							<Text className="text-[16px] leading-[24px] text-[#E4E4E7]">
								Want to see what we're up to? Follow us at <Link href="https://instagram.com/underrated_travis/" className="text-[#DFFF1A] underline">@underrated_travis</Link> for behind-the-scenes updates and early previews.
							</Text>

							<Text className="text-[16px] leading-[24px] text-[#E4E4E7] mt-[24px]">
								Cheers,
							</Text>

							<Text className="text-[16px] font-bold text-white mb-[32px]">
								Travis Develops
							</Text>
						</Section>

						<Hr className="border-solid border-[#27272A] my-[24px]" />

						<Section>
							<Text className="text-[12px] text-[#71717A] text-center m-0">
								© {currentYear} Travis Develops. All rights reserved.
							</Text>
							<Text className="text-[12px] text-[#71717A] text-center m-0">
								103 Desborough Road, Plymouth, UK
							</Text>
							<Text className="text-[12px] text-[#71717A] text-center mt-[16px]">
								<Link href="https://idee8.com/unsubscribe" className="text-[#DFFF1A]">
									Unsubscribe
								</Link>{' '}
								•{' '}
								<Link href="https://idee8.com/privacy" className="text-[#DFFF1A]">
									Privacy Policy
								</Link>
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default WaitlistEmail;
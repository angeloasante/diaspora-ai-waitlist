import { NextjsLogo, SupabaseLogo, ResendLogo } from "./svgs";
import { VercelLogo } from "./svgs";

export default function Powered() {
	return (
		<div className="flex flex-col items-center justify-center gap-12 py-12">
			<div className="flex flex-col items-center justify-center gap-2">
				<h3 className="text-foreground text-2xl font-semibold">Built with Modern Tech</h3>
				<p className="text-muted-foreground text-base">
					Diaspora AI uses cutting-edge technology to deliver the best flight booking experience.
				</p>
			</div>
			<div className="flex items-center sm:gap-12 gap-6">
				<NextjsLogo className="!dark:text-foreground" />
				<SupabaseLogo />
				<ResendLogo />
				<VercelLogo />
			</div>
		</div>
	);
}

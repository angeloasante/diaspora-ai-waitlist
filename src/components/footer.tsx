import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center gap-4 pb-4">
      <div className="flex flex-row justify-between">
        <ul className="flex flex-row gap-4">
          <li className="dark:text-muted-foreground dark:hover:text-foreground cursor-pointer">
            Powered by AI & Real Airline Data
          </li>
          <li className="dark:text-muted-foreground dark:hover:text-foreground">
            •
          </li>
          <li className="dark:text-muted-foreground dark:hover:text-foreground">
            <Link href="https://github.com/angeloasante">
              View on GitHub
            </Link>
          </li>
          <li className="dark:text-muted-foreground dark:hover:text-foreground">
            •
          </li>
          <li className="dark:text-muted-foreground dark:hover:text-foreground cursor-pointer">
            <Link href="https://travisdevelops.com">About the Creator</Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Diaspora AI. Created by{" "}
          <Link href="https://travisdevelops.com" className="font-semibold text-foreground">Travis Moore</Link>
        </p>
      </div>
    </footer>
  );
}

import { Button } from "@/components/ui/button";
import { BookCopy } from "lucide-react";
import Link from "next/link";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/landing" className="flex items-center space-x-2 pl-2">
            <BookCopy className="h-6 w-6" />
            <span className="font-bold">Student-App</span>
          </Link>
          <Button asChild className="ml-4">
            <Link href="/login">Jetzt starten</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © Johannes Schießl 2024 - 2025{" "}
            <Link
              href="/changelog"
              className="font-medium underline underline-offset-4"
            >
              Changelog
            </Link>{" "}
            |{" "}
            <Link
              href="/terms"
              className="font-medium underline underline-offset-4"
            >
              Nutzungsbedingungen
            </Link>{" "}
            |{" "}
            <Link
              href="/privacy"
              className="font-medium underline underline-offset-4"
            >
              Datenschutz
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

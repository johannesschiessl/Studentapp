"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { handleEmailLogin, LoginFormData } from "../actions";
import { BookCopy } from "lucide-react";

export default function LoginEmailPage() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const data: LoginFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = await handleEmailLogin(data);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <main className="flex max-h-screen min-h-screen flex-col items-center justify-center space-y-3 p-24">
      <div className="absolute left-8 top-8">
        <Link href="/" className="flex items-center space-x-2">
          <BookCopy className="h-6 w-6 text-indigo-500" />
          <span className="text-xl font-bold text-indigo-500">Studentapp</span>
        </Link>
      </div>
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Melde dich an
          </h1>
          <p className="text-sm text-muted-foreground">
            Melde dich mit deiner E-Mail an
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Anmelden..." : "Anmelden"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <Link
            href="/login"
            className="text-muted-foreground underline hover:text-primary"
          >
            Zurück zu den Anmeldemöglichkeiten
          </Link>
        </div>
      </div>

      <footer className="fixed bottom-5 w-64 text-center text-sm text-neutral-600">
        Mit der Anmeldung stimmen Sie unseren{" "}
        <Link className="underline" href="/terms">
          Nutzungsbedingungen
        </Link>{" "}
        und{" "}
        <Link className="underline" href="/privacy">
          Datenschutzerklärung
        </Link>{" "}
        zu.
      </footer>
    </main>
  );
}

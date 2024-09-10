import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { handleGoogleLogin, handleDiscordLogin } from "./actions";

export default async function LoginPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/home");
  }
  return (
    <main className="flex max-h-screen min-h-screen flex-col items-center justify-center space-y-3 p-24">
      <form action={handleGoogleLogin}>
        <Button type="submit">
          <Image
            src="/google.svg"
            className="mr-2"
            alt="Google Logo"
            width={20}
            height={20}
          />
          Sign in with Google
        </Button>
      </form>
      <form action={handleDiscordLogin}>
        <Button type="submit">
          <Image
            src="/discord.svg"
            className="mr-2"
            alt="Discord Logo"
            width={20}
            height={20}
          />
          Sign in with Discord
        </Button>
      </form>

      <footer className="fixed bottom-5 w-64 text-center text-xs text-neutral-600">
        By singing in you agree to our{" "}
        <Link className="underline" href="/terms">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/privacy">
          Privacy Policy
        </Link>
      </footer>
    </main>
  );
}

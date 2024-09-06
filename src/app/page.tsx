import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function Index() {
  const supabase = createClient();
  const { data: user, error } = supabase.auth.getUser();

  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  if (!user) {
    redirect("/login");
  } else {
    redirect("/home");
  }
}

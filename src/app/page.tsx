import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    redirect("/login");
  } else {
    redirect("/home");
  }
}

"use client";

import { useTranslation } from "@/hooks/use-translation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { removeHashFromDiscordUsername } from "@/lib/utils";

export default function Greeting() {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState<string>("");

  useEffect(() => {
    const supabase = createClient();

    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setFirstName(user?.user_metadata.name.split(" ")[0] || "");
    }

    fetchUser();
  }, []);

  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return <span>{t("home.greeting.morning")}</span>;
    } else if (currentHour < 18) {
      return <span>{t("home.greeting.afternoon")}</span>;
    } else {
      return <span>{t("home.greeting.evening")}</span>;
    }
  };

  const firstNameConverted = removeHashFromDiscordUsername(firstName);

  return (
    <div className="mb-10 text-center">
      <h1 className="text-3xl font-semibold">
        {getGreetingMessage()}, {firstNameConverted}
      </h1>
    </div>
  );
}

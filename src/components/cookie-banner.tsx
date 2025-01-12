"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasAccepted = Cookies.get("cookie-consent");
    if (!hasAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookie-consent", "true", {
      expires: 365,
      path: "/",
      sameSite: "lax",
    });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Wir verwenden Cookies, um deine Erfahrung zu verbessern. Durch die
          Nutzung dieser Website stimmst du unserer Verwendung von Cookies zu.
        </p>
        <Button onClick={acceptCookies} className="shrink-0">
          Okay
        </Button>
      </div>
    </div>
  );
}

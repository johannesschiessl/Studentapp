"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { setCookie, getCookie } from "cookies-next";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasAccepted = getCookie("cookie-consent");
    if (!hasAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie("cookie-consent", "true", {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          We use cookies to enhance your experience. By continuing to use this
          website, you agree to our use of cookies.
        </p>
        <Button onClick={acceptCookies} className="shrink-0">
          Okay
        </Button>
      </div>
    </div>
  );
}

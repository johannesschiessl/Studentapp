"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

export function useTranslation() {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    import(`@/dictionaries/${language}.json`)
      .then((module) => setTranslations(module.default))
      .catch((error) => console.error("Error loading translations:", error));
  }, [language]);

  const t = (key: string) => {
    return translations[key] || key;
  };

  return { t, language };
}

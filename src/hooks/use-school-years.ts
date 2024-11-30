"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface SchoolYear {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  user_id: string;
}

export function useSchoolYears() {
  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSchoolYears() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("school_years")
          .select("*")
          .order("start_date", { ascending: false });

        if (error) throw error;
        setSchoolYears(data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch school years"),
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchSchoolYears();
  }, []);

  return { schoolYears, isLoading, error };
}

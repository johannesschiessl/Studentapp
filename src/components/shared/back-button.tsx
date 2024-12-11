"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  url: string;
}

export default function BackButton({ url }: BackButtonProps) {
  const router = useRouter();
  function handleGoBack() {
    router.push(url);
  }

  return (
    <div
      className="fixed right-6 top-6 z-50 rounded-full bg-background p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={handleGoBack}
    >
      <X className="h-6 w-6" />
    </div>
  );
}

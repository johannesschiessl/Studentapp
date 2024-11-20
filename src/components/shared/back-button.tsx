"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <div
      className="fixed right-6 top-6 z-50 rounded-full bg-background p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={() => router.back()}
    >
      <X className="h-6 w-6" />
    </div>
  );
}

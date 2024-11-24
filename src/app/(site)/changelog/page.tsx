import Link from "next/link";
import { X } from "lucide-react";
import { ChangelogItem } from "@/components/site/changelog/changelog-item";
import { changelog } from "@/constants/changelog";

export default function ChangelogPage() {
  return (
    <>
      <Link
        href="/"
        className="fixed right-6 top-6 z-50 rounded-full bg-background p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <X className="h-6 w-6" />
      </Link>

      <div className="relative mx-auto max-w-4xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">Changelog</h1>
          <p className="mt-2 text-muted-foreground">
            Letzte Updates und Verbesserungen
          </p>
        </div>

        <div className="space-y-8">
          {changelog.map((entry, index) => (
            <ChangelogItem key={index} {...entry} />
          ))}
        </div>
      </div>
    </>
  );
}

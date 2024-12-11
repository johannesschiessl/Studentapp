import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

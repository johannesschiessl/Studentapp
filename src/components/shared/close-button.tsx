import { X } from "lucide-react";

export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-6 top-6 text-muted-foreground hover:text-primary"
    >
      <X />
    </button>
  );
}

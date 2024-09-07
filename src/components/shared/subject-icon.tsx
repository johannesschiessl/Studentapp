import * as lucideIcons from "lucide-react";
import { Folder } from "lucide-react";

export default function SubjectIcon({
  size = "default",
  icon,
  color,
}: {
  size: "lg" | "default";
  icon: string;
  color: string;
}) {
  const Icon = lucideIcons[icon as keyof typeof lucideIcons];
  if (!Icon) {
    console.error(`Icon "${icon}" not found in Lucide icons.`);
    return (
      <div className={`rounded-xl bg-neutral-100 p-2`}>
        <Folder className={`h-5 w-5 text-neutral-500`} />
      </div>
    );
  }
  return (
    <div className={`bg-${color}-100 rounded-xl p-2`}>
      <Icon
        className={`${size === "lg" ? "h-7 w-7" : "h-5 w-5"} text-${color}-500`}
      />
    </div>
  );
}

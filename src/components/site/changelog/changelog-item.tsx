import { Zap, Wrench, AlertCircle, Calendar } from "lucide-react";

export type ChangeType = "new" | "improvement" | "fix";

interface ChangelogItemProps {
  date: string;
  type: ChangeType;
  title: string;
  description: string;
}

export function ChangelogItem({
  date,
  type,
  title,
  description,
}: ChangelogItemProps) {
  const getIcon = (type: ChangeType) => {
    switch (type) {
      case "new":
        return <Zap className="h-6 w-6 text-blue-500" />;
      case "improvement":
        return <Wrench className="h-6 w-6 text-green-500" />;
      case "fix":
        return <AlertCircle className="h-6 w-6 text-amber-500" />;
    }
  };

  const getTypeColor = (type: ChangeType) => {
    switch (type) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "improvement":
        return "bg-green-100 text-green-800";
      case "fix":
        return "bg-amber-100 text-amber-800";
    }
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="mt-1 flex-shrink-0">{getIcon(type)}</div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <span className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-1 h-4 w-4" />
            {date}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
        <span
          className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold ${getTypeColor(type)}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>
    </div>
  );
}

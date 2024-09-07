export default function Badge({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`text-md px-4 py-2 font-medium bg-${color}-50 text-${color}-500 dark:bg-${color}-500 dark:text-${color}-50 flex items-center rounded-full`}
    >
      {children}
    </span>
  );
}

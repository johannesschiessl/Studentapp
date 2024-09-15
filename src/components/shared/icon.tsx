export default function Icon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`items-center rounded-full bg-neutral-100 p-2 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-300 ${className}`}
    >
      {children}
    </div>
  );
}

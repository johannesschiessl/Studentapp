export default function YearsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto mt-8 max-w-2xl p-6 md:mt-0">
      {children}
    </div>
  );
}

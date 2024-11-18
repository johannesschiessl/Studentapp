import Header from "@/components/sections/header";
import BottomBar from "@/components/sections/mobile/bottom-bar";
import Sidebar from "@/components/sections/sidebar";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getCurrentSchoolYearId } from "../actions/school-year";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const currentSchoolYearId = await getCurrentSchoolYearId();

  if (currentSchoolYearId === 0) {
    return redirect("/years");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <SidebarProvider>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <div className="mx-auto w-full px-4 py-24">{children}</div>
          </div>
        </div>
      </SidebarProvider>
      <BottomBar />
    </>
  );
}

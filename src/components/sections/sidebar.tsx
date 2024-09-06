import React from "react";
import { getSubjectsForCurrentSchoolYear } from "@/app/actions/subjects";
import { SidebarContent } from "./sidebar-content";

export default async function Sidebar() {
  const subjects = await getSubjectsForCurrentSchoolYear();

  return <SidebarContent subjects={subjects} />;
}

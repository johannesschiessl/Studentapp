import React from "react";
import { getUser } from "@/app/actions/user";
import { HeaderContent } from "./header-content";
import {
  getCurrentSchoolYearId,
  getSchoolYear,
} from "@/app/actions/school-year";

export default async function Header() {
  const user = await getUser();
  const settings = (await getSchoolYear(await getCurrentSchoolYearId()))
    .settings;

  return <HeaderContent user={user} settings={settings} />;
}

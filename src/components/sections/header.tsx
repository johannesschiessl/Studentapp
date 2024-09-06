import React from "react";
import { getUser } from "@/app/actions/user";
import { HeaderContent } from "./header-content";

export default async function Header() {
  const user = await getUser();

  return <HeaderContent user={user} />;
}

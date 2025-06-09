"use client";
import { FC, PropsWithChildren } from "react";

import Header from "@/components/header/Header";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const validRoles = ["user", "admin"] as const;
  const cookieRole = Cookies.get("role") as (typeof validRoles)[number] | null;
  const role = user?.role ?? cookieRole ?? null;
  return (
    <>
      <Header role={role} />
      <main>{children}</main>
    </>
  );
};

export default Layout;

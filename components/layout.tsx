"use client";
import { FC, PropsWithChildren } from "react";

import Header from "@/components/header/Header";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const validRoles = ["user", "admin"] as const;
  const cookieRole = Cookies.get("role");
  const role =
    user?.role ??
    (cookieRole &&
    validRoles.includes(cookieRole as (typeof validRoles)[number])
      ? (cookieRole as (typeof validRoles)[number])
      : null);
  return (
    <>
      <Header role={role} />
      <main>{children}</main>
    </>
  );
};

export default Layout;

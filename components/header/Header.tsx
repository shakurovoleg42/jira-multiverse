"use client";
import React from "react";
import { ModeToggle } from "./components/theme-toggler";
import Link from "next/link";
import { Container } from "../Container";
import clsx from "clsx";
import ProfileMenu from "./components/profile";
import { User } from "@/types/user";
import IsAdminUsers from "./components/isAdminUsers";

const Header = ({ role }: { role: User["role"] }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Container className="flex items-center justify-between p-4 border-b-2 rounded-[15px] shadow-sm flex-wrap gap-4 md:gap-0">
        <Link href="/">
          <img src="/favicon.svg" className="w-8 h-8" alt="Mini Jira Logo" />
        </Link>
      </Container>
    );
  }

  return (
    <Container
      className={clsx(
        "flex items-center justify-between p-4 border-b-2 rounded-[15px] shadow-sm flex-wrap gap-4 md:gap-0"
      )}
    >
      {role && (
        <div className="flex items-center space-x-6">
          <Link href="/">
            <img src="/favicon.svg" className="w-8 h-8" alt="Mini Jira Logo" />
          </Link>
          <ul className="flex space-x-4 flex-row font-bold">
            <li>
              <Link href="/" className="hover:border-b-[3px] border-amber-500">
                Home
              </Link>
            </li>
            <IsAdminUsers role={role} />
          </ul>
        </div>
      )}
      <div className="flex flex-row space-x-4">
        <ModeToggle />
        {role && <ProfileMenu initialRole={role} />}
      </div>
    </Container>
  );
};

export default Header;

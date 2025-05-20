/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./theme-toggler";
import { Button } from "./ui/button";
import Link from "next/link";
import { Container } from "./container";
import clsx from "clsx";
import { useTheme } from "next-themes";

import ProfileMenu from "./profile";

const Header = () => {
  const { theme } = useTheme();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const cleanRole = role ? role.replace(/"/g, "") : null;

  return (
    <Container
      className={clsx(
        "flex items-center justify-between p-4 border-b-2 rounded-[15px] shadow-sm flex-wrap gap-4 md:gap-0"
      )}
    >
      <div className="flex items-center space-x-6">
        <Link href="/">
          <img src="/favicon.svg" className="w-8 h-8" alt="Mini Jira Logo" />
        </Link>
        <ul className="flex space-x-4 flex-row font-bold">
          <li>
            <Link
              href="/"
              className={clsx(
                "hover:border-b-[3px] border-amber-500",
                theme === "dark" ? "text-dark-background" : null
              )}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className={clsx(
                "hover:border-b-[3px] border-amber-500",
                theme === "dark" ? "text-dark-background" : null
              )}
            >
              Dashboard
            </Link>
          </li>
          <li>
            {cleanRole === "admin" && (
              <Link
                href="/users"
                className={clsx(
                  "hover:border-b-[3px] border-amber-500",
                  theme === "dark" ? "text-dark-background" : null
                )}
              >
                Users
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="flex flex-row space-x-4">
        <ModeToggle />
        <div>
          <Button className="bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.01] shadow-md shadow-amber-600/30">
            <ProfileMenu />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Header;

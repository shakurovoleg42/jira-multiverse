/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "../theme-toggler";
import { Button } from "../ui/button";
import Link from "next/link";
import { Container } from "../container";
import clsx from "clsx";
import { useTheme } from "next-themes";

import ProfileMenu from "./components/profile";
import { User } from "@/types/user";
import IsAdminUsers from "./components/isAdminUsers";

const Header = ({ role }: { role: User["role"] }) => {
  const { theme } = useTheme();

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
            <Link href="/" className="hover:border-b-[3px] border-amber-500">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="hover:border-b-[3px] border-amber-500"
            >
              Dashboard
            </Link>
          </li>
          <IsAdminUsers role={role ?? ""} />
        </ul>
      </div>
      <div className="flex flex-row space-x-4">
        <ModeToggle />
        <div>
          <ProfileMenu initialRole={role ?? null} />
        </div>
      </div>
    </Container>
  );
};

export default Header;

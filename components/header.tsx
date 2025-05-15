/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { ModeToggle } from "./theme-toggler";
import { Button } from "./ui/button";
import Link from "next/link";
import { Container } from "./container";
import clsx from "clsx";
import { useTheme } from "next-themes";

function Profile() {
  return (
    <div className="flex items-center space-x-2 p-6">
      <img
        src="https://avatars.githubusercontent.com/u/121859456?v=4"
        className="w-8 h-8 rounded-full"
        alt="Profile"
      />
      <span className="text-sm font-bold">Nickname</span>
    </div>
  );
}

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { theme } = useTheme();

  return (
    <Container
      className={clsx(
        "flex items-center justify-between p-4 border-b-2 rounded-[15px] shadow-sm"
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
                "hover:border-b-[3px] border-blue-400",
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
                "hover:border-b-[3px] border-blue-400",
                theme === "dark" ? "text-dark-background" : null
              )}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className={clsx(
                "hover:border-b-[3px] border-blue-400",
                theme === "dark" ? "text-dark-background" : null
              )}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-row space-x-4">
        <ModeToggle />
        <div>
          <Button onClick={() => setIsLogged(!isLogged)}>
            {isLogged ? <Profile /> : "Login"}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Header;

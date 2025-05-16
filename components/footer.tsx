/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import { useTheme } from "next-themes";
import React from "react";

function Footer() {
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        "flex items-center justify-center bottom-0 border-t-2",
        theme === "dark"
          ? "bg-[#0c0c0c]  border-white"
          : "bg-white border-black"
      )}
    >
      {/* <img src="/favicon.svg" alt="" /> */}
    </div>
  );
}

export default Footer;

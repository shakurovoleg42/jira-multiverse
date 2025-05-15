"use client";
import clsx from "clsx";
import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";

function TaskCard() {
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        "flex flex-row items-center justify-between max-w-[380px] w-full  border-2 rounded-[10px] p-4 gap-4",
        theme === "dark"
          ? "bg-[#a8a9eb] text-[#ffffff]"
          : "bg-[#ffffff] text-[#000000]"
      )}
    >
      <div className="flex flex-col text-start">
        <b>Title</b>
        <p className="text-sm text-gray-500 truncate max-w-[300px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero nihil
          optio laboriosam hic vitae ullam asperiores tempora, minus sunt eius,
          nemo eligendi assumenda quam amet consequuntur praesentium impedit id
          quasi.
        </p>
      </div>
      <Button>
        <ArrowUpRight />
      </Button>
      {/* Будет открываться диалоговое окно и потом моно будет
      полностью перейти на страницу таски (мб) */}
    </div>
  );
}

export default TaskCard;

"use client";
import clsx from "clsx";
import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";
import { TaskCardProps } from "@/app/types/tasks";

function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const { theme } = useTheme();

  const changeStatus = () => {
    let newStatus = task.status;
    switch (task.status) {
      case "todo":
        newStatus = "progress";
        break;
      case "progress":
        newStatus = "done";
        break;
      case "done":
        newStatus = "todo";
        break;
    }
    onStatusChange(task.id, newStatus);
  };

  return (
    <div
      className={clsx(
        "flex flex-row items-center justify-between max-w-[380px] w-full border-2 rounded-[10px] p-4 gap-4",
        theme === "dark"
          ? "bg-gray-800 border-gray-600 text-gray-100 shadow-md hover:border-purple-400"
          : "bg-white border-gray-200 text-gray-800 shadow-md hover:border-indigo-300"
      )}
    >
      <div className="flex flex-col text-start">
        <b>{task.title}</b>
        <p className="text-sm truncate max-w-[300px]">{task.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Author: {task.createdBy}
        </p>
      </div>
      <Button
        onClick={changeStatus}
        variant="ghost"
        className={clsx(
          "hover:bg-opacity-20",
          theme === "dark"
            ? "text-purple-300 hover:bg-purple-500"
            : "text-indigo-500 hover:bg-indigo-200"
        )}
      >
        <ArrowUpRight />
      </Button>
    </div>
  );
}

export default TaskCard;

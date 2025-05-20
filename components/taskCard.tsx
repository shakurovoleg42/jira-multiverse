"use client";
import clsx from "clsx";
import React from "react";
import { useTheme } from "next-themes";
import { Settings } from "lucide-react";
import { TaskCardProps } from "../pages/types/tasks"; // TaskStatus

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function TaskCard({ task }: TaskCardProps) {
  const { theme } = useTheme();

  // const changeStatus = (newStatus: TaskStatus) => {
  //   if (onStatusChange) {
  //     onStatusChange(task.id, newStatus);
  //   }
  // };

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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Settings />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => console.log(" should be opened")}>
            Open
          </DropdownMenuItem>
          <b className="">Edit</b>
          <DropdownMenuItem onClick={() => console.log(" should be edited")}>
            Edit
          </DropdownMenuItem>
          <b className="">Switch to:</b>
          {/* <DropdownMenuItem onClick={() => changeStatus("todo")}>
            ToDo
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={() => changeStatus("progress")}>
            In-progress
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeStatus("done")}>
            Done
          </DropdownMenuItem> */}
          <b className="">Delete</b>
          <DropdownMenuItem onClick={() => console.log(" should be deleted")}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TaskCard;

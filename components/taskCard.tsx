"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { BookOpen, Edit, Settings, Trash, Trash2 } from "lucide-react";
import { TaskCardProps } from "../types/tasks"; // TaskStatus

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { taskService } from "@/service/task.service";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

function TaskCard({ task, role, onDelete }: TaskCardProps) {
  const { theme } = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [typeDialog, setTypeDialog] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [editTaskData, setEditTaskData] = useState({
    id: task.id,
    title: task.title || "",
    description: task.description || "",
  });

  const handleOpenDialog = (type: string) => {
    if (type === "Edit") {
      setIsDisabled(false);
      setTypeDialog("Edit");
    }
    if (type === "Open") {
      setIsDisabled(true);
      setTypeDialog("Open");
    }
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await taskService.delete(task.id);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("Form submitted");
    console.log("Task data:", editTaskData);
    setIsOpen(false);
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
        <b className="truncate max-w-[300px]">{task.title}</b>
        <p className="text-sm truncate max-w-[300px]">{task.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Author: {task.createdBy}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {isDeleting ? (
            <svg
              className="animate-spin h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C4.477 0 0 4.477 0 10h4z"
              ></path>
            </svg>
          ) : (
            <Settings />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-bold">Options:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleOpenDialog("Open")}
            className="flex flex-row"
          >
            <BookOpen />
            Open
          </DropdownMenuItem>
          {role === "admin" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleOpenDialog("Edit")}
                className="flex flex-row"
              >
                <Edit />
                Edit
              </DropdownMenuItem>
            </>
          )}

          {(role === "admin" ||
            (role === "user" && task.createdBy === "user")) && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                className="flex flex-row"
                disabled={isDeleting}
              >
                <Trash className="mr-2 h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* alert dialog for Edit / Open */}

      <AlertDialog open={isOpen}>
        {/* <AlertDialogTrigger asChild>
          <button>close</button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <div>
              <AlertDialogTitle>
                {typeDialog} mode |{" "}
                {typeDialog === "Open" ? "read only" : "Hi Admin`ушка"}
              </AlertDialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 hover:cursor-pointer"
              >
                ❌
              </button>
            </div>

            <AlertDialogDescription>
              <form action="" className="flex flex-col gap-4 font-bold ">
                <Input
                  placeholder="Task Title"
                  disabled={isDisabled}
                  value={editTaskData.title}
                  onChange={(e) =>
                    setEditTaskData({ ...editTaskData, title: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Task Description"
                  disabled={isDisabled}
                  value={editTaskData.description}
                  onChange={(e) =>
                    setEditTaskData({
                      ...editTaskData,
                      description: e.target.value,
                    })
                  }
                />
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsOpen(false)}
              className="hover:text-[#ffffff]"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default TaskCard;

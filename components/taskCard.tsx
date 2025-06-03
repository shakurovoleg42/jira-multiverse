"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { BookOpen, Edit, Settings, Trash } from "lucide-react";
import { TaskCardProps } from "../types/tasks";
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
} from "@/components/ui/alert-dialog";
import { taskService } from "@/service/task.service";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type DialogMode = "view" | "edit" | "delete";

function TaskCard({ task, role, onDelete, onUpdate }: TaskCardProps) {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>("view");
  const [taskData, setTaskData] = useState({
    id: task.id,
    title: task.title || "",
    description: task.description || "",
  });

  const handleDialogOpen = (mode: DialogMode) => {
    setDialogMode(mode);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (dialogMode !== "edit") return;

    setIsLoading(true);
    try {
      await taskService.edit(taskData.id, taskData.title, taskData.description);
      onUpdate?.();
      setDialogOpen(false);
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("Not Authenticated");
      } else if (error.response?.status === 404) {
        alert("Task not found");
      } else if (error.response?.status === 400) {
        alert("Title should be unique");
      } else if (error.response?.status === 403) {
        alert("Not Authorized");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
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
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            {isLoading ? (
              <div className="animate-spin">↻</div>
            ) : (
              <Settings className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => handleDialogOpen("view")}>
            <BookOpen className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>

          {(role === "admin" || task.createdBy === "user") && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDialogOpen("edit")}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </>
          )}

          {(role === "admin" || task.createdBy === "user") && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDialogOpen("delete")}
                disabled={isLoading}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogMode === "view" && "Task Details"}
              {dialogMode === "edit" && "Edit Task"}
              {dialogMode === "delete" && "Confirm Deletion"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogMode === "delete" ? (
                `Are you sure you want to delete "${task.title}"? This action cannot be undone.`
              ) : (
                <div className="space-y-4 pt-2">
                  <Input
                    name="title"
                    placeholder="Task Title"
                    value={taskData.title}
                    onChange={handleInputChange}
                    disabled={dialogMode === "view"}
                  />
                  <Textarea
                    name="description"
                    placeholder="Task Description"
                    value={taskData.description}
                    onChange={handleInputChange}
                    disabled={dialogMode === "view"}
                  />
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {dialogMode === "delete" ? (
              <AlertDialogAction
                onClick={onDelete}
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            ) : (
              dialogMode === "edit" && (
                <AlertDialogAction onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </AlertDialogAction>
              )
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default TaskCard;

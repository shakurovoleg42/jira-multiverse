"use client";
import React from "react";
import TaskCard from "./taskCard";
import { Task } from "../../../types/tasks";
import { taskService } from "@/service/task.service";
import clsx from "clsx";

interface TasksTableProps {
  initialTasks: Task[];
  role: string | null;
  newTaskId?: number | null;
}

function TasksTable({ initialTasks, role, newTaskId }: TasksTableProps) {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks || []);
  const [deletingTaskId, setDeletingTaskId] = React.useState<number | null>(
    null
  );
  const [updatingTaskId, setUpdatingTaskId] = React.useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchTasks = async () => {
      const newTasks = await taskService.list();
      setTasks(newTasks);
    };
    fetchTasks();
  }, []);

  React.useEffect(() => {
    if (newTaskId) {
      handleInsertOrUpdateTask(newTaskId);
    }
  }, [newTaskId]);

  const handleInsertOrUpdateTask = React.useCallback(async (taskId: number) => {
    setIsLoading(true);
    setUpdatingTaskId(taskId);
    try {
      const newTask = await taskService.getById(taskId);

      setTasks((prevTasks) => {
        const existing = prevTasks.find((task) => task.id === taskId);
        if (existing) {
          return prevTasks.map((task) =>
            task.id === taskId ? { ...task, ...newTask } : task
          );
        } else {
          return [newTask, ...prevTasks];
        }
      });
    } catch (error: any) {
      if (error.response?.status === 404) {
        alert("Task not found");
      } else if (error.response?.status === 401) {
        alert("Not Authenticated");
      }
    } finally {
      setIsLoading(false);
      setUpdatingTaskId(null);
    }
  }, []);

  const handleDeleteTask = async (taskId: number) => {
    setDeletingTaskId(taskId);
    try {
      await taskService.delete(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error: any) {
      if (error.response?.status === 404) {
        alert("Task not found");
      } else if (error.response?.status === 401) {
        alert("Not Authenticated");
      } else if (error.response?.status === 403) {
        alert("Not Authorized");
      }
    } finally {
      setDeletingTaskId(null);
    }
  };

  return (
    <tbody className="bg-transparent">
      <tr className="align-top">
        <td className="w-full px-4 md:px-6 py-4 bg-blue-50 dark:bg-blue-900/20">
          {!Array.isArray(tasks) || tasks.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400 select-none">
                No tasks
              </p>
            </div>
          ) : (
            <div
              className={clsx(
                "flex flex-col gap-4 justify-center",
                isLoading === true ? "opacity-50" : "opacity-100"
              )}
            >
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5"
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
              )}
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`transition-opacity duration-300 ${
                    deletingTaskId === task.id ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <TaskCard
                    task={task}
                    role={role}
                    onDelete={() => handleDeleteTask(task.id)}
                    onUpdate={() => handleInsertOrUpdateTask(task.id)}
                    isUpdating={updatingTaskId === task.id}
                  />
                </div>
              ))}
            </div>
          )}
        </td>
      </tr>
    </tbody>
  );
}

export default TasksTable;

"use client";
import React from "react";
import TaskCard from "./taskCard";
import { Task } from "../types/tasks";
import { taskService } from "@/service/task.service";

interface TasksTableProps {
  initialTasks: Task[];
  role: string | null;
}

function TasksTable({ initialTasks, role }: TasksTableProps) {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks || []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deletingTaskId, setDeletingTaskId] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    const fetchTasks = async () => {
      const newTasks = await taskService.list();
      setTasks(newTasks);
    };
    fetchTasks();
  }, [initialTasks]);

  const handleDeleteTask = async (taskId: number) => {
    setDeletingTaskId(taskId);
    try {
      await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });

      setTimeout(() => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        setDeletingTaskId(null);
      }, 300);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <tbody className="bg-transparent">
      <tr className="align-top">
        <td className="w-full px-4 md:px-6 py-4 bg-blue-50 dark:bg-blue-900/20">
          {isLoading ? (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : !Array.isArray(tasks) || tasks.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400 select-none">
                No tasks
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4  justify-center">
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

"use client";
import React from "react";
import TaskCard from "./taskCard";
import { Task } from "../../../types/tasks";
import { taskService } from "@/service/task.service";

interface TasksTableProps {
  initialTasks: Task[];
  role: string | null;
}

function TasksTable({ initialTasks, role }: TasksTableProps) {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks || []);
  const [deletingTaskId, setDeletingTaskId] = React.useState<number | null>(
    null
  );
  const [updatingTaskId, setUpdatingTaskId] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    const fetchTasks = async () => {
      const newTasks = await taskService.list();
      setTasks(newTasks);
    };
    fetchTasks();
  }, []);

  const handleUpdateTask = React.useCallback(async (taskId: number) => {
    setUpdatingTaskId(taskId);
    try {
      const updatedTask = await taskService.getById(taskId);

      if (!updatedTask) {
        console.error("Task not found");
        return;
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error: any) {
      if (error.response?.status === 404) {
        alert("Task not found");
      } else if (error.response?.status === 401) {
        alert("Not Authenticated");
      }
    } finally {
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
            <div className="flex flex-col gap-4 justify-center">
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
                    onUpdate={() => handleUpdateTask(task.id)}
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

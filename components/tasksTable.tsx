"use client";
import React, { useEffect, useState } from "react";
import TaskCard from "./taskCard";
import { Task } from "../types/tasks";
import { taskService } from "../service/task.service";

const initialTasks: Task[] = [];

function TasksTable({ role }: { role: string | null }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoading, setIsLoading] = useState(true);

  const getTasks = async () => {
    try {
      const response = await taskService.list();
      setTasks(response);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleDelete = () => {
    getTasks();
  };

  return (
    <tbody className="bg-transparent">
      <tr className="align-top">
        {/* ToDo Column */}
        {isLoading ? (
          <td className="w-1/1 px-4 md:px-6 py-4 bg-blue-50 dark:bg-blue-900/20">
            <div className="flex items-center justify-center h-screen">
              <video src="/anim.webm" autoPlay loop muted></video>
            </div>
          </td>
        ) : (
          <td className="w-1/1 px-4 md:px-6 py-4 bg-blue-50 dark:bg-blue-900/20">
            {tasks.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400 select-none">
                  No tasks in progress
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    role={role}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </td>
        )}
      </tr>
    </tbody>
  );
}

export default TasksTable;

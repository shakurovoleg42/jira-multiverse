"use client";
import React, { useEffect } from "react";
import TaskCard from "./taskCard";
import { Task } from "@/app/types/tasks";
import { taskService } from "@/app/service/task.service";

const initialTasks: Task[] = [];

function TasksTable() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await taskService.list();
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  console.log(tasks);

  return (
    <tbody className="bg-transparent">
      <tr className="align-top">
        {/* ToDo Column */}
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
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </td>
      </tr>
    </tbody>
  );
}

export default TasksTable;

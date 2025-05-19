"use client";
import React from "react";
import TaskCard from "./taskCard";
import { Task } from "@/app/types/tasks";
import { filterTasksByStatus } from "@/app/helpers/taskFilterStatuses";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "Description for Task 1",
    status: "todo",
    createdBy: "User",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description for Task 2",
    status: "todo",
    createdBy: "User",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description for Task 3",
    status: "progress",
    createdBy: "User",
  },
  {
    id: 4,
    title: "Task 4",
    description: "Description for Task 4",
    status: "progress",
    createdBy: "User",
  },
];

function TasksTable() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const { todos, progress, done } = filterTasksByStatus(tasks);

  const handleStatusChange = (taskId: number, newStatus: Task["status"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <tbody className="bg-transparent">
      <tr className="align-top">
        {/* ToDo Column */}
        <td className="w-1/3 px-4 md:px-6 py-4 bg-blue-50 dark:bg-blue-900/20  xl:min-w-[428px]">
          {todos.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400 select-none">
                No tasks in progress
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {todos.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </td>
        {/* In Progress Column */}
        <td className="w-1/3 px-4 md:px-6 py-4 bg-blue-50 dark:bg-blue-900/20  xl:min-w-[428px]">
          {progress.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400 select-none">
                No tasks in progress
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {progress.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </td>
        {/* Done Column */}
        <td className="w-1/3 px-4 md:px-6 py-4 bg-blue-50 dark:bg-blue-900/20  xl:min-w-[428px]">
          {done.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400 select-none">
                No tasks in progress
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {done.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </td>
      </tr>
    </tbody>
  );
}

export default TasksTable;

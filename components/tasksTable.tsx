"use client";
import React from "react";
import TaskCard from "./taskCard";
import { Task } from "@/app/types/tasks";

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
  {
    id: 5,
    title: "Task 5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "todo",
    createdBy: "User",
  },
  {
    id: 6,
    title: "Task 6",
    description: "Description for Task 6",
    status: "todo",
    createdBy: "User",
  },
  {
    id: 7,
    title: "Task 7",
    description: "Description for Task 7",
    status: "todo",
    createdBy: "User",
  },
  {
    id: 8,
    title: "Task 8",
    description: "Description for Task 8",
    status: "todo",
    createdBy: "User",
  },
  {
    id: 9,
    title: "Task 9",
    description: "Description for Task 9",
    status: "progress",
    createdBy: "User",
  },
  {
    id: 10,
    title: "Task 10",
    description: "Description for Task 10",
    status: "done",
    createdBy: "User",
  },
  {
    id: 11,
    title: "Task 11",
    description: "Description for Task 11",
    status: "todo",
    createdBy: "User",
  },
  {
    id: 12,
    title: "Task 12",
    description: "Description for Task 12",
    status: "progress",
    createdBy: "User",
  },
  {
    id: 13,
    title: "Task 13",
    description: "Description for Task 13",
    status: "done",
    createdBy: "User",
  },
  {
    id: 14,
    title: "Task 14",
    description: "Description for Task 14",
    status: "todo",
    createdBy: "User",
  },
  {
    id: 15,
    title: "Task 15",
    description: "Description for Task 15",
    status: "progress",
    createdBy: "User",
  },
  {
    id: 16,
    title: "Task 16",
    description: "Description for Task 16",
    status: "done",
    createdBy: "User",
  },
  {
    id: 17,
    title: "Task 17",
    description: "Description for Task 17",
    status: "todo",
    createdBy: "User",
  },
  {
    id: 18,
    title: "Task 18",
    description: "Description for Task 18",
    status: "progress",
    createdBy: "User",
  },
];

function TasksTable() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const handleStatusChange = (taskId: number, newStatus: Task["status"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const todos = tasks.filter((task) => task.status === "todo");
  const progress = tasks.filter((task) => task.status === "progress");
  const done = tasks.filter((task) => task.status === "done");

  return (
    <tbody className="bg-transparent">
      <tr className="align-top">
        {/* ToDo Column */}
        <td className="w-1/3 px-4 md:px-6 py-4 bg-blue-50 dark:bg-blue-900/20  xl:min-w-[428px]">
          <div className="flex flex-col gap-4">
            {todos.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
              />
            ))}
            {todos.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400 select-none">
                  No tasks in progress
                </p>
              </div>
            )}
          </div>
        </td>
        {/* In Progress Column */}
        <td className="w-1/3 px-4 md:px-6 py-4 bg-amber-50 dark:bg-amber-900/20 xl:min-w-[428px]">
          <div className="flex flex-col gap-4">
            {progress.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
              />
            ))}
            {progress.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400 select-none">
                  No tasks in progress
                </p>
              </div>
            )}
          </div>
        </td>
        {/* Done Column */}
        <td className="w-1/3 px-4 md:px-6 py-4 bg-green-50 dark:bg-green-900/20 xl:min-w-[428px]">
          <div className="flex flex-col gap-4">
            {done.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
              />
            ))}
            {done.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400 select-none">
                  No tasks in progress
                </p>
              </div>
            )}
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default TasksTable;

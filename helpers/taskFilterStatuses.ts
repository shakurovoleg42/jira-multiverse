import { Task } from "../types/tasks";

export const filterTasksByStatus = (tasks: Task[]) => {
  return {
    todos: tasks.filter((task) => task.status === "todo"),
    progress: tasks.filter((task) => task.status === "progress"),
    done: tasks.filter((task) => task.status === "done"),
  };
};

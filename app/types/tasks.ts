export type TaskStatus = "todo" | "progress" | "done";

export interface Task {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  status: TaskStatus;
}

export interface TaskCardProps {
  task: Task;
  // onStatusChange: (taskId: number, newStatus: TaskStatus) => void;
}

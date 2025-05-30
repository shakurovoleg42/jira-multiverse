export interface Task {
  id: number;
  title: string;
  description: string;
  createdBy: string;
}

export interface TaskCardProps {
  task: Task;
  role: string | null;
  onDelete?: () => void;
  onUpdate?: () => void;
  isUpdating: boolean;
  setIsUpdate?: (id: number | null) => void;
}

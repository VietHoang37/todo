export type Priority = "low" | "medium" | "high";

export type TaskType = {
  id: number;
  name: string;
  priority: Priority;
  description?: string | undefined | null;
  deadline?: Date | undefined | null;
  completed?: boolean | undefined | null;
};

export type ListType = {
  id: string;
  name: string;
  tasks: TaskType[];
  uid: string;
};

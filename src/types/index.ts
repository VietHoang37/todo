export type Priority = "low" | "medium" | "high";

export type TaskType = {
  id?: string;
  name: string;
  priority: Priority;
  description?: string;
  deadline?: Date;
  completed?: boolean;
  tempKey?: string;
  listId?: string;
};

export type ListType = {
  name: string;
  uid: string;
  tasks: TaskType[];
  id?: string;
};

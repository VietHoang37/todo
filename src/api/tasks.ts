import { TaskType } from "@/types";
import AxiosClient from "./axios";

export const deleteTask = async (
  listId: string,
  taskId: string
): Promise<void> => {
  try {
    const response = await AxiosClient.delete(
      `/lists/${listId}/tasks/${taskId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createTasks = async (
  listId: string,
  tasks: TaskType[]
): Promise<void> => {
  try {
    for (const task of tasks) {
      await AxiosClient.post(`/lists/${listId}/tasks`, task);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTasks = async (listId: string): Promise<TaskType[]> => {
  try {
    const response = await AxiosClient.get(`/lists/${listId}/tasks`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTask = async (
  listId: string,
  taskId: string,
  task: TaskType
): Promise<TaskType> => {
  try {
    const response = await AxiosClient.put(
      `/lists/${listId}/tasks/${taskId}`,
      task
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const completeTask = async (
  listId: string,
  taskId: string,
  completed: boolean
): Promise<TaskType> => {
  try {
    const response = await AxiosClient.put(`/lists/${listId}/tasks/${taskId}`, {
      completed,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

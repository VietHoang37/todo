import AxiosClient from "./axios";

export const deleteTask = async (listId: string, taskId: number) => {
  const response = await AxiosClient.delete(`/lists/${listId}/tasks/${taskId}`);

  console.log(response);
};

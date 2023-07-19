import { ListType } from "@/types";
import AxiosClient from "./axios";

export const createList = async (list: ListType) => {
  const response = await AxiosClient.post("/lists", {
    name: list.name,
    tasks: list.tasks,
    uid: list.uid,
  });

  console.log(response);
};

export const getLists = async (uid: string) => {
  const { data } = await AxiosClient.get(`/lists?uid=${uid}`);

  return data;
};

export const getList = async (id: number) => {
  console.log(id);
  const { data } = await AxiosClient.get(`/lists/${id}`);

  return data;
};

import { ListType } from "@/types";
import AxiosClient from "./axios";

interface ListPayload {
  name: string;
  uid: string;
}

export const createList = async (list: ListPayload): Promise<ListType> => {
  try {
    const response = await AxiosClient.post("/lists", {
      name: list.name,
      uid: list.uid,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLists = async (uid: string): Promise<ListType[]> => {
  try {
    const response = await AxiosClient.get(`/lists?uid=${uid}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getList = async (id: string): Promise<ListType> => {
  try {
    const response = await AxiosClient.get(`/lists/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateList = async (
  id: string,
  name: string
): Promise<ListType> => {
  try {
    const response = await AxiosClient.put(`/lists/${id}`, { name: name });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

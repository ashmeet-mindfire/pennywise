import { ADD_CATEGORY, GET_CATEGORIES } from "@/constants/urls";
import axios from "axios";

export const getCategories = (user_id: string) => {
  return axios.get(GET_CATEGORIES, { params: { user_id } });
};

export const addCategory = (name: string, user_id: string) => {
  return axios.post(ADD_CATEGORY, { name, user_id });
};

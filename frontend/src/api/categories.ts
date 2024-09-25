import { ADD_CATEGORY, GET_CATEGORIES, GET_CATEGORY_EXPENSES } from "@/constants/urls";
import axios from "axios";

export const getCategories = (user_id: string) => {
  return axios.get(GET_CATEGORIES, {
    params: { user_id },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const addCategory = (name: string, user_id: string) => {
  return axios.post(ADD_CATEGORY, { name, user_id }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
};

export const getCategoryExpenses = (user_id: string) => {
  return axios.get(GET_CATEGORY_EXPENSES, {
    params: { user_id },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

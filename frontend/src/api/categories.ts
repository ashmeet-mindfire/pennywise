import { ADD_CATEGORY, GET_CATEGORIES, GET_CATEGORY_EXPENSES } from "@/constants/urls";
import axios from "axios";

export const getCategories = () => {
  return axios.get(GET_CATEGORIES, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const addCategory = (name: string) => {
  return axios.post(ADD_CATEGORY, { name }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
};

export const getCategoryExpenses = () => {
  return axios.get(GET_CATEGORY_EXPENSES, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

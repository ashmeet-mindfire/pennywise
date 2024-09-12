import { ADD_TRANSACTIONS, GET_TRANSACTIONS } from "@/constants/urls";
import axios from "axios";

export const getTransactions = (userId: string) => {
  return axios.get(GET_TRANSACTIONS, { params: { user_id: userId } });
};

export const addTransaction = (
  title: string,
  desc: string,
  amount: number,
  type: string,
  date: string,
  category: string,
  userId: string
) => {
  return axios.post(ADD_TRANSACTIONS, { title, desc, amount, type, date_time: date, category, user_id: userId });
};

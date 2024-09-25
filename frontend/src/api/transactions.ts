import { ADD_TRANSACTIONS, GET_CHART_DATA, GET_TRANSACTIONS, UPDATE_TRANSACTIONS } from "@/constants/urls";
import axios from "axios";

export const getTransactions = (userId: string, limit?: number) => {
  return axios.get(GET_TRANSACTIONS, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    params: { user_id: userId, limit },
  });
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
  return axios.post(
    ADD_TRANSACTIONS,
    { title, desc, amount, type, date_time: date, category, user_id: userId },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
};

export const updateTransaction = (
  transaction_id: string,
  title: string,
  desc: string,
  amount: number,
  type: string,
  date: string,
  category: string,
  userId: string
) => {
  return axios.put(
    UPDATE_TRANSACTIONS,
    {
      transaction_id,
      title,
      desc,
      amount,
      type,
      date_time: date,
      category,
      user_id: userId,
    },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
};

export const deleteTransaction = (transaction_id: string, user_id: string) => {
  return axios.delete(GET_TRANSACTIONS, {
    params: { transaction_id, user_id },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getChartData = (time_period: string, value: string, user_id: string) => {
  return axios.get(GET_CHART_DATA, {
    params: { time_period, value, user_id },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

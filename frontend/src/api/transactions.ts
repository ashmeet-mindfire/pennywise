import { GET_TRANSACTIONS } from "@/constants/urls";
import axios from "axios";

export const getTransactions = (userId: string) => {
  return axios.get(GET_TRANSACTIONS, { params: { user_id: userId } });
};

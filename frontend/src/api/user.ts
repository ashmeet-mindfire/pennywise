import { GET_USER_BY_ID, LOGIN, REGISTER } from "@/constants/urls";
import axios from "axios";

export const loginUser = (email: string, password: string) => {
  return axios.post(LOGIN, { email, password });
};

export const registerUser = (name: string, email: string, password: string) => {
  return axios.post(REGISTER, { name, email, password });
};

export const getUserById = (userId: string) => {
  return axios.get(GET_USER_BY_ID, { params: { user_id: userId } });
};

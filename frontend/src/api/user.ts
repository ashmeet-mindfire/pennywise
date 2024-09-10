import { LOGIN, REGISTER } from "@/constants/urls";
import axios from "axios";

export const loginUser = (email: string, password: string) => {
  return axios.post(LOGIN, { email, password });
};

export const registerUser = (name: string, email: string, password: string) => {
  return axios.post(REGISTER, { name, email, password });
};

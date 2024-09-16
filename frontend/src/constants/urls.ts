const BASE_URL = "http://localhost:5000/api/v1";

export const LOGIN = BASE_URL + "/auth/login";
export const REGISTER = BASE_URL + "/auth/register";
export const GET_USER_BY_ID = BASE_URL + "/auth/user";

export const GET_TRANSACTIONS = BASE_URL + "/transaction";
export const ADD_TRANSACTIONS = BASE_URL + "/transaction";
export const UPDATE_TRANSACTIONS = BASE_URL + "/transaction";

export const GET_CATEGORIES = BASE_URL + "/category";
export const ADD_CATEGORY = BASE_URL + "/category";
export const GET_CATEGORY_EXPENSES = BASE_URL + "/category/category-expenses";

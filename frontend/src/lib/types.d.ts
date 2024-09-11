export interface IUserDTO {
  name: string;
  _id: string;
  total_expenses: number;
  total_income: number;
}

export interface IUser {
  name: string;
  id: string;
  totalExpenses: number;
  totalIncome: number;
}

export interface IUserContext {
  user: IUser | null;
  loginUser: (user: IUser) => void;
  logoutUser: () => void;
}

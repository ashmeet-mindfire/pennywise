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

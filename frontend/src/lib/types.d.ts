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
  login: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
  getUserDetails: () => void;
}

export interface ITransactionDTO {
  title: string;
  desc: string;
  date_time: string;
  category_id: string;
  type: string;
  user_id: string;
  _id: string;
  amount: number;
}

export interface ITransactionContext {
  transactions: ITransactionDTO[];
  handleGetTransactions: () => void;
  transactionsLoading: boolean;
}

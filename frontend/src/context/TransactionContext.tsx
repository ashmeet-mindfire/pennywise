import { getTransactions } from "@/api/transactions";
import { ITransactionDTO, ITransactionContext, IUserContext } from "@/lib/types";
import * as React from "react";
import toast from "react-hot-toast";
import { UserContext } from "./userContext";

export const TransactionContext = React.createContext<ITransactionContext | null>(null);

const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactionsLoading, setTransactionsLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState<ITransactionDTO[]>([]);

  const { user, getUserDetails } = React.useContext(UserContext) as IUserContext;

  const handleGetTransactions = () => {
    setTransactionsLoading(true);
    getTransactions(user?.id as string)
      .then((res) => {
        setTransactions(res?.data?.transactions);
        getUserDetails();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg ?? "Something went wrong, please try later");
        console.log(err);
      })
      .finally(() => setTransactionsLoading(false));
  };
  return (
    <TransactionContext.Provider value={{ transactions, handleGetTransactions, transactionsLoading }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;

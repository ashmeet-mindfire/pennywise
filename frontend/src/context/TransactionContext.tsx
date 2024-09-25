import { getChartData, getTransactions } from "@/api/transactions";
import { ITransactionDTO, ITransactionContext, IUserContext, ICategoryExpensesDTO, IChartData } from "@/lib/types";
import * as React from "react";
import toast from "react-hot-toast";
import { UserContext } from "./userContext";
import { getCategoryExpenses } from "@/api/categories";
import { MONTH } from "@/constants/constants";

export const TransactionContext = React.createContext<ITransactionContext | null>(null);

const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactionsLoading, setTransactionsLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState<ITransactionDTO[]>([]);
  const [categoryExpenses, setCategoryExpenses] = React.useState<ICategoryExpensesDTO[]>([]);
  const [chartData, setChartData] = React.useState<IChartData[]>([]);

  const { user, getUserDetails } = React.useContext(UserContext) as IUserContext;

  const handleGetTransactions = (limit?: number) => {
    setTransactionsLoading(true);
    getTransactions(user?.id as string, limit)
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

  const handleGetCategoryExpenses = () => {
    getCategoryExpenses(user?.id as string)
      .then((res) => {
        setCategoryExpenses(res?.data?.category_with_expenses);
      })
      .catch((err) => console.log(err));
  };

  const handleGetChartData = (timePeriod: string, value: string) => {
    getChartData(timePeriod, value, user?.id as string).then((data) => {
      const newChartData: IChartData[] = [];
      if (timePeriod === "year") {
        data.data.result.map((obj: any) => {
          newChartData.push({ expense: obj.expense, income: obj.income, xAxisValue: MONTH[obj.month as keyof typeof MONTH] });
        });
      }

      if (timePeriod === "month") {
        data.data.result.map((obj: any) => {
          newChartData.push({ expense: obj.expense, income: obj.income, xAxisValue: obj.date.toString() });
        });
      }
      setChartData(newChartData);
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        handleGetTransactions,
        transactionsLoading,
        categoryExpenses,
        handleGetCategoryExpenses,
        chartData,
        handleGetChartData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;

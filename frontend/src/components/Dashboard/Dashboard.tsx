import { UserContext } from "@/context/userContext";
import { IUserContext } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import TransactionsTable from "./TransactionsTable";
import { Button } from "../ui/button";
import { getTransactions } from "@/api/transactions";
import toast from "react-hot-toast";
import ExpenseCalendar from "./ExpenseCalendar";

const Dashboard = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const [transactions, setTransactions] = useState<any[]>([]);

  const handleGetTransactions = () => {
    getTransactions(user?.id as string)
      .then((res) => {
        setTransactions(res?.data?.transactions);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg ?? "Something went wrong, please try later");
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("Ashmeet", user);
    if (user) handleGetTransactions();
  }, [user]);

  return (
    <div className="w-full py-10 px-24">
      <div className="w-full grid grid-cols-3">
        <div className="text-center">
          <p className="text-xl font-semibold">Expenses</p>
          <p className="text-4xl font-bold">{user?.totalExpenses}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">Income</p>
          <p className="text-4xl font-bold">{user?.totalIncome}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">Savings</p>
          <p className="text-4xl font-bold">{(user?.totalIncome ?? 0) - (user?.totalExpenses ?? 0)}</p>
        </div>
      </div>

      <div className="flex gap-8 mt-10">
        <div className="w-full">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">Transactions</h2>
            <Button>Add</Button>
          </div>
          <TransactionsTable transactions={transactions} />
        </div>
        <ExpenseCalendar />
      </div>
    </div>
  );
};

export default Dashboard;

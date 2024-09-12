import { UserContext } from "@/context/userContext";
import { IUserContext } from "@/lib/types";
import { useContext } from "react";
import TransactionsTable from "./TransactionsTable";
import ExpenseCalendar from "./ExpenseCalendar";
import AddTransactionDialog from "./AddTransactionDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = () => {
  const { user } = useContext(UserContext) as IUserContext;

  return (
    <div className="w-full py-10 px-24">
      <div className="w-full grid grid-cols-3">
        <div className="text-center">
          <p className="text-xl font-semibold">Expenses</p>
          <p className="text-4xl font-bold text-red-500">{user?.totalExpenses}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">Income</p>
          <p className="text-4xl font-bold text-green-500">{user?.totalIncome}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">Savings</p>
          <p className="text-4xl font-bold text-orange-500">
            {Math.max(0, (user?.totalIncome ?? 0) - (user?.totalExpenses ?? 0))}
          </p>
        </div>
      </div>

      <div className="flex gap-8 mt-10">
        <div className="w-full">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">Recent Transactions</h2>
            <AddTransactionDialog />
          </div>
          <ScrollArea className="h-[250px]">
            <TransactionsTable />
          </ScrollArea>
        </div>
        <ExpenseCalendar />
      </div>
    </div>
  );
};

export default Dashboard;

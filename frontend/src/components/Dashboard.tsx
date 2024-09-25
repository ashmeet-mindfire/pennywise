import { UserContext } from "@/context/userContext";
import { ITransactionContext, IUserContext } from "@/lib/types";
import { useContext, useEffect } from "react";
import RecentTransactionsTable from "./RecentTransactionsTable";
import AddTransactionDialog from "./AddTransactionDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Chart } from "./Chart";
import { TransactionContext } from "@/context/TransactionContext";

const Dashboard = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const { categoryExpenses, handleGetCategoryExpenses } = useContext(TransactionContext) as ITransactionContext;

  useEffect(() => {
    handleGetCategoryExpenses();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1  md:grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-lg border shadow-lg">
          <p className="text-xl font-semibold">Expenses</p>
          <p className="text-4xl font-bold text-red-500">{user?.totalExpenses}</p>
        </div>
        <div className="text-center p-4 rounded-lg border shadow-lg">
          <p className="text-xl font-semibold">Income</p>
          <p className="text-4xl font-bold text-green-500">{user?.totalIncome}</p>
        </div>
        <div className="text-center p-4 rounded-lg border shadow-lg">
          <p className="text-xl font-semibold">Savings</p>
          <p className="text-4xl font-bold text-orange-500">
            {Math.max(0, (user?.totalIncome ?? 0) - (user?.totalExpenses ?? 0))}
          </p>
        </div>
      </div>
      <div className="flex gap-8 mt-10">
        <div className="w-full border rounded-lg p-4 shadow-lg">
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-xl md:text-2xl font-semibold">Recent Transactions</h2>
            <AddTransactionDialog />
          </div>
          <ScrollArea className="h-[250px] px-4">
            <RecentTransactionsTable />
          </ScrollArea>
        </div>
        {/* <ExpenseCalendar /> */}
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:min-h-[300px] mt-10">
        <div className="w-full border rounded-lg p-4 shadow-lg">
          <p className="text-2xl md:text-3xl font-semibold w-full border-b pb-3">Expenses By Category</p>
          <div className="mt-4">
            {categoryExpenses.map((categoryExpense, idx) =>
              categoryExpense.expense_amount ? (
                <div key={idx} className="mb-2">
                  <div className="flex gap-4 w-full justify-between items-center">
                    <p className="">
                      {categoryExpense.name} ({Math.floor((categoryExpense.expense_amount / (user?.totalExpenses ?? 1)) * 100)}
                      %)
                    </p>
                    <p className="text-lg font-semibold">{categoryExpense.expense_amount}</p>
                  </div>
                  <div className="mt-1">
                    <Progress
                      indicatorColor="bg-red-500"
                      value={Math.floor((categoryExpense.expense_amount / (user?.totalExpenses ?? 1)) * 100)}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
        <div className="w-full border rounded-lg p-4 shadow-lg">
          <p className="text-2xl md:text-3xl font-semibold w-full border-b pb-3">Incomes By Category</p>
          <div className="mt-4">
            {categoryExpenses.map((categoryExpense, idx) =>
              categoryExpense.income_amount ? (
                <div key={idx} className="mb-2">
                  <div className="flex gap-4 w-full justify-between items-center">
                    <p className="">
                      {categoryExpense.name} ({Math.floor((categoryExpense.income_amount / (user?.totalIncome ?? 1)) * 100)}%)
                    </p>
                    <p className="text-lg font-semibold">{categoryExpense.income_amount}</p>
                  </div>
                  <div className="mt-1">
                    <Progress
                      indicatorColor="bg-green-500"
                      value={Math.floor((categoryExpense.income_amount / (user?.totalIncome ?? 1)) * 100)}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 border rounded-lg p-4 shadow-lg">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;

import { UserContext } from "@/context/userContext";
import { ICategoryExpensesDTO, IUserContext } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import RecentTransactionsTable from "./RecentTransactionsTable";
import AddTransactionDialog from "./AddTransactionDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCategoryExpenses } from "@/api/categories";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const [categoryExpenses, setCategoryExpenses] = useState<ICategoryExpensesDTO[]>([]);

  const { user } = useContext(UserContext) as IUserContext;

  useEffect(() => {
    getCategoryExpenses(user?.id as string)
      .then((res) => {
        setCategoryExpenses(res?.data?.category_with_expenses);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
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
            <RecentTransactionsTable />
          </ScrollArea>
        </div>
        {/* <ExpenseCalendar /> */}
      </div>
      <div className="flex gap-4 min-h-[300px]">
        <div className="w-full border rounded p-4">
          <p className="text-3xl font-bold w-full border-b pb-3">Expenses By Category</p>
          <div className="mt-4">
            {categoryExpenses
              .filter((category) => category.type === "expense")
              .map((categoryExpense, idx) => (
                <div key={idx} className="mb-2">
                  <div className="flex gap-4 w-full justify-between items-center">
                    <p className="">
                      {categoryExpense.name} ({Math.floor((categoryExpense.amount / (user?.totalExpenses ?? 1)) * 100)}%)
                    </p>
                    <p className="text-lg font-semibold">{categoryExpense.amount}</p>
                  </div>
                  <div className="mt-1">
                    <Progress
                      indicatorColor="bg-red-500"
                      value={Math.floor((categoryExpense.amount / (user?.totalExpenses ?? 1)) * 100)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-full border rounded p-4">
          <p className="text-3xl font-bold w-full border-b pb-3">Incomes By Category</p>
          <div className="mt-4">
            {categoryExpenses
              .filter((category) => category.type === "income")
              .map((categoryExpense, idx) => (
                <div key={idx} className="mb-2">
                  <div className="flex gap-4 w-full justify-between items-center">
                    <p className="">
                      {categoryExpense.name} ({Math.floor((categoryExpense.amount / (user?.totalIncome ?? 1)) * 100)}%)
                    </p>
                    <p className="text-lg font-semibold">{categoryExpense.amount}</p>
                  </div>
                  <div className="mt-1">
                    <Progress
                      indicatorColor="bg-green-500"
                      value={Math.floor((categoryExpense.amount / (user?.totalIncome ?? 1)) * 100)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

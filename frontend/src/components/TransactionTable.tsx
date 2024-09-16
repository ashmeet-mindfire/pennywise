import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TransactionContext } from "@/context/TransactionContext";
import { ITransactionContext, ITransactionDTO, IUserContext } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import EditTransactionDialog from "./EditTransactionDialog";
import { Trash2 } from "lucide-react";
import { UserContext } from "@/context/userContext";
import { deleteTransaction } from "@/api/transactions";
import toast from "react-hot-toast";

const TransactionsTable = () => {
  const { transactions, transactionsLoading, handleGetTransactions } = useContext(TransactionContext) as ITransactionContext;
  const [editTransactionData, setEditTransactionData] = useState<ITransactionDTO | null>(null);

  const { user } = useContext(UserContext) as IUserContext;

  useEffect(() => {
    handleGetTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (transactionId: string) => {
    const toastId = toast.loading("Deleting transaction");
    deleteTransaction(transactionId, user?.id as string)
      .then((res) => {
        toast.success(res?.data?.msg ?? "Transaction deleted successfully", { id: toastId });
        handleGetTransactions();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg ?? "Something went wrong, please try later", { id: toastId });
        console.log(err);
      });
  };

  return (
    <Table>
      <TableCaption>A list of your transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      {!transactionsLoading && (
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell className="font-medium">{transaction.title}</TableCell>
              <TableCell>{transaction.desc}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.date_time}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell
                className={`capitalize font-semibold ${transaction.type === "expense" ? "text-red-500" : "text-green-500"}`}
              >
                {transaction.type}
              </TableCell>
              <TableCell className="flex gap-4 justify-end">
                <span onClick={() => setEditTransactionData(transaction)}>
                  <EditTransactionDialog transactionData={editTransactionData as ITransactionDTO} />
                </span>
                <Trash2 className="cursor-pointer" onClick={() => handleDelete(transaction._id)} size={20} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
      {transactionsLoading && (
        <TableBody className="animate-pulse">
          {[...new Array(5)].map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <div className="h-5 bg-slate-200 rounded-sm"></div>
              </TableCell>
              <TableCell>
                <div className="h-5 bg-slate-200 rounded-sm"></div>
              </TableCell>
              <TableCell>
                <div className="h-5 bg-slate-200 rounded-sm"></div>
              </TableCell>
              <TableCell>
                <div className="h-5 bg-slate-200 rounded-sm"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export default TransactionsTable;

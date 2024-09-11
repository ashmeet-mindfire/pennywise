import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TransactionContext } from "@/context/TransactionContext";
import { ITransactionContext } from "@/lib/types";
import { useContext, useEffect } from "react";

const TransactionsTable = () => {
  const { transactions, transactionsLoading, handleGetTransactions } = useContext(TransactionContext) as ITransactionContext;

  useEffect(() => {
    handleGetTransactions();
  }, []);

  return (
    <Table>
      <TableCaption>A list of your transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Type</TableHead>
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
              <TableCell className="text-right capitalize">{transaction.type}</TableCell>
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

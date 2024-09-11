import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FC } from "react";

interface TransactionsTableProps {
  transactions: any[];
}

const TransactionsTable: FC<TransactionsTableProps> = ({ transactions }) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: any) => (
          <TableRow key={transaction._id}>
            <TableCell className="font-medium">{transaction.title}</TableCell>
            <TableCell>{transaction.desc}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell className="text-right">{transaction.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;

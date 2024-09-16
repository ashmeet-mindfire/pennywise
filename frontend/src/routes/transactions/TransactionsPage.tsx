import TransactionsTable from "@/components/TransactionTable";

const TransactionsPage = () => {
  return (
    <div className="">
      <h1 className="text-4xl font-bold">Transactions</h1>
      <div className="mt-4">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default TransactionsPage;

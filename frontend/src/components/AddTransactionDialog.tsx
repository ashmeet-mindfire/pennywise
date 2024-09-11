import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import TypeDropdown from "./TypeDropdown";
import { AddTransactionDatePicker } from "./AddTransactionDatePicker";
import { addTransaction } from "@/api/transactions";
import { UserContext } from "@/context/userContext";
import { ITransactionContext, IUserContext } from "@/lib/types";
import toast from "react-hot-toast";
import { TransactionContext } from "@/context/TransactionContext";

const AddTransactionDialog = () => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [date, setDate] = useState<Date>();

  const { user, getUserDetails } = useContext(UserContext) as IUserContext;
  const { handleGetTransactions } = useContext(TransactionContext) as ITransactionContext;

  const handleAdd = () => {
    console.log(title, desc, amount, type, date);
    const toastId = toast.loading("Adding transaction");
    addTransaction(title, desc, amount, type, date?.toLocaleDateString() as string, "category_id", user?.id as string)
      .then((res) => {
        toast.success(res?.data?.msg, { id: toastId });
        closeDialog();
        handleGetTransactions();
        getUserDetails();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg ?? "Something went wrong, please try later", { id: toastId });
        console.log(err);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">Add a new transaction</DialogTitle>
          <DialogDescription className="w-full flex gap-8">
            <div className="w-2/3 space-y-2">
              <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="desc">Description</Label>
                <Textarea rows={8} id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
              </div>
            </div>
            <div className="w-1/3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="type">Select Type</Label>
                  <TypeDropdown type={type} setType={setType} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="type">Select Date</Label>
                  <AddTransactionDatePicker date={date} setDate={setDate} />
                </div>
              </div>
              <div className="flex gap-4">
                <Button onClick={closeDialog} className="w-full" variant="secondary">
                  Cancel
                </Button>
                <Button onClick={handleAdd} className="w-full">
                  Save
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;

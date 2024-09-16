import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { FC, useContext, useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import TypeDropdown from "./TypeDropdown";
import { AddTransactionDatePicker } from "./AddTransactionDatePicker";
import { updateTransaction } from "@/api/transactions";
import { UserContext } from "@/context/userContext";
import { ITransactionContext, ITransactionDTO, IUserContext } from "@/lib/types";
import toast from "react-hot-toast";
import { TransactionContext } from "@/context/TransactionContext";
import CategoryDropdown from "./CategoryDropdown";
import AddCategoryDialog from "./AddCategoryDialog";
import { PencilRuler } from "lucide-react";

interface EditTransactionDialogProps {
  transactionData: ITransactionDTO;
}

const EditTransactionDialog: FC<EditTransactionDialogProps> = ({ transactionData }) => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>();

  const { user } = useContext(UserContext) as IUserContext;
  const { handleGetTransactions } = useContext(TransactionContext) as ITransactionContext;

  useEffect(() => {
    if (open) {
      setTitle(transactionData.title);
      setDesc(transactionData.desc);
      setAmount(transactionData.amount);
      setType(transactionData.type);
      setCategory(transactionData.category);
    }
  }, [open, transactionData]);

  const resetData = () => {
    setTitle("");
    setDesc("");
    setAmount(0);
    setType("");
    setCategory("");
    setDate(undefined);
  };

  const handleUpdate = () => {
    const toastId = toast.loading("Updating transaction");
    updateTransaction(
      transactionData._id,
      title,
      desc,
      amount,
      type,
      date?.toLocaleDateString() as string,
      category,
      user?.id as string
    )
      .then((res) => {
        toast.success(res?.data?.msg, { id: toastId });
        resetData();
        closeDialog();
        handleGetTransactions();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg ?? "Something went wrong, please try later", { id: toastId });
        console.log(err);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PencilRuler size={20} />
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
                <Textarea rows={12} id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
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
                  <Label htmlFor="type">Select Category</Label>
                  <div className="flex gap-2 items-center">
                    <div className="flex-grow">
                      <CategoryDropdown category={category} setCategory={setCategory} />
                    </div>
                    <AddCategoryDialog />
                  </div>
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
                <Button onClick={handleUpdate} className="w-full">
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

export default EditTransactionDialog;

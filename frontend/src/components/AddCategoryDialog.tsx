import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UserContext } from "@/context/userContext";
import { IUserContext } from "@/lib/types";
import toast from "react-hot-toast";
import { addCategory } from "@/api/categories";

const AddCategoryDialog = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");

  const { user, fetchCategories } = useContext(UserContext) as IUserContext;

  const handleCloseDialog = () => setOpen(false);

  const handleCategoryAdd = async () => {
    const toastId = toast.loading("Adding category");
    try {
      await addCategory(category, user?.id as string);
      toast.success("Category added successfully", { id: toastId });
      fetchCategories(user?.id as string);
      handleCloseDialog();
    } catch (err: any) {
      toast.error("Something went wrong, please try later", { id: toastId });
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new category</DialogTitle>
          <DialogDescription>
            <div className="mt-2">
              <Input id="name" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="w-full flex gap-4 justify-end mt-8">
              <Button onClick={handleCloseDialog} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleCategoryAdd}>Save</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;

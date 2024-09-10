import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LoginRegisterTabs } from "./LoginRegisterTabs";
import { useState } from "react";

const LoginRegisterDialog = () => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent className="flex justify-center w-fit">
        <DialogHeader>
          <DialogDescription>
            <LoginRegisterTabs closeDialog={closeDialog} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginRegisterDialog;

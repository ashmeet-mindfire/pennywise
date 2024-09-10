import { useContext } from "react";
import LoginRegisterDialog from "../LoginRegisterDialog/LoginRegisterDialog";
import { UserContext } from "@/context/userContext";
import { IUserContext } from "@/lib/types";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext) as IUserContext;

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center shadow-lg">
      <div>
        <p className="font-['Pacifico'] text-4xl">Pennywise</p>
      </div>
      <div className="flex gap-8 items-center">
        <p>Dashboard</p>
        {user ? <Button onClick={handleLogout}>Sign Out</Button> : <LoginRegisterDialog />}
      </div>
    </nav>
  );
};

export default Navbar;

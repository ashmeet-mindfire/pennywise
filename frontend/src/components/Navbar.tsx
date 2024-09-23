import { useContext } from "react";
import LoginRegisterDialog from "./LoginRegisterDialog";
import { UserContext } from "@/context/userContext";
import { IUserContext } from "@/lib/types";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext) as IUserContext;

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center border-b ">
      <div>
        <p className="font-['Pacifico'] text-4xl">Pennywise</p>
      </div>

      <div className="flex gap-4 items-center">
        {user && (
          <>
            <Link to={"dashboard"}>
              <Button variant="link" className="text-lg">
                Dashboard
              </Button>
            </Link>
            <Link to={"transactions"}>
              <Button variant="link" className="text-lg">
                Transactions
              </Button>
            </Link>
          </>
        )}
        {user ? <Button onClick={handleLogout}>Sign Out</Button> : <LoginRegisterDialog />}
      </div>
    </nav>
  );
};

export default Navbar;

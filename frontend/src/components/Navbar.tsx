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
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full flex justify-between">
          <p className="font-['Pacifico'] text-2xl">Pennywise</p>
          {!user && (
            <div className="md:hidden">
              <LoginRegisterDialog />
            </div>
          )}
        </div>
        <div className="md:hidden flex justify-between w-full">
          {user && (
            <div className="flex gap-4">
              <Link to={"dashboard"}>
                <Button variant="link" className="p-0 md:px-4 md:py-2 text-sm md:text-lg">
                  Dashboard
                </Button>
              </Link>
              <Link to={"transactions"}>
                <Button variant="link" className="p-0 md:px-4 md:py-2 text-sm md:text-lg">
                  Transactions
                </Button>
              </Link>
            </div>
          )}
          {user ? (
            <Button size={"sm"} onClick={handleLogout}>
              Sign Out
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="hidden md:flex gap-2 md:gap-4 items-center">
        {user && (
          <>
            <Link to={"dashboard"}>
              <Button variant="link" className="p-0 md:px-4 md:py-2 text-sm md:text-lg">
                Dashboard
              </Button>
            </Link>
            <Link to={"transactions"}>
              <Button variant="link" className="p-0 md:px-4 md:py-2 text-sm md:text-lg">
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

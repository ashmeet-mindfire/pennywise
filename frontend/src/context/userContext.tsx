import { getUserById, loginUser } from "@/api/user";
import { IUser, IUserContext, IUserDTO } from "@/lib/types";
import * as React from "react";
import toast from "react-hot-toast";

export const UserContext = React.createContext<IUserContext | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<IUser | null>(null);

  const login = async (email: string, password: string) => {
    const toastId = toast.loading("Signing In");
    let success = false;
    try {
      const { data } = await loginUser(email, password);
      toast.success("Successfully logged in", { id: toastId });
      success = true;
      const resUser: IUserDTO = data?.user;
      if (resUser) {
        localStorage.setItem("user", JSON.stringify(resUser));
        const user: IUser = {
          id: resUser._id,
          name: resUser.name,
          totalExpenses: resUser.total_expenses,
          totalIncome: resUser.total_income,
        };
        setUser(user);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.msg ?? "Something went wrong, please try later", { id: toastId });
      console.log(err);
    }
    return success;
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  const getUserDetails = () => {
    getUserById(user?.id as string).then((res) => {
      console.log(res?.data?.user);
      const resUser: IUserDTO = res?.data?.user;
      if (resUser) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        const user: IUser = {
          id: resUser._id,
          name: resUser.name,
          totalExpenses: resUser.total_expenses,
          totalIncome: resUser.total_income,
        };
        setUser(user);
      }
    });
  };
  return <UserContext.Provider value={{ user, login, logoutUser, getUserDetails }}>{children}</UserContext.Provider>;
};

export default UserProvider;

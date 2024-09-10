import { IUser, IUserContext } from "@/lib/types";
import * as React from "react";

export const UserContext = React.createContext<IUserContext | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<IUser | null>(null);

  const loginUser = (user: IUser) => setUser(user);
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return <UserContext.Provider value={{ user, loginUser, logoutUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;

import { useContext } from "react";
import Navbar from "./components/Navbar";
import { UserContext } from "./context/userContext";
import { IUserContext } from "./lib/types";
import Dashboard from "./components/Dashboard";

function App() {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      {user && <Dashboard />}
    </div>
  );
}

export default App;

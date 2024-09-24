import { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { IUserContext } from "./lib/types";

function App() {
  const { user } = useContext(UserContext) as IUserContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="py-10 px-10 md:px-24 max-w-[1200px] md:flex md:flex-col md:items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

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
      <div className=" md:px-24 py-10 px-10 md:flex md:flex-col md:items-center">
        <div className="w-full max-w-[1200px] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;

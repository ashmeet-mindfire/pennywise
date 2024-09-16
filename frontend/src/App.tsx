import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className=" py-10 px-24">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

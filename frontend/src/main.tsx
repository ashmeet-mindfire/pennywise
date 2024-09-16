import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import UserProvider from "./context/userContext.tsx";
import TransactionProvider from "./context/TransactionContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TransactionsPage from "./routes/transactions/TransactionsPage.tsx";
import DashboardPage from "./routes/dashboard/DashboardPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/transactions",
        element: <TransactionsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <UserProvider>
      <TransactionProvider>
        <RouterProvider router={router} />
      </TransactionProvider>
    </UserProvider>
  </StrictMode>
);

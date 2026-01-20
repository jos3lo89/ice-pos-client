import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./lazyImports";

export const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
    ],
  },
]);

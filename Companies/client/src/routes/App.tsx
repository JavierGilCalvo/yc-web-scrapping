import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "@/routes/error-page";
import CompanyList from "./CompanyList";
import { AppSidebar } from "@/components/ui/app-sidebar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <AppSidebar />
        <CompanyList />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

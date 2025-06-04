import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./components/Layout/Layout";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import AddFood from "./pages/AddFood/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Analytics from "./pages/Analytics/Analytics";
import Voucher from "./pages/Voucher/Voucher";
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail";
import { AdminProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminProtectedRoute>
        <Navbar />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "add_category",
            element: <Add />,
          },
          {
            path: "list_category",
            children: [
              {
                index: true,
                element: <List />,
              },
              {
                path: ":id",
                element: <CategoryDetail />,
              },
            ],
          },
          { path: "add_food", element: <AddFood /> },
          { path: "list_food", element: <ListFood /> },
          { path: "voucher", element: <Voucher /> },
          { path: "analytis", element: <Analytics /> },
        ],
      },
    ],
  },
]);
export default router;

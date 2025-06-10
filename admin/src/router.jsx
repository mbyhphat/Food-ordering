import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./components/Layout/Layout";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import AddFood from "./pages/AddFood/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Analytics from "./pages/Analytics/Analytics";
import Voucher from "./pages/Voucher/voucher";
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail";
import FoodDetail from "./pages/FoodDetail/FoodDetail";
import Login from "./pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
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
          {
            path: "list_food",
            children: [
              { index: true, element: <ListFood /> },
              { path: ":id", element: <FoodDetail /> },
            ],
          },
          { path: "voucher", element: <Voucher /> },
          { path: "analytis", element: <Analytics /> },
        ],
      },
    ],
  },
  { path: "login", element: <Login /> },
]);
export default router;

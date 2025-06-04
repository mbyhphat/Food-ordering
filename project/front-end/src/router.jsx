import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RootLayout from "./pages/RootLayout/RootLayout";
import Category from "./pages/Category/Category";
import Chat from "./components/CustomerSupport/CustomerSupport";
import {
    ProtectedRoute,
    RoleBasedRoute,
} from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "", element: <Home /> },
            {
                path: "menu",
                element: <Menu />,
                children: [
                    {
                        index: true,
                        element: <Category />,
                    },
                    {
                        path: ":category",
                        element: <Category />,
                    },
                ],
            },
            {
                path: "order",
                element: (
                    <ProtectedRoute>
                        <RoleBasedRoute>
                            <PlaceOrder />
                        </RoleBasedRoute>
                    </ProtectedRoute>
                ),
            },
            {
                path: "cart",
                element: (
                    <ProtectedRoute>
                        <RoleBasedRoute>
                            <Cart />
                        </RoleBasedRoute>
                    </ProtectedRoute>
                ),
            },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            {
                path: "chat",
                element: (
                    <RoleBasedRoute>
                        <Chat />
                    </RoleBasedRoute>
                ),
            },
        ],
    },
]);
export default router;

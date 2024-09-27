import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from '../pages/AdminPanel'
import AllUser from '../pages/AllUser'
import AllProducts from '../pages/AllProducts'
import Analytics from "../pages/Analytics";
import Orders from "../pages/Orders";







const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "",
            element: <Home />

        },
        {
            path: "login",
            element: <Login />
        },
        {
            path: "forgot-password",
            element: <ForgotPassword/>
        },
        {
            path: "sign-up",
            element: <SignUp/>
        },
        {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUser/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "orders",
                        element : <Orders/>
                    },
                    {
                        path : "analytics",
                        element : <Analytics/>
                    },
                ]      
        },
    ]
    
  },
]);
export default router;
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUser";
import AllProducts from "../pages/AllProducts"; // Trang hiển thị tất cả sản phẩm
import Analytics from "../pages/Analytics";
import Orders from "../pages/Orders";
import Cart from "../pages/Cart";
import Gifts from "../pages/Gifts";
import Men from "../pages/Men"; // Trang hiển thị sản phẩm Men
import Women from "../pages/Women"; // Trang hiển thị sản phẩm Women
import Collections from "../pages/Collections";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout"; // Trang chi tiết sản phẩm

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "", // Trang chủ
        element: <Home />,
      },
      {
        path: "collections/men", // Route cho sản phẩm Men
        element: <Men />,
      },
      {
        path: "collections/women", // Route cho sản phẩm Women
        element: <Women />,
      },
      {
        path: "collections", // Trang Collections
        element: <Collections />,
      },
      {
        path: "gifts", // Trang quà tặng
        element: <Gifts />,
      },
      {
        path: "cart", // Trang giỏ hàng
        element: <Cart />,
      },
      {
        path: "checkout", // Trang giỏ hàng
        element: <Checkout />,
      },
      {
        path: "login", // Trang đăng nhập
        element: <Login />,
      },
      {
        path: "forgot-password", // Trang quên mật khẩu
        element: <ForgotPassword />,
      },
      {
        path: "sign-up", // Trang đăng ký
        element: <SignUp />,
      },
      {
        path: "product/:id", // Trang chi tiết sản phẩm (productId)
        element: <ProductDetails />,
      },
      {
        path: "admin-panel", // Trang quản trị
        element: <AdminPanel />,
        children: [
          {
            path: "all-users", // Route con cho danh sách người dùng
            element: <AllUser />,
          },
          {
            path: "all-products", // Route con cho danh sách sản phẩm
            element: <AllProducts />,
          },
          {
            path: "orders", // Route con cho đơn hàng
            element: <Orders />,
          },
          {
            path: "analytics", // Route con cho phân tích dữ liệu
            element: <Analytics />,
          },
        ],
      },
    ],
  },
]);

export default router;

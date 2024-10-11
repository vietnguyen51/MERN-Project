const express = require('express');
const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");

const UploadProductController = require("../controller/product/uploadProduct");
const getMenProductsController = require('../controller/product/getMenProductsController');
const getWomenProductsController = require('../controller/product/getWomenProductController');
const getAllProductsController = require('../controller/product/getProduct');
const updateProductController = require("../controller/product/updateProduct");
const getProductDetails = require('../controller/product/getProductDetails');
const createOrder = require('../controller/product/Order');
const getAllOrders = require("../controller/product/getOrders");
const updateOrderStatus = require('../controller/product/updateOrderStatus'); // Sửa cú pháp lỗi


// Định nghĩa route cho signup, signin, và thông tin người dùng
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// Routes cho admin-panel (cần xác thực authToken)
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// Route để upload sản phẩm (yêu cầu xác thực authToken)
router.post("/upload-product", authToken, UploadProductController);

// Route để lấy tất cả sản phẩm
router.get("/get-product", getAllProductsController);

// Route để cập nhật sản phẩm (yêu cầu xác thực authToken)
router.post("/update-product", authToken, updateProductController);

// Route để lấy sản phẩm dành cho Men
router.get('/men-products', getMenProductsController);

// Route để lấy sản phẩm dành cho Women
router.get('/women-products', getWomenProductsController);

// Route để lấy chi tiết sản phẩm theo ID (GET method)
router.get("/product-details/:productId", getProductDetails);

// Route để tạo đơn hàng
router.post('/create-order', createOrder);

// Route để lấy tất cả đơn hàng
router.get('/orders', getAllOrders);

// Route để cập nhật trạng thái đơn hàng (yêu cầu PATCH)
router.patch('/orders/:orderId/status', updateOrderStatus);  // Đảm bảo controller updateOrderStatus được gọi đúng

module.exports = router;

const express = require('express');
const router = express.Router();

// Import các controller
const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");

const uploadProductController = require("../controller/product/uploadProduct");
const getMenProductsController = require('../controller/product/getMenProductsController');
const getWomenProductsController = require('../controller/product/getWomenProductController');
const getAllProductsController = require('../controller/product/getProduct');
const updateProductController = require("../controller/product/updateProduct");
const getProductDetails = require('../controller/product/getProductDetails');
const createOrder = require('../controller/product/Order');
const getAllOrders = require("../controller/product/getOrders");
const updateOrderStatus = require('../controller/product/updateOrderStatus');
const getProductsByGenderAndCategory = require('../controller/product/getProductsByGenderAndCategory');
const { createPaypalOrderController, executePaypalPaymentController } = require('../controller/payment/paypal');
const searchProductController = require('../controller/product/searchProduct');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');


// Routes cho đăng ký, đăng nhập, và thông tin người dùng
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);  // Yêu cầu xác thực
router.get("/userLogout", authToken, userLogout);               // Yêu cầu xác thực

// Routes cho admin-panel (cần xác thực authToken)
router.get("/all-users", authToken, allUsers);                  // Chỉ admin có thể lấy tất cả người dùng
router.post("/update-user", authToken, updateUser);             // Cập nhật thông tin người dùng, cần xác thực

// Route để upload sản phẩm (cần xác thực authToken - chỉ admin hoặc người bán)
router.post("/upload-product", authToken, uploadProductController);

// Route để lấy tất cả sản phẩm
router.get("/get-product", getAllProductsController);

// Route để cập nhật sản phẩm (cần xác thực authToken)
router.post("/update-product", authToken, updateProductController);

// Route để lấy sản phẩm dành cho Nam
router.get('/men-products', getMenProductsController);

// Route để lấy sản phẩm dành cho Nữ
router.get('/women-products', getWomenProductsController);

// Route để lấy chi tiết sản phẩm theo ID
router.get("/product-details/:productId", getProductDetails);
router.get('/category-products', getCategoryWiseProduct);

// Route để tạo đơn hàng
router.post('/create-order', authToken, createOrder);

// Route để lấy tất cả đơn hàng
router.get('/orders', authToken, getAllOrders);

// Route để cập nhật trạng thái đơn hàng (yêu cầu xác thực)
router.patch('/orders/:orderId/status', updateOrderStatus);

// Tạo đơn hàng PayPal
router.post('/paypal/create-order', createPaypalOrderController);
// Thực thi thanh toán PayPal
router.post('/paypal/execute-payment', executePaypalPaymentController);
router.get('/collections/:genderCategory/:category', getProductsByGenderAndCategory);
// Route tìm kiếm sản phẩm
router.get('/search-products', searchProductController);


module.exports = router;

const express = require('express');

const router = express.Router();

const userSignUpController = require('../controller/userSignUp');
const userSignInController = require('../controller/userSignIn');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');
const allUsers = require('../controller/allUsers');
const updateUser = require('../controller/updateUser');
const UploadProductController = require('../controller/uploadProduct'); 

// Định nghĩa route cho signup, signin, và thông tin người dùng
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// Routes cho admin-panel
router.get("/all-users",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

// Route cho upload sản phẩm
router.post("/upload-product",authToken,UploadProductController)
















module.exports = router;

const express = require('express');
const router = express.Router();

const userSignUpController = require('../controller/userSignUp');
const userSignInController = require('../controller/userSignIn');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');
const allUsers = require('../controller/allUsers');
const AllProducts = require('../controller/allProducts');

const cors = require('cors');

const app = express();
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000',  // Địa chỉ frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Các phương thức HTTP được phép
    credentials: true  // Nếu cần gửi cookie
}));

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)


//admin-panel
router.get("/all-users",allUsers)
router.get("/all-products",allUsers)

module.exports = router;

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "Please login to access this resource.",
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid or expired token.",
          success: false,
        });
      }

      // Tìm người dùng theo decoded _id
      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
          success: false,
        });
      }

      // Gán thông tin người dùng vào req
      req.userId = user._id; // Đảm bảo gán userId vào req
      next();
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
};

module.exports = authToken;

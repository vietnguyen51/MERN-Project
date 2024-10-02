const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
  // Tìm người dùng theo ID
  const foundUser = await userModel.findById(userId);

  // Kiểm tra nếu không tìm thấy người dùng
  if (!foundUser) {
    throw new Error("User not found");
  }

  // Kiểm tra quyền của người dùng
  if (foundUser.role === "ADMIN") {
    return true;
  }

  return false;
};

module.exports = uploadProductPermission;

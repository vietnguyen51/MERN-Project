const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
  // Tìm người dùng theo ID
  const foundUser = await userModel.findById(userId);

  // Kiểm tra quyền của người dùng
  if (foundUser.ROLE === "ADMIN") {
    return true;
  }

  return false;
};

module.exports = uploadProductPermission;

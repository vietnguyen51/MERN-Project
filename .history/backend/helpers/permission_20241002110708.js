const userModel = require("../models/productModel");

const uploadProductPermission = async (userId) => {
  const user = await userModel.findById(userId);

  if (user.ROLE === "ADMIN") {
    return true;
  }

  return false;
};

module.exports = uploadProductPermission;

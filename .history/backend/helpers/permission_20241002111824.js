const userModel = require("../models/productModel");

const uploadProductPermission = async (user) => {
  const user = await userModel.findById(user);

  if (user.ROLE === "ADMIN") {
    return true;
  }

  return false;
};

module.exports = uploadProductPermission;

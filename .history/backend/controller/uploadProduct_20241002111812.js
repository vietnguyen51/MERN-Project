const uploadProductPermission = require("../helpers/permission");
const productModel = require("../models/productModel");

async function UploadProductController(req, res) {
  try {
    const user = req.user; // Lấy thông tin người dùng từ middleware authToken

    // Kiểm tra quyền của người dùng
    if (!uploadProductPermission(user)) {
      throw new Error("Permission denied");
    }

    // Tạo sản phẩm mới
    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Product upload successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;

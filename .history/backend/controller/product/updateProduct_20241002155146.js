const mongoose = require("mongoose");
const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function updateProductController(req, res) {
  try {
    // Kiểm tra quyền của người dùng
    if (!uploadProductPermission(req.userId)) {
      return res.status(403).json({
        message: "Permission denied",
        error: true,
        success: false,
      });
    }

    const { _id, ...productData } = req.body;

    // Kiểm tra ObjectId có hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        error: true,
        success: false,
      });
    }

    // Cập nhật sản phẩm
    const updatedProduct = await productModel.findByIdAndUpdate(
      _id,
      productData,
      { new: true }
    );

    // Kiểm tra nếu sản phẩm không tồn tại
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    // Trả về kết quả thành công
    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    // Xử lý lỗi
    res.status(500).json({
      message: err.message || "Server error",
      error: true,
      success: false,
    });
  }
}

module.exports = updateProductController;

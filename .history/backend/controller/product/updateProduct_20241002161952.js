const mongoose = require("mongoose");
const productModel = require("../models/productModel");

async function updateProduct(req, res) {
  try {
    const { _id, ...productData } = req.body;

    // Kiểm tra ObjectId có hợp lệ hay không
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        message: "Invalid product ID",
        error: true,
        success: false,
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      _id,
      productData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Server error",
      error: true,
      success: false,
    });
  }
}

module.exports = updateProduct;

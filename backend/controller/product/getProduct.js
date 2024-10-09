const productModel = require("../../models/productModel");

const getAllProductsController = async (req, res) => {
  try {
    // Lấy tất cả sản phẩm
    const allProducts = await productModel.find().sort({ createdAt: -1 });

    res.json({
      message: "All Products fetched successfully",
      success: true,
      error: false,
      data: allProducts,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getAllProductsController;

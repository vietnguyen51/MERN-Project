const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category, exclude } = req.query; // Lấy category và ID cần loại trừ từ query params

        if (!category) {
            return res.status(400).json({
                message: "Category is required",
                success: false,
                error: true,
            });
        }

        const products = await productModel.find({
            category,
            _id: { $ne: exclude }, // Loại trừ sản phẩm hiện tại
        });

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found for this category",
                success: false,
                error: false,
            });
        }

        res.json({
            data: products,
            message: "Products fetched successfully",
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Server error",
            success: false,
            error: true,
        });
    }
};

module.exports = getCategoryWiseProduct;

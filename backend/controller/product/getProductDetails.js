const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.params; // Lấy productId từ URL params
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true,
            });
        }

        res.json({
            data: product,
            message: "Product details fetched successfully",
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Error fetching product details",
            error: true,
            success: false,
        });
    }
};

module.exports = getProductDetails;

const productModel = require("../../models/productModel");

const getWomenProductsController = async (req, res) => {
    try {
        // Lấy sản phẩm có genderCategory là "women"
        const womenProducts = await productModel.find({ genderCategory: "women" }).sort({ createdAt: -1 });

        res.json({
            message: "Women Products fetched successfully",
            success: true,
            error: false,
            data: womenProducts,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = getWomenProductsController;

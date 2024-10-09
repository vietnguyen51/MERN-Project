const productModel = require("../../models/productModel");

const getMenProductsController = async (req, res) => {
    try {
        // Lấy sản phẩm có genderCategory là "men"
        const menProducts = await productModel.find({ genderCategory: "men" }).sort({ createdAt: -1 });

        res.json({
            message: "Men Products fetched successfully",
            success: true,
            error: false,
            data: menProducts,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = getMenProductsController;

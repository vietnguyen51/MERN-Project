const productModel = require("../../models/productModel");

const getProductsByGenderAndCategory = async (req, res) => {
    const { genderCategory, category } = req.params; // Lấy genderCategory và category từ URL
    try {
        const products = await productModel.find({
            genderCategory: genderCategory,
            category: category,
        }).sort({ createdAt: -1 });

        res.json({
            message: `${genderCategory} ${category} Products fetched successfully`,
            success: true,
            data: products,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = getProductsByGenderAndCategory;

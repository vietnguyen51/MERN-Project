const Product = require('../../models/productModel');


const searchProductController = async (req, res) => {
    try {
        const { query } = req.query;


        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }


        const products = await Product.find({
            $or: [
                { productName: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });


        res.status(200).json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

module.exports = searchProductController;

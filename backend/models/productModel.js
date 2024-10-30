const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    genderCategory: String,
    category: String,
    sizes: [String],
    productImage: [String],
    description: String,
    price: Number,
    sellingPrice: Number,

}, { timestamps: true });

// Đảm bảo tên model là "Product" với chữ "P" viết hoa
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

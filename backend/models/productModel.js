const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: String,
    genderCategory : String,
    category: String,
    productImage: [String],
    description: String,
    price: Number,
    sellingPrice: Number,
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;

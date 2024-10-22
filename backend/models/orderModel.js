const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
            productName: { type: String },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', orderSchema);

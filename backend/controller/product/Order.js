const Order = require('../../models/orderModel');
const Product = require("../../models/productModel");

const createOrderController = async (req, res) => {
    try {
        const { fullName, phoneNumber, address, city, paymentMethod, items, totalPrice } = req.body;
        const userId = req.userId; // userId từ authToken middleware

        // Populate items với thông tin sản phẩm cần thiết
        const populatedItems = items.map(item => ({
            productId: item.productId,
            productName: item.productName,
            size: item.size, // Sử dụng trường size thay vì sizes
            quantity: item.quantity,
            price: item.price,
        }));

        // Tạo đơn hàng mới
        const newOrder = new Order({
            userId,  // Liên kết với user
            fullName,
            phoneNumber,
            address,
            city,
            paymentMethod,
            items: populatedItems,
            totalPrice,
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully', success: true, order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Error placing order', success: false });
    }
};

module.exports = createOrderController;

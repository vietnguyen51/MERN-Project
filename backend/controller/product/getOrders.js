// controllers/orderController.js
const Order = require('../../models/orderModel'); // Đảm bảo đường dẫn chính xác
const Product = require('../../models/productModel'); // Đảm bảo đường dẫn chính xác

const getAllOrders = async (req, res) => {
    try {
        console.log("Fetching all orders for all users");

        // Tìm tất cả đơn hàng từ tất cả userID, không lọc theo userId
        const orders = await Order.find().populate({
            path: 'items.productId',
            model: 'Product', // Chỉ định model 'Product'
            select: 'productName productImage price', // Chọn các trường cần thiết
        });

        res.json({
            message: 'All orders fetched successfully',
            data: orders,
            success: true,
        });
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({
            message: 'Error fetching all orders',
            error: true,
            success: false,
        });
    }
};

module.exports = getAllOrders;

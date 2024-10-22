const Order = require("../../models/orderModel");

const getAllOrders = async (req, res) => {
    try {
        // Populate để lấy productName và productImage từ Product Collection
        const orders = await Order.find().populate({
            path: 'items.productId',
            select: 'productName productImage', // Chỉ lấy các trường cần thiết
        });

        res.json({
            message: 'Orders fetched successfully',
            data: orders,
            success: true,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            message: 'Error fetching orders',
            error: true,
            success: false,
        });
    }
};

module.exports = getAllOrders;

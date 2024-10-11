const Order = require('../../models/orderModel'); // Import model Order

// Hàm lấy tất cả các đơn hàng
const getAllOrders = async (req, res) => {
    try {
        // Populate để lấy thông tin sản phẩm từ productId
        const orders = await Order.find().populate('items.productId');

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

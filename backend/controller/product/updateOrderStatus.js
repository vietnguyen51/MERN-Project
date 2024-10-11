const Order = require('../../models/orderModel');

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params; // Lấy orderId từ params
        const { status } = req.body; // Lấy trạng thái mới từ body request

        // Kiểm tra nếu không có trạng thái hoặc orderId
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        // Tìm đơn hàng theo orderId và cập nhật trạng thái
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: status }, // cập nhật trạng thái
            { new: true } // trả về document sau khi cập nhật
        );

        // Nếu không tìm thấy đơn hàng
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({
            message: 'Order status updated successfully',
            order: updatedOrder,
            success: true
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({
            message: 'Error updating order status',
            error: true,
            success: false
        });
    }
};

module.exports = updateOrderStatus;

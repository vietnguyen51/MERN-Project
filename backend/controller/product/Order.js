const Order = require("../../models/orderModel");

async function createOrderController(req, res) {
    try {
        const { fullName, phoneNumber, address, city, paymentMethod, items, totalPrice } = req.body;

        // Kiểm tra từng mục có đầy đủ productId không
        const missingProduct = items.find(item => !item.productId);
        if (missingProduct) {
            return res.status(400).json({
                message: 'Product ID missing for one of the items',
                error: true,
                success: false
            });
        }

        // Tạo đơn hàng mới, lưu toàn bộ thông tin sản phẩm vào `items`
        const newOrder = new Order({
            fullName,
            phoneNumber,
            address,
            city,
            paymentMethod,
            items: items.map(item => ({
                productId: item.productId,  // vẫn lưu productId
                productName: item.productName, // Lưu tên sản phẩm
                quantity: item.quantity,
                price: item.price, // Lưu giá sản phẩm tại thời điểm mua
                productDescription: item.productDescription,  // Lưu mô tả sản phẩm
                productImageUrl: item.productImageUrl  // Lưu URL hình ảnh sản phẩm
            })),
            totalPrice,
            createdAt: new Date(),
            status: 'Pending'
        });

        // Lưu đơn hàng vào database
        await newOrder.save();

        // Trả về phản hồi thành công
        res.status(201).json({
            message: 'Order placed successfully',
            error: false,
            success: true,
            order: newOrder
        });
    } catch (err) {
        console.error('Error placing order:', err.message || err);
        res.status(500).json({
            message: 'Error placing order',
            error: true,
            success: false
        });
    }
}

module.exports = createOrderController;

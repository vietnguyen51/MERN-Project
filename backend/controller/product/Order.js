const Product = require('../../models/productModel');
const Order = require('../../models/orderModel');

const createOrderController = async (req, res) => {
    try {
        const { fullName, phoneNumber, address, city, paymentMethod, items, totalPrice } = req.body;

        // Kiểm tra từng item có chứa productImage không
        const populatedItems = items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            productImage: item.productImage,  // Lưu ảnh sản phẩm
            quantity: item.quantity,
            price: item.price,
        }));

        const newOrder = new Order({
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

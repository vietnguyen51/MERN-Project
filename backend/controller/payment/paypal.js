const paypal = require('paypal-rest-sdk');

// Cấu hình PayPal SDK
paypal.configure({
    'mode': process.env.PAYPAL_MODE, // 'sandbox' hoặc 'live'
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET,
});

// Tạo đơn hàng PayPal
const createPaypalOrderController = (req, res) => {
    const { totalPrice } = req.body;

    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        },
        transactions: [{
            amount: {
                currency: 'USD',
                total: totalPrice.toFixed(2),
            },
            description: 'Payment description',
        }],
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            console.error('PayPal Error:', error);
            return res.status(500).json({ message: 'Error creating PayPal order' });
        } else {
            const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
            res.status(200).json({ approvalUrl: approvalUrl.href });
        }
    });
};

// Thực thi thanh toán PayPal
const executePaypalPaymentController = (req, res) => {
    const { paymentId, PayerID, totalPrice } = req.body;

    const execute_payment_json = {
        payer_id: PayerID,
        transactions: [{
            amount: {
                currency: 'USD',
                total: totalPrice.toFixed(2),
            },
        }],
    };

    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
        if (error) {
            console.error('Error executing PayPal payment:', error);
            return res.status(500).json({ message: 'Error executing PayPal payment' });
        } else {
            res.status(200).json({ message: 'Payment successful', payment });
        }
    });
};

// Xuất ra các controller để sử dụng trong routes
module.exports = {
    createPaypalOrderController,
    executePaypalPaymentController,
};

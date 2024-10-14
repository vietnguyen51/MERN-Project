import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import SummaryApi from '../common/index';
import {useNavigate} from "react-router-dom"; // Import đúng nơi cấu hình API

export default function Success() {
    const [isLoading, setIsLoading] = useState(true);
    const [paymentData, setPaymentData] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paymentId = params.get('paymentId');  // Lấy paymentId từ URL
        const payerId = params.get('PayerID');  // Lấy PayerID từ URL

        // Thực hiện thanh toán sau khi người dùng đã thanh toán qua PayPal
        const handlePaymentSuccess = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(SummaryApi.executePaypalPayment.url, {
                    method: SummaryApi.executePaypalPayment.method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentId: paymentId,
                        PayerID: payerId,
                        totalPrice: 'Số tiền thực tế (nếu cần)' // Thêm nếu cần
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    console.log('Payment successful:', data);
                    setPaymentData(data);  // Lưu dữ liệu thanh toán
                } else {
                    console.error('Payment failed:', data.message);
                }
            } catch (error) {
                console.error('Payment failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (paymentId && payerId) {
            handlePaymentSuccess();
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md w-full mx-auto p-8"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex justify-center mb-8"
                >
                    <CheckCircle className="w-20 h-20 text-green-500" />
                </motion.div>
                <h2 className="text-3xl font-light text-center mb-6">Payment Successful</h2>

                    <p className="text-center text-gray-400"> Thank you for your purchase. Your transaction has been completed successfully.</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 w-full bg-white text-black py-3 px-6 rounded-none font-light transition duration-300 ease-in-out hover:bg-gray-200"
                    onClick={() => navigate('/')}
                >
                    Continue Shopping
                </motion.button>
            </motion.div>
        </div>
    );
}

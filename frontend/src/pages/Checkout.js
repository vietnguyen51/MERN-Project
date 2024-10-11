import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { CreditCard, Truck, Check, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common/index'; // Import API configuration

export default function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        city: '',
    });

    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        // Kiểm tra thông tin giao hàng
        if (!shippingAddress.fullName || !shippingAddress.phoneNumber || !shippingAddress.address || !shippingAddress.city) {
            toast.error('Please fill in all the shipping details');
            return;
        }

        const orderData = {
            fullName: shippingAddress.fullName,
            phoneNumber: shippingAddress.phoneNumber,
            address: shippingAddress.address,
            city: shippingAddress.city,
            paymentMethod,
            items: cartItems.map(item => ({
                productId: item.id, // Ensure this is correct and passed correctly
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
            })),
            totalPrice,
        };

        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(SummaryApi.createOrder.url, {
                method: SummaryApi.createOrder.method,
                headers,
                body: JSON.stringify(orderData),
            });

            const result = await response.json();
            console.log('API Response:', result);

            if (response.ok) {
                toast.success('Order placed successfully');
                setOrderPlaced(true); // Đơn hàng đã được đặt thành công
            } else {
                toast.error(result.message || 'Error placing order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Error placing order');
        }
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-white text-black flex items-center justify-center">
                <div className="text-center">
                    <Check size={64} className="mx-auto mb-4" />
                    <h2 className="text-2xl font-light mb-4">Thank you for your order</h2>
                    <p className="text-gray-600">Your order has been placed successfully.</p>
                    <button className="mt-4 bg-black text-white py-2 px-4 rounded" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black flex justify-center items-center p-4">
            <div className="max-w-3xl w-full bg-white shadow-lg p-8" style={{ minHeight: '80vh' }}>
                <h1 className="text-3xl font-light uppercase tracking-widest mb-12 text-center">Checkout</h1>
                <form onSubmit={handleCheckout}>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="order-2 md:order-1">
                            <h2 className="text-xl font-light mb-6">Order Summary</h2>
                            <div className="max-h-64 overflow-y-auto mb-6">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center mb-4"> {/* Ensure key is unique */}
                                        <img src={item.productImage} alt={item.productName} className="w-16 h-20 object-cover mr-4" />
                                        <div>
                                            <h3 className="font-medium">{item.productName}</h3>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                            <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-light">Total</span>
                                    <span className="text-lg font-medium">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-xl font-light mb-6">Shipping Information</h2>
                            <div className="space-y-4 mb-6">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={shippingAddress.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={shippingAddress.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="address"
                                    value={shippingAddress.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={shippingAddress.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            <h2 className="text-xl font-light mb-6">Payment Method</h2>
                            <div className="space-y-4 mb-6">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={() => setPaymentMethod('cod')}
                                        className="form-radio text-black"
                                    />
                                    <span>Cash on Delivery</span>
                                    <Truck size={20} className="ml-2" />
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={() => setPaymentMethod('paypal')}
                                        className="form-radio text-black"
                                    />
                                    <span>PayPal</span>
                                    <CreditCard size={20} className="ml-2" />
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 text-sm uppercase font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
                            >
                                Place Order
                                <ChevronRight size={16} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

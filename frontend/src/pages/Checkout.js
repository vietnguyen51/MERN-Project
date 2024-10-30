import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CreditCard, Truck, Check, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common/index';
import { resetCart } from '../store/cartSlice'; // Import action resetCart

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    useEffect(() => {
        if (cartItems.length === 0) {
        }
    }, [cartItems, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

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
                productId: item.id || item._id,
                productName: item.productName,
                size: item.size, // Đảm bảo truyền size
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
                headers['Authorization'] = `Bearer ${token}`; // Sửa lại cách gán token
            }

            // Nếu thanh toán qua PayPal
            if (paymentMethod === 'paypal') {
                const response = await fetch(SummaryApi.createPaypalOrder.url, {
                    method: "post",
                    headers,
                    body: JSON.stringify({ totalPrice }),
                });

                const result = await response.json();
                if (response.ok) {
                    window.location.href = result.approvalUrl;
                    dispatch(resetCart()); // Reset giỏ hàng sau khi đặt hàng thành công

                } else {
                    toast.error(result.message || 'Error creating PayPal transaction');
                }
            } else {
                // Nếu thanh toán bằng COD
                const response = await fetch(SummaryApi.createOrder.url, {
                    method: SummaryApi.createOrder.method,
                    headers,
                    credentials: 'include',
                    body: JSON.stringify(orderData),
                });

                const result = await response.json();
                if (response.ok) {

                    dispatch(resetCart()); // Reset giỏ hàng sau khi đặt hàng thành công
                    navigate('/success');
                } else {
                    toast.error(result.message || 'Error placing order');
                }
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Error placing order');
        }
    };


    return (
        <div className="min-h-screen bg-white text-black flex justify-center items-center p-4"

        >
            <div className="max-w-3xl w-full bg-white shadow-lg p-8" style={{ minHeight: '80vh' }}>
                <h1 className="text-3xl font-light uppercase tracking-widest mb-12 text-center">Checkout</h1>
                <form onSubmit={handleCheckout}>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="order-2 md:order-1">
                            <h2 className="text-xl font-light mb-6">Order Summary</h2>
                            <div className="max-h-64 overflow-y-auto mb-6">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center mb-4">
                                        <img src={item.productImage} alt={item.productName} className="w-16 h-20 object-cover mr-4" />
                                        <div>
                                            <h3 className="font-medium">{item.productName}</h3>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                            <p className="text-sm text-gray-600">Size: {item.size}</p>
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
                                    pattern="^[0-9]{10}$"
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

import React, { useState, useEffect } from 'react';
import { ChevronDown, Truck, CreditCard, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common/index';

export default function MyPurchases() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(SummaryApi.getAllOrders.url, {
                method: SummaryApi.getAllOrders.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                const sortedOrders = (data.data || []).sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setOrders(sortedOrders);
            } else {
                toast.error('Error fetching orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Error fetching orders');
        } finally {
            setLoading(false);
        }
    };

    const viewOrderDetails = (order) => {
        setSelectedOrder(order);
    };

    const closeDetails = () => {
        setSelectedOrder(null);
    };

    const goToProductDetail = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="min-h-screen text-gray-900"
             style={{ backgroundColor: 'rgba(248, 247, 245, 1)' }}
        >
            <header className="border-b border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-light tracking-wide">SAINT LAURENT</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-light mb-6">My Purchases</h2>
                {loading ? (
                    <p>Loading orders...</p>
                ) : (
                    <div className="space-y-6">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order._id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h3>
                                            <p className="text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className="text-lg font-medium">${order.totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="mt-4">
                                        {(order.items || []).map((item) => (
                                            <div key={item.productId._id || item._id} className="flex items-center mb-4">
                                                <img
                                                    src={item.productId.productImage[0]} // Lấy ảnh đầu tiên trong mảng productImage
                                                    alt={item.productId.productName}
                                                    className="w-16 h-20 object-cover mr-4 cursor-pointer"
                                                    onClick={() => goToProductDetail(item.productId._id)}
                                                />
                                                <div>
                                                    <h3 className="font-medium uppercase">{item.productId.productName}</h3>
                                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                    <p className="text-m text-gray-600">Size: {item.size}</p>
                                                    <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-600 flex items-center">
                                            {order.paymentMethod === 'cod' ? <Truck className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                                            <span className="ml-2">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'PayPal'}</span>
                                        </span>
                                        <button
                                            onClick={() => viewOrderDetails(order)}
                                            className="text-sm font-medium text-gray-600 hover:text-gray-900"
                                        >
                                            View Details <ChevronDown className="inline h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No orders found.</p>
                        )}
                    </div>
                )}
            </main>

            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"> {/* Tăng padding và chiều rộng tối đa */}
                        <div className="flex justify-between items-center mb-6"> {/* Tăng margin dưới để tạo khoảng cách lớn hơn */}
                            <h3 className="text-2xl font-bold">Order Details</h3> {/* Tăng kích thước tiêu đề */}
                            <button onClick={closeDetails} className="text-gray-600 hover:text-gray-900">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <p className="text-lg"><strong>Order ID:</strong> {selectedOrder._id}</p>
                        <p className="text-lg"><strong>Placed on:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                        <p className="text-lg"><strong>Full Name:</strong> {selectedOrder.fullName}</p>
                        <p className="text-lg"><strong>Phone Number:</strong> {selectedOrder.phoneNumber}</p>
                        <p className="text-lg"><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}</p>
                        <p className="text-lg"><strong>Total Price:</strong> ${selectedOrder.totalPrice.toFixed(2)}</p>
                        <p className="text-lg"><strong>Payment Method:</strong> {selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'PayPal'}</p>
                        <h4 className="font-bold text-xl mt-6 mb-4">Items:</h4> {/* Tăng kích thước tiêu đề danh sách sản phẩm */}
                        <ul>
                            {selectedOrder.items.map((item) => (
                                <li key={item.productId._id} className="flex justify-between mb-4"> {/* Tăng khoảng cách giữa các mục */}
                                    <span className="flex-1 uppercase flex flex-col items-start">
                            <img src={item.productId.productImage[0]} alt={item.productId.productName} className="w-24 h-24 object-cover mr-4 mb-1" /> {/* Tăng kích thước ảnh */}
                                        <span className="font-semibold ">{item.productId.productName}</span> {/* Đưa tên sản phẩm lên trên */}
                                        <span className="text-lg text-red-700">Quantity: {item.quantity}</span> {/* Tăng kích thước văn bản */}
                        </span>

                                    <span className="flex-1 uppercase text-center">Size: {item.size}</span>
                                    <span className="flex-1 text-right text-lg">${item.price.toFixed(2)}</span> {/* Tăng kích thước văn bản */}
                                </li>
                            ))}
                        </ul>
                        <button
                            className="mt-6 w-full p-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
                            onClick={closeDetails}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

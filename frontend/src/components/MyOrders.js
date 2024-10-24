import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/index'; // API configuration
import { toast } from 'react-toastify'; // Toast notifications
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icons for pagination

const MyOrders = () => {
    const [orders, setOrders] = useState([]); // Store fetched orders
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [loading, setLoading] = useState(false); // Loading state
    const [selectedOrder, setSelectedOrder] = useState(null); // Selected order for modal display

    const ordersPerPage = 5; // Orders per page

    // Fetch orders from backend API
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.getAllOrders.url, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                const sortedOrders = data.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setOrders(sortedOrders); // Save fetched orders
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderOrderRow = (order) => (
        <div key={order._id} className="border p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-bold mb-2 uppercase">{order.fullName}</h2>
            <p><strong>Phone:</strong> {order.phoneNumber}</p>
            <p><strong>Address:</strong> {order.address}, {order.city}</p>
            <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
            <p><strong>Status:</strong> {order.status.toUpperCase()}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
                {order.items.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                        <img
                            src={item.productId.productImage[0]}
                            alt={item.productName}
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                            <p className="font-semibold uppercase">{item.productName}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 uppercase">My Orders</h2>

            {loading ? (
                <div className="text-center py-6">Loading...</div>
            ) : (
                <>
                    <div className="grid gap-4">
                        {currentOrders.map(renderOrderRow)}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <span>
                            Showing {indexOfFirstOrder + 1} -{' '}
                            {Math.min(indexOfLastOrder, orders.length)} of {orders.length} orders
                        </span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border rounded-md disabled:opacity-50"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={indexOfLastOrder >= orders.length}
                                className="px-4 py-2 border rounded-md disabled:opacity-50"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {selectedOrder && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                                <h3 className="text-xl font-bold mb-4 uppercase">Order Details</h3>
                                <p><strong>Name:</strong> {selectedOrder.fullName}</p>
                                <p><strong>Phone:</strong> {selectedOrder.phoneNumber}</p>
                                <p><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}</p>
                                <p><strong>Total:</strong> ${selectedOrder.totalPrice.toFixed(2)}</p>
                                <p><strong>Payment:</strong> {selectedOrder.paymentMethod.toUpperCase()}</p>

                                <h4 className="font-bold mt-4 mb-2 uppercase">Items:</h4>
                                <ul className="space-y-2">
                                    {selectedOrder.items.map((item) => (
                                        <li key={item._id} className="flex items-center space-x-4">
                                            <img
                                                src={item.productId.productImage[0]}
                                                alt={item.productName}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div>
                                                <p className="uppercase">{item.productName} x {item.quantity}</p>
                                                <p>${item.price.toFixed(2)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className="w-full mt-6 p-2 bg-red-600 text-white rounded-md hover:bg-red-800"
                                    onClick={() => setSelectedOrder(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyOrders;

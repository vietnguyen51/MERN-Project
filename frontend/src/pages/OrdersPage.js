import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/index'; // API configuration
import { toast } from 'react-toastify';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OrdersPage = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const ordersPerPage = 10;

    // Fetch orders from the backend API
    const fetchAllOrders = async () => {
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
                setAllOrders(sortedOrders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${SummaryApi.getAllOrders.url}/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Order status updated successfully');
                fetchAllOrders(); // Refresh orders
            } else {
                toast.error(result.message || 'Error updating status');
            }
        } catch (error) {
            toast.error('Error updating status');
        }
    };

    const renderOrderRow = (order, index) => (
        <tr key={order._id} className="hover:bg-gray-50">
            <td className="px-6 py-4">{indexOfFirstOrder + index + 1}</td>
            <td className="px-6 py-4">{order.fullName}</td>
            <td className="px-6 py-4">{order.phoneNumber}</td>
            <td className="px-6 py-4">${order.totalPrice.toFixed(2)}</td>
            <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
            <td className="px-6 py-4">{order.paymentMethod}</td>
            <td className="px-6 py-4">
                <select
                    className="p-2 bg-gray-100 border border-gray-300 rounded-md"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </td>
            <td className="px-6 py-4">
                <button
                    className="p-2 bg-black text-white rounded-md hover:bg-gray-800"
                    onClick={() => setSelectedOrder(order)}
                >
                    View Details
                </button>
            </td>
        </tr>
    );

    const renderMobileOrderCard = (order) => (
        <div key={order._id} className="bg-white shadow p-4 rounded-lg mb-4">
            <h3 className="font-bold text-lg">{order.fullName}</h3>
            <p><strong>Phone:</strong> {order.phoneNumber}</p>
            <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
            <button
                className="w-full p-2 mt-4 bg-black text-white rounded-md hover:bg-gray-800"
                onClick={() => setSelectedOrder(order)}
            >
                View Details
            </button>
        </div>
    );

    return (
        <div className="container mx-auto p-6"

        >
            <h2 className="text-3xl font-bold mb-6">All Orders</h2>

            {loading ? (
                <div className="text-center py-6">Loading...</div>
            ) : (
                <>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                            <tr className="bg-gray-100 text-left text-sm font-semibold uppercase">
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Payment</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                            </thead>
                            <tbody>{currentOrders.map(renderOrderRow)}</tbody>
                        </table>
                    </div>

                    <div className="md:hidden">
                        {currentOrders.map(renderMobileOrderCard)}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <span>
                            Showing {indexOfFirstOrder + 1} -{' '}
                            {Math.min(indexOfLastOrder, allOrders.length)} of {allOrders.length} entries
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
                                disabled={indexOfLastOrder >= allOrders.length}
                                className="px-4 py-2 border rounded-md disabled:opacity-50"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {selectedOrder && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                                <h3 className="text-xl font-bold mb-4">Order Details</h3>
                                <p><strong>Name:</strong> {selectedOrder.fullName}</p>
                                <p><strong>Phone:</strong> {selectedOrder.phoneNumber}</p>
                                <p><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}</p>
                                <ul className="space-y-2 mt-4">
                                    {selectedOrder.items.map((item) => (
                                        <li key={item._id} className="flex items-center space-x-4">
                                            <img
                                                src={item.productId.productImage[0]}
                                                alt={item.productName}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div>
                                                <p>{item.productName}</p>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className="w-full mt-6 p-2 bg-black text-white rounded-md"
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

export default OrdersPage;

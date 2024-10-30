import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [userIdSearch, setUserIdSearch] = useState('');
    const ordersPerPage = 10;
    const navigate = useNavigate();
    const refreshInterval = 30000; // Tự động cập nhật sau mỗi 30 giây

    const fetchAllOrders = async (userId = '') => {
        setLoading(true);
        try {
            const url = userId
                ? `${SummaryApi.getAllOrders.url}?userId=${userId}`
                : SummaryApi.getAllOrders.url;
            const fetchData = await fetch(url, {
                method: SummaryApi.getAllOrders.method,
                credentials: 'include',
            });
            const dataResponse = await fetchData.json();
            if (dataResponse.success) {
                const sortedOrders = dataResponse.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setAllOrders(sortedOrders);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
        const intervalId = setInterval(fetchAllOrders, refreshInterval);

        return () => clearInterval(intervalId);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchAllOrders(userIdSearch);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchAllOrders(userIdSearch);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${SummaryApi.getAllOrders.url}/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const result = await response.json();
            if (response.ok) {
                toast.success('Status updated successfully');
                fetchAllOrders(userIdSearch);
            } else {
                toast.error(result.message || 'Error updating status');
            }
        } catch (error) {
            toast.error('Error updating status');
        }
    };

    const goToProductDetail = (productId) => {
        navigate(`/product/${productId}`);
    };

    const renderTableRow = (order, index) => (
        <tr key={order._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">{indexOfFirstOrder + index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap font-medium">{order.userId}</td>
            <td className="px-6 py-4 whitespace-nowrap font-medium">{order.fullName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{order.phoneNumber}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-black text-white">
                    ${order.totalPrice.toFixed(2)}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
            <td className="px-6 py-4 whitespace-nowrap">{order.paymentMethod}</td>
            <td className="px-6 py-4 whitespace-nowrap">
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
            <td className="px-6 py-4 whitespace-nowrap">
                <button
                    className="p-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                    onClick={() => setSelectedOrder(order)}
                >
                    View Details
                </button>
            </td>
        </tr>
    );

    const renderMobileCard = (order) => (
        <div key={order._id} className="bg-white shadow rounded-lg p-4 mb-4">
            <h3 className="font-bold text-lg mb-2">{order.fullName}</h3>
            <p className="text-sm mb-1"><strong>User ID:</strong> {order.userId}</p>
            <p className="text-sm mb-1"><strong>Phone:</strong> {order.phoneNumber}</p>
            <p className="text-sm mb-1">
                <strong>Total:</strong>
                <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-black text-white">
                    ${order.totalPrice.toFixed(2)}
                </span>
            </p>
            <p className="text-sm mb-3"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-sm mb-3"><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <div className="mb-4">
                <label className="text-sm font-medium">Order Status:</label>
                <select
                    className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>
            <button
                className="w-full p-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                onClick={() => setSelectedOrder(order)}
            >
                View Details
            </button>
        </div>
    );

    return (
        <div className="bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 px-6 pt-6">All Orders</h2>
            <form onSubmit={handleSearch} className="px-6 mb-6 flex">
                <input
                    type="text"
                    placeholder="Search by User ID"
                    value={userIdSearch}
                    onChange={(e) => setUserIdSearch(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                    type="submit"
                    className="p-2 bg-black text-white rounded-r-md hover:bg-gray-800 transition"
                >
                    <Search size={20} />
                </button>
            </form>
            {loading ? (
                <div className="text-center py-6">Loading orders...</div>
            ) : (
                <>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <th className="px-6 py-3">Sr.</th>
                                <th className="px-6 py-3">User ID</th>
                                <th className="px-6 py-3">Customer Name</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Order Date</th>
                                <th className="px-6 py-3">Payment Method</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {currentOrders.map(renderTableRow)}
                            </tbody>
                        </table>
                    </div>
                    <div className="md:hidden px-4 py-4">
                        {currentOrders.map(renderMobileCard)}
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
                        <span className="text-sm text-gray-700 mb-2 sm:mb-0">
                            Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, allOrders.length)} of {allOrders.length} Entries
                        </span>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <span className="text-sm text-gray-700">
                                Page {currentPage} of {Math.ceil(allOrders.length / ordersPerPage)}
                            </span>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={indexOfLastOrder >= allOrders.length}
                                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                    {selectedOrder && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold">Order Details</h3>
                                    <button onClick={() => setSelectedOrder(null)} className="text-gray-600 hover:text-gray-900">
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                                <p className="text-lg"><strong>User ID:</strong> {selectedOrder.userId}</p>
                                <p className="text-lg"><strong>Customer:</strong> {selectedOrder.fullName}</p>
                                <p className="text-lg"><strong>Phone:</strong> {selectedOrder.phoneNumber}</p>
                                <p className="text-lg"><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}</p>
                                <p className="text-lg"><strong>Total:</strong> ${selectedOrder.totalPrice.toFixed(2)}</p>
                                <p className="text-lg"><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                                <h4 className="font-bold text-xl mt-6 mb-4">Items:</h4>
                                <ul>
                                    {selectedOrder.items.map((item) => (
                                        <li key={item.productId._id} className="flex justify-between mb-4">
                                            <span className="flex-1 uppercase flex flex-col items-start">
                                                <img src={item.productId.productImage[0]} alt={item.productId.productName} className="w-24 h-24 object-cover mr-4 mb-1" />
                                                <span className="font-semibold">{item.productId.productName}</span>
                                                <span className="text-lg text-red-700">Quantity: {item.quantity}</span>
                                            </span>
                                            <span className="flex-1 uppercase text-center">Size: {item.size}</span>
                                            <span className="flex-1 text-right text-lg">${item.price.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className="mt-6 w-full p-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
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

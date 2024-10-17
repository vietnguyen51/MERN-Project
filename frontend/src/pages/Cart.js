import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice'; // Không cần resetCart ở đây
import { X, Minus, Plus } from 'lucide-react';

export default function Cart() {
    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleCheckoutClick = () => {
        navigate('/checkout'); // Chỉ điều hướng đến trang thanh toán, không reset giỏ hàng tại đây
    };

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-white text-black p-8">
            <h1 className="text-3xl font-light uppercase tracking-widest mb-12">Shopping Bag</h1>
            {items.length === 0 ? (
                <>
                    <p className="text-lg font-light">Your shopping bag is empty</p>
                    <h1 className="text-lg font-bold mt-4">
                        <Link to="/" className="text-black-500 hover:underline">
                            Continue Shopping
                        </Link>
                    </h1>
                </>
            ) : (
                <div>
                    <div className="space-y-8">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center border-b border-gray-200 pb-6">
                                <img
                                    src={item.productImage}
                                    alt={item.productName}
                                    className="w-24 h-32 object-cover mr-6 cursor-pointer"
                                    onClick={() => navigate(`/product/${item.id}`)}
                                />
                                <div className="flex-grow">
                                    <h2 className="text-lg font-medium mb-2 uppercase">{item.productName}</h2>
                                    <p className="text-sm text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            className="text-gray-500 hover:text-black transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="mx-4 text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            className="text-gray-500 hover:text-black transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-gray-500 hover:text-black transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 border-t border-gray-200 pt-6">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-light">Total</span>
                            <span className="text-lg font-medium">${totalPrice.toFixed(2)}</span>
                        </div>
                        <button onClick={handleCheckoutClick}
                                className="w-full bg-black text-white py-4 text-sm uppercase font-medium hover:bg-gray-900 transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

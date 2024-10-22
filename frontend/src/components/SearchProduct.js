import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common/index';

export default function SearchProduct({ onClose }) {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    // Bắt đầu hiệu ứng mở dần khi component được mount
    useEffect(() => {
        const timeoutId = setTimeout(() => setFadeIn(true), 10); // Kích hoạt mượt sau 10ms
        return () => clearTimeout(timeoutId);
    }, []);

    const handleSearch = useCallback(async () => {
        if (!query.trim()) {
            setProducts([]);
            return;
        }

        setIsSearching(true);
        try {
            const { url, method } = SummaryApi.searchProduct;
            const response = await fetch(`${url}?query=${encodeURIComponent(query)}`, { method });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Lỗi tìm kiếm:', error);
        } finally {
            setIsSearching(false);
        }
    }, [query]);

    useEffect(() => {
        const timeoutId = setTimeout(handleSearch, 500); // Debounce 500ms
        return () => clearTimeout(timeoutId);
    }, [query, handleSearch]);

    const closeModal = () => {
        setFadeIn(false); // Kích hoạt hiệu ứng đóng
        setTimeout(onClose, 300); // Đóng sau hiệu ứng 300ms
    };

    return (
        <div className={`fixed inset-0 z-50 flex ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            <div className="w-1/2 bg-black bg-opacity-50"
                 onClick={closeModal}>
            </div>

            <div
                className={`w-1/2 overflow-y-auto transform transition-transform duration-300 ${
                    fadeIn ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{backgroundColor: 'rgba(248, 247, 245, 1)'}}
            >

                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-light">SEARCH</h2>
                        <button onClick={closeModal} aria-label="Close search">
                            <X size={24}/>
                        </button>
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full py-2 border-b border-gray-300 focus:outline-none bg-[#f8f7f5] text-black placeholder-gray-500 focus:border-black"
                    />

                    <div className="mt-8">
                        {isSearching ? (
                            <div className="flex items-center justify-center h-32">
                                <p className="text-gray-500">Searching...</p>
                            </div>
                        ) : products.length > 0 ? (
                            <ul className="space-y-6">
                                {products.map((product) => (
                                    <li
                                        key={product._id}
                                        className="flex items-center space-x-6" // Căn giữa ảnh và nội dung theo chiều dọc
                                        style={{minHeight: '120px'}} // Đảm bảo mỗi hàng có chiều cao đồng đều
                                    >
                                        <Link to={`/product/${product._id}`} onClick={closeModal}>
                                            <img
                                                src={product.productImage[0] || '/placeholder.svg'}
                                                alt={product.productName}
                                                className="w-24 h-32 object-cover flex-shrink-0" // Ảnh cố định kích thước
                                            />
                                        </Link>
                                        <div className="flex flex-col justify-between h-full flex-1">
                                            <Link to={`/product/${product._id}`} onClick={closeModal}>
                                                <h4 className="text-sm font-medium text-black uppercase line-clamp-2">
                                                    {product.productName}
                                                </h4>
                                            </Link>
                                            <p className="text-xl font-medium mt-2">${product.price.toFixed(2)}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                        ) : (
                            <div className="flex items-center justify-center h-32">
                                <p className="text-gray-500">No products found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

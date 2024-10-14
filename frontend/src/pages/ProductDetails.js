import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice'; // Import hành động từ Redux slice
import SummaryApi from '../common/index'; // API URL configuration
import displayINRCurrency from '../helpers/displayUSDCurrency'; // Utility để hiển thị giá tiền

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        genderCategory: "",
        category: "",
        productImage: [],
        description: "",
        price: 0,
        sellingPrice: 0,
    });
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Lấy productId từ URL
    const dispatch = useDispatch(); // Khởi tạo dispatch để gửi hành động đến Redux

    // Hàm để lấy dữ liệu chi tiết sản phẩm từ API
    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${SummaryApi.productDetails.url}/${id}`, {
                method: 'GET',
            });

            const dataResponse = await response.json();

            if (response.ok) {
                setData(dataResponse?.data); // Cập nhật dữ liệu sản phẩm
            } else {
                console.error('Failed to fetch product details:', dataResponse);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product details:', error);
            setLoading(false);
        }
    };

    // Sử dụng useEffect để gọi API khi component được render
    useEffect(() => {
        fetchProductDetails(); // Gọi API khi component được render hoặc khi id thay đổi
    }, [id]);

    // Hàm xử lý khi thêm sản phẩm vào giỏ hàng
    const handleAddToCart = () => {
        dispatch(addToCart({
            id: data._id, // Lấy ID của sản phẩm
            productName: data.productName,
            price: data.sellingPrice,
            productImage: data.productImage[0], // Giả sử bạn muốn sử dụng hình ảnh đầu tiên
        }));
    };

    // Nếu đang tải dữ liệu, hiển thị màn hình loading
    if (loading) {
        return <div className="h-screen flex items-center justify-center text-sm font-light">Loading...</div>;
    }

    return (
        <div className="min-h-screen">
            {/* Khối chứa toàn bộ phần ảnh và thông tin sản phẩm */}
            <div className="container mx-auto flex flex-col lg:flex-row items-start justify-start">
                {/* Phần hình ảnh sản phẩm */}
                <div className="lg:w-2/3 flex flex-col justify-center items-center p-8">
                    {data.productImage.map((image, index) => (
                        <div key={index} className="w-full mb-8 flex justify-center">
                            <img
                                src={image}
                                alt={`${data.productName}-${index}`}
                                className="w-full h-auto object-contain max-h-[90vh] rounded-md"
                            />
                        </div>
                    ))}
                </div>

                {/* Phần thông tin sản phẩm */}
                <div className="lg:w-1/3 p-8 sticky top-0">
                    <h1 className="text-2xl font-semibold uppercase mb-4">{data.productName}</h1>
                    <p className="text-2xl font-semibold mb-2">{displayINRCurrency(data.sellingPrice)}</p>
                    <p className="text-gray-500 uppercase mb-6">{data.category}</p>
                    <p className="text-gray-600 mb-6 uppercase">{data.description}</p>
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-black text-white py-3 text-sm uppercase font-medium hover:bg-gray-800 transition-colors mb-4"
                    >
                        Add to Cart
                    </button>
                    <p className="text-xs text-gray-500 mb-4">AVERAGE DELIVERY TIME: 1-3 WORKING DAYS</p>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p className="uppercase cursor-pointer hover:underline">MORE DETAILS</p>
                        <p className="uppercase cursor-pointer hover:underline">FIND IN STORE</p>
                        <p className="uppercase cursor-pointer hover:underline">COMPLIMENTARY SHIPPING AND RETURNS</p>
                        <p className="uppercase cursor-pointer hover:underline">CUSTOMER SERVICE</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

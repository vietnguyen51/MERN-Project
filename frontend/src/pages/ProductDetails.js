import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import SummaryApi from '../common/index';
import displayINRCurrency from '../helpers/displayUSDCurrency';
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        genderCategory: "",
        category: "",
        productImage: [],
        description: "",
        price: 0,
        sellingPrice: 0,
        sizes: [],
    });
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const dispatch = useDispatch();

    const [selectedSize, setSelectedSize] = useState("");
    const [similarProducts, setSimilarProducts] = useState([]);

    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${SummaryApi.productDetails.url}/${id}`, {
                method: 'GET',
            });
            const dataResponse = await response.json();

            if (response.ok) {
                setData(dataResponse?.data || {});
                const similarResponse = await fetch(`${SummaryApi.similarProducts.url}/${id}/similar`, {
                    method: 'GET',
                });
                const similarData = await similarResponse.json();
                setSimilarProducts(similarData?.data || []);
            } else {
                console.error('Failed to fetch product details:', dataResponse);
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }
        dispatch(addToCart({
            id: data._id,
            productName: data.productName,
            price: data.sellingPrice,
            productImage: data.productImage[0],
            size: selectedSize,
        }));
    };


    if (loading) {
        return <div className="h-screen flex items-center justify-center text-sm font-light">Loading...</div>;
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto flex flex-col lg:flex-row items-start justify-start">
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

                <div className="lg:w-1/3 p-8 sticky top-0">
                    <h1 className="text-2xl font-semibold uppercase mb-4">{data.productName}</h1>
                    <p className="text-2xl font-semibold mb-2">{displayINRCurrency(data.sellingPrice)}</p>
                    <p className="text-gray-500 uppercase mb-6">{data.category}</p>
                    <p className="text-gray-600 mb-6 uppercase">{data.description}</p>

                    {data.sizes && data.sizes.length > 0 && (
                        <div className="relative mb-7" style={{ backgroundColor: 'rgba(248, 247, 245, 1)' }}>
                            <select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="w-full appearance-none px-4 py-3 text-sm focus:outline-none cursor-pointer"
                            >
                                <option value="" disabled>
                                    Select a size
                                </option>
                                {data.sizes.map((size) => (
                                    <option key={size} value={size} className="py-2">
                                        Size {size}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"></div>
                            <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    )}

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
            {data.category && (
                <CategoryWiseProductDisplay
                    category={data.category}
                    heading="Recommended Products"
                    currentProductId={id}
                />
            )}
        </div>
    );
};

export default ProductDetails;

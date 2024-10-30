import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayUSDCurrency from '../helpers/displayUSDCurrency';
import scrollTop from '../helpers/scrollTop';

const CategoryWiseProductDisplay = ({ category, heading, currentProductId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category, currentProductId);

        const filteredProducts = categoryProduct?.data.filter(
            (product) => product._id !== currentProductId
        );

        setData(filteredProducts || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [category, currentProductId]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <h2 className="text-2xl font-light uppercase tracking-wider text-center mb-12">{heading}</h2>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="bg-gray-200 h-80 w-full mb-4"></div>
                            <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 w-1/2"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                    {data.map((product) => (
                        <Link
                            to={`/product/${product._id}`}
                            key={product._id}
                            className="group w-full max-w-xs"
                            onClick={scrollTop}
                        >
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                                <img
                                    src={product.productImage[0]}
                                    alt={product.productName}
                                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                />
                            </div>
                            <h3 className="text-sm font-light uppercase mt-4">{product.productName}</h3>
                            <p className="text-sm text-gray-600">
                                {displayUSDCurrency(product.sellingPrice)}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryWiseProductDisplay;

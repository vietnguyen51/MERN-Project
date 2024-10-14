import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams để lấy URL params
import SummaryApi from '../common/index'; // Import API configuration

const CategoryProducts = () => {
    const { genderCategory, category } = useParams(); // Lấy params từ URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Fetch products từ API
        const fetchProductsByCategory = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/collections/${genderCategory}/${category}`, {
                    method: 'GET',
                });
                const result = await response.json();

                if (response.ok) {
                    setProducts(result.data);
                    setLoading(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [genderCategory, category]); // Gọi lại mỗi khi genderCategory hoặc category thay đổi

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error loading products.</h2>;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <Link to={`/product/${product._id}`} key={product._id} className="group">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                            <img
                                src={product.productImage[0]}
                                alt={product.productName}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;

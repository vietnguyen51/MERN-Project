import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SummaryApi from '../common/index'; // Import cấu hình API

class Women extends Component {
    constructor(props) {
        super(props);
        this.state = {
            womenProducts: [],
            loading: true,
            error: false
        };
    }

    componentDidMount() {
        this.fetchWomenProducts();
    }

    fetchWomenProducts = async () => {
        try {
            // Gọi API để lấy sản phẩm dành cho Women
            const response = await fetch(SummaryApi.womenProduct.url, {
                method: SummaryApi.womenProduct.method,
            });
            const result = await response.json();

            if (response.ok) {
                this.setState({ womenProducts: result.data, loading: false });
            } else {
                this.setState({ error: true, loading: false });
            }
        } catch (err) {
            this.setState({ error: true, loading: false });
        }
    };

    render() {
        const { loading, error, womenProducts } = this.state;

        if (loading) {
            return <h2>Loading...</h2>;
        }

        if (error) {
            return <h2>Error loading products.</h2>;
        }

        return (
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center my-8">Women's Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {womenProducts.map((product) => (
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
    }
}

export default Women;

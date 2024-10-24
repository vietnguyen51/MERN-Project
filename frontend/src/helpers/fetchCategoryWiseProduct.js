import SummaryApi from '../common/index';

const fetchCategoryWiseProduct = async (category, excludeProductId) => {
    try {
        const response = await fetch(
            `${SummaryApi.categoryProducts.url}?category=${category}&exclude=${excludeProductId}`,
            {
                method: SummaryApi.categoryProducts.method,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            console.error('Failed to fetch category products:', response.statusText);
            return { data: [] }; // Trả về mảng rỗng nếu lỗi xảy ra
        }

        const dataResponse = await response.json();
        return dataResponse || { data: [] }; // Đảm bảo luôn trả về mảng `data`
    } catch (error) {
        console.error('Error fetching category products:', error);
        return { data: [] }; // Trả về mảng rỗng nếu gặp lỗi
    }
};

export default fetchCategoryWiseProduct;

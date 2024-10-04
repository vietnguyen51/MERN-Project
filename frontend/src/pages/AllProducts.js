import { Plus } from "lucide-react";
import UploadProduct from "../components/UploadProduct";
import { useEffect, useState } from "react";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-4 px-6 flex justify-between items-center shadow-md rounded-lg overflow-hidden">
        <h2 className="font-bold text-2xl text-black">All Products</h2>
        <button
          className="border border-black text-black hover:bg-black hover:text-white transition-all flex items-center p-2 rounded"
          onClick={() => setUploadProduct(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Upload Product
        </button>
      </div>

      <div className="mt-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProduct.map((product, index) => (
            <AdminProductCard
              key={index + "allProduct"}
              data={product}
              fetchdata={fetchAllProduct}
            />
          ))}
        </div>
      </div>

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;

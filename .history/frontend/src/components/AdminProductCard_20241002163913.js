import React, { useState } from "react";
import { Edit } from "lucide-react";
import AdminEditProduct from "./AdminEditProduct";
import displayUSDCurrency from "../helpers/displayUSDCurrency";

const AdminProductCard = ({ data, fetchdata = () => {} }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col items-center">
        <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg">
          <img
            src={data?.productImage[0]}
            alt={data.productName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-center mb-2 line-clamp-2 h-12">
          {data.productName}
        </h2>
        <p className="text-lg sm:text-xl font-bold mb-4">
          {displayUSDCurrency(data.sellingPrice)}
        </p>
        <button
          className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
          onClick={() => setEditProduct(true)}
          aria-label="Edit product"
        >
          <Edit size={18} />
        </button>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata} // Đảm bảo fetchdata là một hàm hợp lệ
        />
      )}
    </div>
  );
};

export default AdminProductCard;

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadProduct from "../components/UploadProduct";
import AdminProductCard from "../components/AdminProductCard";
import SummaryApi from "../common";

export default function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
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
    <div className="min-h-screen bg-white text-black">
      <div className="bg-black py-6 px-8 flex justify-between items-center shadow-md">
        <h2 className="font-bold text-3xl text-white">All Products</h2>
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-black transition-all"
          onClick={() => setOpenUploadProduct(true)}
        >
          <Plus className="mr-2 h-5 w-5" /> Upload Product
        </Button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
}

import { Plus } from "lucide-react";
import { Button } from "@mui/material";
import UploadProduct from "../components/UploadProduct";
import { useEffect, useState } from "react";
import SummaryApi from "../common";



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
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-black transition-all"
          onClick={() => setUploadProduct(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Upload Product
        </Button>
      </div>
      {openUploadProduct && (
        <UploadProduct onClose={() => setUploadProduct(false)} />
      )}
      <div>{/* Dislpay Products   */}



      </div>
    </div>
  );
};

export default AllProducts;

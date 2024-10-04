import React, { useState } from "react";
import { X, CloudUpload, Trash } from "lucide-react";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { toast } from "react-toastify";
import SummaryApi from "../common";



const AdminEditProduct = ({ onClose, productData, fetchData = () => {} }) => {
  const [data, setData] = useState({
    productName: productData?.productName || "",
    genderCategory: productData?.genderCategory || "",
    category: productData?.category || "",
    productImage: productData?.productImage || [],
    description: productData?.description || "",
    price: productData?.price || "",
    sellingPrice: productData?.sellingPrice || "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) {
      toast.error("No files selected.");
      return;
    }

    setIsUploading(true);

    const uploadedImages = [];
    for (let file of files) {
      try {
        const uploadImageCloudinary = await uploadImage(file);
        uploadedImages.push(uploadImageCloudinary.url);
      } catch (error) {
        toast.error("Failed to upload image.");
      }
    }

    if (uploadedImages.length > 0) {
      setData((prevData) => ({
        ...prevData,
        productImage: [...prevData.productImage, ...uploadedImages],
      }));
    }

    setIsUploading(false);
  };

  const handleDeleteProductImage = (index) => {
    const newProductImages = [...data.productImage];
    newProductImages.splice(index, 1);
    setData((prevData) => ({
      ...prevData,
      productImage: newProductImages,
    }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const response = await fetch(SummaryApi.updateProduct.url, {
       method: SummaryApi.updateProduct.method, // phương thức HTTP
       credentials: "include",
       headers: {
         "Content-Type": "application/json", // Đảm bảo đúng header
       },
       body: JSON.stringify(data), // Đảm bảo đúng định dạng JSON
     });

     // Kiểm tra nếu response không thành công
     if (!response.ok) {
       const errorMessage = await response.text(); // Lấy lỗi chi tiết từ server nếu có
       console.error("Server error message:", errorMessage);
       throw new Error(`Server error: ${response.status} - ${errorMessage}`);
     }

     const responseData = await response.json();

     if (responseData.success) {
       toast.success(responseData.message);
       onClose();

       if (typeof fetchData === "function") {
         fetchData(); // Gọi hàm fetchData nếu tồn tại
       }
     } else {
       toast.error(responseData.message);
     }
   } catch (error) {
     toast.error("Failed to update product.");
     console.error("Error updating product:", error);
   }
 };



  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl h-full max-h-[90vh] overflow-hidden relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold">Edit Product</h2>
            <button
                className="text-gray-500 hover:text-black transition-colors"
                onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          <form className="p-6 overflow-y-auto h-[calc(90vh-80px)]" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                    type="text"
                    id="productName"
                    placeholder="Enter Product Name"
                    name="productName"
                    value={data.productName}
                    onChange={handleOnChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />
              </div>
              <div>
                <label htmlFor="genderCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender Category
                </label>
                <select
                    required
                    value={data.genderCategory}
                    name="genderCategory"
                    onChange={handleOnChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Gender Category</option>
                  <option value="all">All</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                    required
                    value={data.category}
                    name="category"
                    onChange={handleOnChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Category</option>
                  {productCategory.map((el, index) => (
                      <option value={el.value} key={index}>
                        {el.label}
                      </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="uploadImageInput" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-black transition-colors">
                  <input
                      type="file"
                      id="uploadImageInput"
                      className="hidden"
                      onChange={handleUpdateProduct}
                      accept="image/*"
                      multiple
                  />
                  <label htmlFor="uploadImageInput" className="cursor-pointer">
                    <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
                  </label>
                </div>
              </div>
              {isUploading && <p>Uploading ...</p>}
              {data.productImage.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.productImage.map((el, index) => (
                        <div key={index} className="relative group">
                          <img
                              src={el}
                              alt={`Product ${index + 1}`}
                              className="w-20 h-20 object-cover border border-gray-300 rounded cursor-pointer"
                              onClick={() => {
                                setOpenFullScreenImage(true);
                                setFullScreenImage(el);
                              }}
                          />
                          <button
                              type="button"
                              className="absolute top-0 right-0 bg-white text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleDeleteProductImage(index)}
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                    ))}
                  </div>
              )}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                    type="number"
                    id="price"
                    placeholder="Enter price"
                    value={data.price}
                    name="price"
                    onChange={handleOnChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />
              </div>
              <div>
                <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price
                </label>
                <input
                    type="number"
                    id="sellingPrice"
                    placeholder="Enter selling price"
                    value={data.sellingPrice}
                    name="sellingPrice"
                    onChange={handleOnChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                    id="description"
                    placeholder="Enter product description"
                    rows={3}
                    onChange={handleOnChange}
                    name="description"
                    value={data.description}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>
              <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
                Update Product
              </button>
            </div>
          </form>
        </div>

        {openFullScreenImage && (
            <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )}
      </div>
  );
};

export default AdminEditProduct;
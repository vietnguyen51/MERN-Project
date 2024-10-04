import React, { useState } from "react";
import productCategory from "../helpers/productCategory";
import { X, CloudUpload, Trash } from "lucide-react";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    genderCategory: productData?.genderCategory,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [isUploading] = useState(false); // Theo dõi quá trình tải lên

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    console.log("image index", index);

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  {
    /**upload product */
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Edit Product</h2>
          <div
            className="text-gray-500 hover:text-black transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </div>
        </div>

        <form
          className="p-6 overflow-y-auto h-[calc(90vh-80px)]"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="genderCategory"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                  <option value={el.value} key={el.value + index}>
                    {el.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="uploadImageInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-black transition-colors">
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                  accept="image/*"
                  multiple // Cho phép chọn nhiều file
                />
                <label htmlFor="uploadImageInput" className="cursor-pointer">
                  <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                </label>
              </div>
            </div>
            {isUploading && <p>Uploading ...</p>}{" "}
            {/* Hiển thị thông báo khi đang tải ảnh */}
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
                      className="absolute top-0 right-0 bg-slate-50 text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="sellingPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Upload Product
            </button>
          </div>
        </form>
      </div>

      {/***display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;

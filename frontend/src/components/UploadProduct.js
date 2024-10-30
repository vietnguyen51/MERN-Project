import React, { useState } from "react";
import { X, CloudUpload, Trash } from "lucide-react";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import SearchProduct from "./SearchProduct";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    genderCategory: "",
    category: "",
    sizes: [],
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",

  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUploadProduct = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) {
      toast.error("No files selected.");
      return;
    }

    const validExtensions = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    setIsUploading(true);

    const uploadedImages = [];
    for (let file of files) {
      if (!validExtensions.includes(file.type)) {
        toast.error("Please upload only images (JPEG, PNG, GIF, WebP).");
        continue;
      }

      try {
        const uploadImageCloudinary = await uploadImage(file);
        uploadedImages.push(uploadImageCloudinary.url);
      } catch (error) {
        toast.error("Failed to upload image.");
      }
    }

    if (uploadedImages.length > 0) {
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, ...uploadedImages],
      }));
    }
    setIsUploading(false);
  };

  const handleDeleteProductImage = (index) => {
    const newProductImages = [...data.productImage];
    newProductImages.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data), // Ensure sizes is included here
    });

    const responseData = await response.json();

    if (responseData.success) {
      onClose();
      if (typeof fetchData === "function") {
        fetchData();
      }
    } else if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  const getAvailableSizes = () => {
    const clothingSizes = ["jackets", "shirts", "jersey", "pants", "denim", "knitwear", "outerwear", "jackets-and-pants", "dresses-and-skirts", "shirts-and-tops"];
    const shoeSizes = ["formal", "boots", "sneakers", "sandals", "flats", "loafers"];

    if (clothingSizes.includes(data.category)) {
      return ["S", "M", "L", "XL"];
    } else if (shoeSizes.includes(data.category)) {
      return ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"];
    } else {
      return [];
    }
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl h-full max-h-[90vh] overflow-hidden relative">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold">Upload Product</h2>
            <button
                className="text-gray-500 hover:text-black transition-colors"
                onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          <form
              className="p-6 overflow-y-auto h-[calc(90vh-80px)]"
              onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
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
                <label htmlFor="genderCategory" className="block text-sm font-medium text-gray-700 mb-1">Gender Category</label>
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
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    required
                    value={data.category}
                    name="category"
                    onChange={handleOnChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Category</option>
                  {productCategory.map((el, index) => (
                      <option value={el.value} key={el.value + index}>{el.label}</option>
                  ))}
                </select>
              </div>

              {getAvailableSizes().length > 0 && (
                  <div>
                    <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <div className="flex gap-2 flex-wrap">
                      {getAvailableSizes().map((size) => (
                          <label key={size} className="flex items-center">
                            <input
                                type="checkbox"
                                value={size}
                                checked={data.sizes.includes(size)}
                                onChange={(e) => {
                                  const selectedSize = e.target.value;
                                  setData((prev) => ({
                                    ...prev,
                                    sizes: prev.sizes.includes(selectedSize)
                                        ? prev.sizes.filter((s) => s !== selectedSize)
                                        : [...prev.sizes, selectedSize],
                                  }));
                                }}
                                className="mr-2"
                            />
                            {size}
                          </label>
                      ))}
                    </div>
                  </div>
              )}

              <div>
                <label htmlFor="uploadImageInput" className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-black transition-colors">
                  <input
                      type="file"
                      id="uploadImageInput"
                      className="hidden"
                      onChange={handleUploadProduct}
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
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
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
                <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
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
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
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
                Upload Product
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

export default UploadProduct;

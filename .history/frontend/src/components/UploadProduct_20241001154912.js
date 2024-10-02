import React, { useState } from "react";
import { X, CloudUpload, Delete } from "lucide-react"; 
import productCategory from '../helper/productCategory';

const UploadProduct = ({ onClose }) => {
    const [data, setData] = useState({
        productName: "",
        genderCategory: "",
        category: "",
        productImages: "",
        descriptions: "",
        price: "",
        selling: "",
    });
        const [UploadProductImageInput, setUploadProductImageInput] = useState("");


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý submit form
    };

    const handleUploadProduct = (e) => {
        // Xử lý upload hình ảnh
        const file = e.target.files[0];
        setUploadProductImageInput()
        console.log("file",file)
    };

    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-75 bg-black z-50">
        <div className="bg-white shadow-lg p-6 max-w-screen-lg w-full relative max-h-[45rem] overflow-y-auto">
          <button className="absolute top-4 right-4" onClick={onClose}>
            <X
              size={24}
              className="text-black hover:text-gray-600 transition duration-150"
            />
          </button>
          <h1 className="text-2xl font-bold mb-6 text-center text-black">
            Upload Product
          </h1>

          <form
            className="grid p-4 gap-2 overflow-y-auto h-full pb-5"
            onSubmit={handleSubmit}
          >
            <label htmlFor="productName">Product Name :</label>
            <input
              type="text"
              id="productName"
              placeholder="Enter Product Name"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
              required
            />

            <label htmlFor="genderCategory">Gender Category :</label>
            <select
              required
              value={data.genderCategory}
              name="genderCategory"
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
            >
              <option value="">Select Gender Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>

            <label htmlFor="category">Category :</label>
            <select
              required
              value={data.category}
              name="category"
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
            >
              <option value={""}>Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              ))}
            </select>

            <label htmlFor="productImage" className="mt-3">
              Product Image :
            </label>
            <label htmlFor="uploadImageInput">
              <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl">
                    <CloudUpload />
                  </span>
                  <p className="text-sm">Upload Product Image</p>
                  <input
                    type="file"
                    id="uploadImageInput"
                    className="hidden"
                    onChange={handleUploadProduct}
                  />
                </div>
              </div>
            </label>

            <div>
              {data?.productImages[0] ? (
                <div className="flex items-center gap-2">
                  {data.productImages.map((el, index) => (
                    <div className="relative group" key={index}>
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                      />
                      <div className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer">
                        <Delete />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-600 text-xs">
                  *Please upload product image
                </p>
              )}
            </div>

            <label htmlFor="price" className="mt-3">
              Price :
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter price"
              value={data.price}
              name="price"
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
              required
            />

            <label htmlFor="sellingPrice" className="mt-3">
              Selling Price :
            </label>
            <input
              type="number"
              id="sellingPrice"
              placeholder="Enter selling price"
              value={data.sellingPrice}
              name="sellingPrice"
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
              required
            />

            <label htmlFor="description" className="mt-3">
              Description :
            </label>
            <textarea
              className="h-28 bg-slate-100 border resize-none p-1"
              placeholder="Enter product description"
              rows={3}
              onChange={handleOnChange}
              name="description"
              value={data.description}
            ></textarea>
          </form>
        </div>
      </div>
    );
};

export default UploadProduct;

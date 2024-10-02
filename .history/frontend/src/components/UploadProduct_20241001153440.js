import React from "react";
import { X, CloudUpload, Delete } from "lucide-react"; 
import { useState } from "react";
import productCategory from  '../helper/productCategory'


const UploadProduct = ({ onClose }) => {

    const [data,setdata] = useState({
        productName : "",
        genderCategory : "",
        categoty : "",
        productImages : "",
        descriptions : "",
        price : "",
        selling : "",
    })
    const handleOnChange =(e) => {
        
    }
    
    
    const handleSubmit =(e) =>{

    }
    const handleUploadProduct = (e) =>{
    }


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-75 bg-black z-50">
      <div className="bg-white shadow-lg p-6 max-w-1 w-[40rem] relative">
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
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
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
            onChange={(e) =>
              setdata({ ...data, genderCategory: e.target.value })
            }
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
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
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
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                      
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                      
                      >
                        <Delete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Please upload your product image</p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            placeholder="enter price"
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
            placeholder="enter selling price"
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
            placeholder="enter product description"
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

import React from "react";
import { X } from "lucide-react";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg rounded-md w-full max-w-lg p-4 relative">
        <div
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <X size={24} />
        </div>
        <div className="flex justify-center p-4">
          <img
            src={imgUrl}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;


import React from "react";
import { X } from "lucide-react";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white shadow-2xl rounded-lg max-w-4xl w-full mx-4">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="flex justify-center items-center p-4 max-h-[calc(100vh-120px)]">
          <image
            src={imgUrl}
            alt="Displayed image"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;

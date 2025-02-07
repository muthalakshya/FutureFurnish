import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const Cards = ({ imgProd, productId }) => {
  // const { productId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative group" onClick={()=>{navigate(`/home-decor/${productId}`)}}>
      {/* Card Image */}
      <img
        src={imgProd}
        alt="Product Image"
        className="w-full h-64 object-cover"
      />

      {/* Title and Price Section */}
      <div className="p-4 text-center">
        <h2 className="text-sm font-medium text-gray-800">
          GALLERY 25 SUNDARBANS
        </h2>
        <p className="text-lg font-bold text-gray-600 my-2">$499</p>
        <div className="flex space-x-2 mt-4">
          <button className="flex-1 bg-black text-white py-2 rounded-md hover:bg-green-500 transition duration-300">
            ADD TO CART
          </button>
          <button className="flex-1 bg-black text-white py-2 rounded-md hover:bg-green-500 transition duration-300">
            BUY NOW
          </button>
        </div>
      </div>

      {/* Hover Icons */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2 shadow-lg">
        <FaRegHeart className="h-6 w-6 text-gray-600 hover:text-red-500 cursor-pointer" />
        <FaMagnifyingGlassPlus className="h-6 w-6 text-gray-600 hover:text-blue-500 cursor-pointer" />
        <FaShareAlt className="h-6 w-6 text-gray-600 hover:text-green-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default Cards;

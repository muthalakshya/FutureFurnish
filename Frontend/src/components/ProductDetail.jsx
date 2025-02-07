import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  const [selectedImage, setSelectedImage] = useState(product.img);

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="flex mt-4 gap-2">
              <img
                src={product.img}
                alt="Thumbnail"
                className={`w-20 h-20 object-cover rounded-lg border ${
                  selectedImage === product.img ? "border-blue-500" : "border-gray-300"
                } cursor-pointer`}
                onClick={() => setSelectedImage(product.img)}
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl text-gray-800 font-semibold">${product.price}</p>
            <p className="text-gray-700">
              This is a placeholder description for {product.name}.
            </p>
            <button className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

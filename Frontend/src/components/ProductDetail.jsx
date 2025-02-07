import React, { useState } from "react";
import imgcart24 from "../assets/imgcart24.jpg";
import imgcart25 from "../assets/imgcart25.jpg";
import imgcart26 from "../assets/imgcart26.jpg";
import imgcart27 from "../assets/imgcart27.jpg";

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState("Gray");
  const [selectedImage, setSelectedImage] = useState(imgcart24);

  const product = {
    name: "Zip Tote Basket",
    price: 140,
    description:
      "The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, shoulder sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keep your goods protected for all-day use.",
    colors: ["Gray", "Black"],
    images: [
        imgcart24,
      imgcart25,
      imgcart26,
      imgcart27,
    ],
    features: ["Durable canvas", "Convertible straps", "Spacious interior"],
    care: "Spot clean with a damp cloth.",
    shipping: "Ships in 3-5 business days.",
    returns: "30-day hassle-free returns.",
    relatedProducts: [
      { name: "Zip Tote Basket", price: 140, image: imgcart24 },
      { name: "Zip High Wall Tote", price: 150, image: imgcart25 },
      { name: "Halfsize Tote", price: 210, image: imgcart26 },
      { name: "High Wall Tote", price: 210, image: imgcart27 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="flex mt-4 gap-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg border ${
                    selectedImage === image ? "border-blue-500" : "border-gray-300"
                  } cursor-pointer`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl text-gray-800 font-semibold">${product.price}</p>
            <p className="text-gray-700">{product.description}</p>

            {/* Color Options */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full ${
                      color === "Gray"
                        ? "bg-gray-500"
                        : color === "Black"
                        ? "bg-black"
                        : ""
                    } ${
                      selectedColor === color ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Add to Bag Button */}
            <button className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
              Add to Bag
            </button>

            {/* Expandable Details */}
            <div className="mt-6 space-y-4">
              <details className="border-b pb-4">
                <summary className="cursor-pointer font-semibold">
                  Features
                </summary>
                <ul className="mt-2 list-disc pl-6">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </details>
              <details className="border-b pb-4">
                <summary className="cursor-pointer font-semibold">Care</summary>
                <p className="mt-2">{product.care}</p>
              </details>
              <details className="border-b pb-4">
                <summary className="cursor-pointer font-semibold">
                  Shipping
                </summary>
                <p className="mt-2">{product.shipping}</p>
              </details>
              <details>
                <summary className="cursor-pointer font-semibold">
                  Returns
                </summary>
                <p className="mt-2">{product.returns}</p>
              </details>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Customers also bought</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{relatedProduct.name}</h3>
                <p className="text-gray-700 font-medium">${relatedProduct.price}</p>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                  Add to Bag
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

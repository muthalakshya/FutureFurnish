import React from "react";
import image19 from "../assets/img19.jpg";
import image20 from "../assets/img20.jpg";
import image21 from "../assets/img21.jpg";
import image22 from "../assets/img22.jpg";
import Cards from "./Cards";

const Newarrival = () => {
  // Array of images for the right section (you can adjust or add more)
  const rightSectionImages = [image20, image21, image22, image19];

  return (
    <div className="px-4 sm:px-8 lg:px-16">
      <h1 className="text-center text-4xl py-4 font-bold">NEW ARRIVALS</h1>
      <div className="flex flex-col sm:flex-row">
        {/* Left Section: Featured Product */}
        <div className="sm:w-1/2 p-16">
          <img
            src={image19}
            alt="Featured New Arrival"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <h2 className="pt-4 pl-2 text-xl font-semibold">Yuuga</h2>
          <h3 className="pb-4 pl-2 text-gray-600">Organic Collection</h3>
          <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
            Explore all new bedding collections
          </button>
        </div>

        {/* Right Section: Product Cards */}
        <div className="sm:w-1/2 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rightSectionImages.map((img, idx) => (
              <Cards key={idx} imgProd={img} name={"Demo collection"} price={123} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newarrival;

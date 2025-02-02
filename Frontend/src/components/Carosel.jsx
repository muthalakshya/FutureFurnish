import image11 from '../assets/img11.jpg'
import image12 from '../assets/img12.jpg'
import image13 from '../assets/img13.jpg'
import image14 from '../assets/img14.jpg'
import image15 from '../assets/img15.jpg'
import image16 from '../assets/img16.jpg'
import image17 from '../assets/img17.jpg'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carosel = () => {
    const slides = [
      {
        id: 1,
        title: "Transform your bedroom into a vibrant oasis with Boho.",
        image: "https://cdn.ddecor.com/media/wysiwyg/bannerslider/desktop/3_Everyday-Basics.jpg", // Replace with your image URL
      },
      {
        id: 2,
        title: "Discover new arrivals to elevate your home decor.",
        image: image11, // Replace with another image URL
      },
      {
        id: 3,
        title: "Sustainability meets style in our collections.",
        image: image13, // Replace with another image URL
      },
      {
        id: 4,
        title: "Sustainability meets style in our collections.",
        image: image14, // Replace with another image URL
      },
      {
        id: 5,
        title: "Sustainability meets style in our collections.",
        image: image15, // Replace with another image URL
      },
      {
        id: 6,
        title: "Sustainability meets style in our collections.",
        image: image16, // Replace with another image URL
      },
      {
        id: 7,
        title: "Sustainability meets style in our collections.",
        image: image17, // Replace with another image URL
      },
    ];
  
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const handleNext = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
  
    const handlePrev = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
  
    return (
      <div className="relative w-full h-[730px] overflow-hidden">
        <AnimatePresence>
          {slides.map(
            (slide, index) =>
              currentSlide === index && (
                <motion.div
                  key={slide.id}
                  className="absolute w-full h-full"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0  bg-opacity-30 flex items-center justify-left">
                    <div className="text-left text-white w-128 pl-32">
                      <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
                      <button className="mt-4 px-6 py-2 bg-white text-black rounded-md shadow-md">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
  
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-gray-500"
              }`}
            ></button>
          ))}
        </div>
  
        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
        >
          &#8250;
        </button>
      </div>
    );
  };
  
  export default Carosel;
  
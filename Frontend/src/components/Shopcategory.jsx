import React from "react";
import Slider from "react-slick";
import image19 from '../assets/img19.jpg'
import image21 from '../assets/img21.jpg'
import image20 from '../assets/img20.jpg'
import image22 from '../assets/img22.jpg'


const Shopcategory = () => {
  const settings = {
    dots: true, // Pagination dots
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of cards visible
    slidesToScroll: 1, // Scroll by one card
    responsive: [
      {
        breakpoint: 1024, // Screen width < 1024px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Screen width < 768px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Screen width < 480px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Data for carousel items
  const carouselData =  [
    {
      id: 2,
      title: "Discover new arrivals to elevate your home decor.",
      image: image19, // Replace with another image URL
    },
    {
      id: 3,
      title: "Sustainability meets style in our collections.",
      image: image20, // Replace with another image URL
    },
    {
      id: 4,
      title: "Sustainability meets style in our collections.",
      image: image21, // Replace with another image URL
    },
    {
      id: 5,
      title: "Sustainability meets style in our collections.",
      image: image22, // Replace with another image URL
    }
  ];

  return (
    <div className="container mx-auto my-8  sm:px-12 px-8 bg-zinc-100">
      <h1 className="text-center text-4xl py-4 font-bold ">SHOP CATEGORIES</h1>
      <Slider {...settings}>
        {carouselData.map((item, index) => (
          <div key={index} className="p-4">
            <div className="relative bg-white rounded-lg shadow-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover rounded-t-lg "
              />
              <div className="p-4 absolute bottom-0 bg-white pr-2 sm:ml-2 mb-2 sm:pr-9 mr-0 hover:bottom-6 transition-all hover:text-white hover:bg-zinc-800 items-center justify-left">
                <p className="text-gray-600 text-sm uppercase tracking-wide ">
                  Shop
                </p>
                <h3 className="text-lg font-bold w-64">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Shopcategory;

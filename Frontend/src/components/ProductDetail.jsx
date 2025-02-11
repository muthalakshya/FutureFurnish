import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {assets, products} from "../assets copy/assets"
import { ShopContext } from "../content/ShopContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { productId } = useParams();
  const { currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [size, setSize] = useState('');
  const product = products[productId]

  const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    // <div className="min-h-screen bg-gray-50 p-6 pt-24">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="flex flex-col lg:flex-row gap-8 ">
    //       <div className="w-full lg:w-1/2 bg-black relative">
    //         <img
    //           src={product.image}
    //           alt={product.name}
    //           className="w-full sm:h-[520px] absolute left-0 top-0  p-2 object-contain  rounded-lg"
    //         />
    //         <div className="flex mt-4 gap-2">
    //           <img
    //             src={product.image}
    //             alt="Thumbnail"
    //             className={`w-20 h-20 object-cover rounded-lg border ${
    //               selectedImage === product.img ? "border-blue-500" : "border-gray-300"
    //             } cursor-pointer`}
    //             onClick={() => setSelectedImage(product.img)}
    //           />
    //         </div>
    //       </div>

    //       <div className="w-full lg:w-1/2 space-y-4">
    //         <h1 className="text-3xl font-bold">{product.name}</h1>
    //         <p className="text-xl text-gray-800 font-semibold">${product.price}</p>
    //         <p className="text-gray-700">
    //           This is a placeholder description for {product.name}.
    //         </p>
    //         <div className='flex flex-col gap-4 my-8'>
    //             <p>Select Size</p>
    //             <div className='flex gap-2'>
    //               {
    //                 product.sizes.map((item,index)=>(
    //                   <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-300  ${item===size ?' bg-orange-500 text-white':''}`} key={index}>{item}</button>
    //                 ))
    //               }
    //             </div>
    //           </div>
    //         <button className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
    //           Add to Bag
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='border-t-2 pt-24 sm:px-24 px-4 transition-opacity ease-in duration-500 opacity-100'>
    <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
      <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
          {product.image.map((item, index) => {
            return (
              <img
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt={`product-${index}`}
                onClick={()=>setImage(item)}
              />
            );
          })}
        </div>
        <div className='w-full sm:w-[80%]'>
          <img src={product.image} className='w-full h-auto'/>
        </div>
      </div>
      <div className='flex-1'>
        <h1 className='font-medium text-2x1 mt-2'>{product.name}</h1>
        <div className=' flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_dull_icon} alt="" className="w-3 5" />
          <p className='pl-2'>(122)</p>
        </div>
          <p className='mt-5 text-3x1 font-medium'>$ {product.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                product.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-300  ${item===size ?' bg-orange-500 text-white':''}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>
          <button 
            onClick={() => {
              if (size) {
                addToCart(product._id, size); 
              } else {
                toast.error("Select Product Size")
              }
              console.log(size)
            }} 
            className='bg-black text-white px-8 py-3 text-sm active:bg-orange-700'
          >
            ADD TO CART
          </button>

          {/* <button onClick={()=>addToCart(product._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button> */}
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className='mt-20 mb-2'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-smtext-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>


  </div>
  );
};

export default ProductDetail;

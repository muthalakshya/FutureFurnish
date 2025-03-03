import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {assets} from "../assets copy/assets"
import {products} from "../assets/data"
import { ShopContext } from "../content/ShopContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { productId } = useParams();
  const { currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState("");
  useEffect(() => {
    // ✅ Find the product based on productId
    const foundProduct = products.find(product => product.id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
    } else {
      console.error("Product not found!");
    }
  }, [productId]);

  if (!productData) {
    return <h1>Loading Product...</h1>; // Show loading if product is not found yet
  }


  return (
    
    <div className='border-t-2 pt-24 sm:px-24 px-4 transition-opacity ease-in duration-500 opacity-100'>
    <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
      <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        {/* <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
          {productData.map((item, index) => {
            return (
              <img
                src={item.img_link}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt={`product-${index}`}
                onClick={()=>setImage(item)}
              />
            );
          })}
        </div> */}
        <div className='w-full sm:w-[80%]'>
          <img src={productData.img_link} className='w-full h-auto'/>
        </div>
      </div>
      <div className='flex-1'>
        <h1 className='font-medium text-2x1 mt-2'>{productData.name}</h1>
        <div className=' flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_dull_icon} alt="" className="w-3 5" />
          <p className='pl-2'>(122)</p>
        </div>
          <p className='mt-5 text-3x1 font-medium'>$ {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-300  ${item===size ?' bg-orange-500 text-white':''}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>
          <button 
            onClick={() => {
              if (size) {
                addToCart(productData._id, size); 
              } else {
                toast.error("Select Product Size")
              }
              console.log(size)
            }} 
            className='bg-black text-white px-8 py-3 text-sm active:bg-orange-700'
          >
            ADD TO CART
          </button>

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

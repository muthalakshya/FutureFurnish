import React from 'react'
import image19 from '../assets/img19.jpg'
import image21 from '../assets/img21.jpg'
import image20 from '../assets/img20.jpg'
import image22 from '../assets/img22.jpg'
import { FaRegHeart } from "react-icons/fa";
import Cards from './Cards'

const Newarrival = () => {
  return (
    <div>
      <h1 className="text-center text-4xl py-4 font-bold ">NEW ARRIVALS</h1>
      <div className='w-full sm:px-32  sm:flex '>
      <div className='sm:w-1/2 p-8'>
        <img src={image19} alt="" />
        <h2 className='pt-4 pl-2'>Yuuga</h2>
        <h3 className='pb-4 pl-2'>Organic Collection</h3>
        <button className='w-full bg-black text-white py-2'>Explore all new bedding collections</button>
      </div>
      <div className='sm:flex sm:w-1/2 p-8'>
        <div className='px-2'>
          <div className='rounded-b-lg mb-9 mt-4 px-2  relative border-b-1 shadow-xl shadow-amber-900'>
            <img src={image19} alt="" className='rounded-t-2xl h-72 w-full' />
            <FaRegHeart className='absolute bottom-16 h-[30px] w-full left-24 hover:text-red-500'/>
            <h2 className='pt-2 pl-2'>Yuuga <span className='pl-8 text-right'>$12</span></h2>
            <h3 className='pb-2 pl-2'>Organic Collection</h3>
            <button className=' bg-black text-white py-2 px-3 ml-0.5 mb-2 hover:bg-green-500 hover:text-white'>ADD TO CART</button>
            <button className=' bg-black text-white py-2 ml-0.5 px-6 hover:bg-green-500 hover:text-white'>BUY NOW</button>
          </div>
          <div className='rounded-b-lg mb-9 mt-4 px-2  relative border-b-1 shadow-xl shadow-amber-900'>
            <img src={image19} alt="" className='rounded-t-2xl h-72 w-full' />
            <FaRegHeart className='absolute bottom-16 h-[30px] w-full left-24 hover:text-red-500'/>
            <h2 className='pt-2 pl-2'>Yuuga <span className='pl-8 text-right'>$12</span></h2>
            <h3 className='pb-2 pl-2'>Organic Collection</h3>
            <button className=' bg-black text-white py-2 px-3 ml-0.5 mb-2 hover:bg-green-500 hover:text-white'>ADD TO CART</button>
            <button className=' bg-black text-white py-2 ml-0.5 px-6 hover:bg-green-500 hover:text-white'>BUY NOW</button>
          </div>
        </div>
        <div className='px-2'>
          <div className='rounded-b-lg mb-9 mt-4 px-2  relative border-b-1 shadow-xl shadow-amber-900'>
            <img src={image19} alt="" className='rounded-t-2xl h-72 w-full' />
            <FaRegHeart className='absolute bottom-16 h-[30px] w-full left-24 hover:text-red-500'/>
            <h2 className='pt-2 pl-2'>Yuuga <span className='pl-8 text-right'>$12</span></h2>
            <h3 className='pb-2 pl-2'>Organic Collection</h3>
            <button className=' bg-black text-white py-2 px-3 ml-0.5 mb-2 hover:bg-green-500 hover:text-white'>ADD TO CART</button>
            <button className=' bg-black text-white py-2 ml-0.5 px-6 hover:bg-green-500 hover:text-white'>BUY NOW</button>
          </div>
          <div className='rounded-b-lg mb-9 mt-4 px-2  relative border-b-1 shadow-xl shadow-amber-900'>
            <img src={image19} alt="" className='rounded-t-2xl h-72 w-full' />
            <FaRegHeart className='absolute bottom-16 h-[30px] w-full left-24 hover:text-red-500'/>
            <h2 className='pt-2 pl-2'>Yuuga <span className='pl-8 text-right'>$12</span></h2>
            <h3 className='pb-2 pl-2'>Organic Collection</h3>
            <button className=' bg-black text-white py-2 px-3 ml-0.5 mb-2 hover:bg-green-500 hover:text-white'>ADD TO CART</button>
            <button className=' bg-black text-white py-2 ml-0.5 px-6 hover:bg-green-500 hover:text-white'>BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Newarrival
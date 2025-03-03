// "use client";

// import { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../content/ShopContext";
// import { assets } from "../assets copy/assets";

// // const products = [
// //   {
// //     id: 1,
// //     name: "Throwback Hip Bag",
// //     href: "#",
// //     color: "Salmon",
// //     price: "$90.00",
// //     quantity: 1,
// //     imageSrc:
// //       "https://cdn.ddecor.com/media/wysiwyg/collection/desktop_1920-pix-x-920-pix_sahara-weaves.jpg",
// //     imageAlt:
// //       "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
// //   },
// //   {
// //     id: 2,
// //     name: "Medium Stuff Satchel",
// //     href: "#",
// //     color: "Blue",
// //     price: "$32.00",
// //     quantity: 1,
// //     imageSrc:
// //       "https://cdn.ddecor.com/media/wysiwyg/collection/desktop_1920-pix-x-920-pix_sahara-weaves.jpg",
// //     imageAlt:
// //       "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
// //   },
// //   // More products...
// // ];

// export default function Cart() {
  
//   const { products, currency, cartItems, updateQuantity, navigate, getCartAmount} = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(()=>{
//     if(products.length>0){
//       const tempData = [];
//       for(const items in cartItems){
//         // console.log(cartItems,"iy")
//         for(const item in cartItems [items]){
//           if (cartItems [items][item] > 0) {
//             tempData.push({
//               _id: items,
//               size:item,
//               quantity:cartItems[items][item]
//             })
//           }
//         }
//       }
//       setCartData(tempData)
//       // console.log(tempData)
//     }
//   },[cartItems,products])
//   // console.log(cartData)



//   return (
//     <div className="pt-24 px-4 sm:px-10 lg:px-40 w-full justify-center">
//       <div className="flex items-start justify-between">
//         <h1 className="text-lg font-medium text-gray-900">Shopping Cart</h1>
//         <div className="ml-3 flex h-7 items-center">
//           {/* Close button for later use */}
//         </div>
//       </div>
//       <div className="mt-8">
//         <div className="flow-root">
//           <ul role="list" className="divide-y divide-gray-200">
//             {/* {
//               cartData.map((item, index)=>{
//                 const productData = products.find(product => product.id === productId);
//                 return (
//                   <div key={index} className='py-4 border-t border-btext-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
//                     <div className=' flex items-start gap-6'>
//                       <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
//                       <div>
//                         <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
//                         <div className='flex items-center gap-5 mt-2'>
//                           <p>{currency}{productData.price}</p>
//                           <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <input onChange={(e)=> e.target.value === '' || e.target.value === '0'? null : updateQuantity(item._id,item.size,Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type='number' min={1}  defaultValue={item.quantity}/>
//                     <img onClick={()=>updateQuantity(item._id, item.size,0)} src={assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer' />
//                   </div>
//                 )
//               })
//             } */}
//           </ul>
//         </div>
//       </div>
//       <div className="border-t border-gray-200 px-4 mt-6 py-6 sm:px-6">
//         <div className="flex justify-between text-sm sm:text-base font-medium text-gray-900">
//           <p>Subtotal</p>
//           <p>{currency} {getCartAmount()}.00</p>
//         </div>
//         <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
//           Shipping and taxes calculated at checkout.
//         </p>
//         <div className="mt-6">
//           <a onClick={()=>navigate("/place-order")}
//             className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-sm sm:text-base font-medium text-white shadow-xs hover:bg-indigo-700"
//           >
//             Checkout
//           </a>
//         </div>
//         <div className="mt-6 flex justify-center text-center text-xs sm:text-sm text-gray-500">
//           <p>
//             or{" "}
//             <button
//               type="button"
//               onClick={() => navigate("/home-decor")}
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Continue Shopping
//               <span aria-hidden="true"> &rarr;</span>
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../content/ShopContext";
import { assets } from "../assets copy/assets";

export default function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        console.log(items)
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
      // console.log(tempData);
    }
    
  }, [cartItems, products]);
  console.log(cartItems)

  return (
    <div className="pt-24 px-4 sm:px-10 lg:px-40 w-full justify-center">
      <div className="flex items-start justify-between">
        <h1 className="text-lg font-medium text-gray-900">Shopping Cart</h1>
      </div>

      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {cartData.map((item, index) => {
              // ✅ Find the product in the `products` list
              const productData = products.find(product => product.id === item._id);

              if (!productData) return null; // If product not found, skip rendering

              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img className="w-16 sm:w-20" src={productData.img_link} alt={productData.name} />
                    <div>
                      <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {currency}
                          {productData.price.toLocaleString()}
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                      </div>
                    </div>
                  </div>

                  {/* ✅ Quantity Input */}
                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />

                  {/* ✅ Remove Item */}
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    src={assets.bin_icon}
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                    alt="Delete"
                  />
                </div>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ✅ Subtotal & Checkout */}
      <div className="border-t border-gray-200 px-4 mt-6 py-6 sm:px-6">
        <div className="flex justify-between text-sm sm:text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>

        <p className="mt-0.5 text-xs sm:text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/place-order")}
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-sm sm:text-base font-medium text-white shadow-xs hover:bg-indigo-700"
          >
            Checkout
          </button>
        </div>

        <div className="mt-6 flex justify-center text-center text-xs sm:text-sm text-gray-500">
          <p>
            or{" "}
            <button
              type="button"
              onClick={() => navigate("/home-decor")}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}


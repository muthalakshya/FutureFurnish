"use client";

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../content/ShopContext";
import { assets } from "../assets copy/assets";
import ShowModelonorders from "../conultant/ShowModelonorders";
import Showtableorders from "../conultant/Showtableorders";

export default function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate, getCartAmount, productData, setProductData, backendUrl,token } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (productData.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        console.log(productData," jj")
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
              products:item["products"]
            });
          }
        }
      }
      setCartData(tempData);
      console.log(tempData);
    }
    console.log(productData)
  }, [cartItems, productData]);
  // console.log(cartItems)

  return (
    <div className="pt-24 px-4 sm:px-10 lg:px-40 w-full justify-center">
      <div className="flex items-start justify-between">
        <h1 className="text-lg font-medium text-gray-900">Shopping Cart</h1>
      </div>

      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {cartData.map((item, index) => {
              // ✅ Find the product in the `productData` list
              const pds = productData.find(product => product.productId === item._id);
              console.log(pds)
              if (!pds) return null; // If product not found, skip rendering

              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    {/* <img className="w-16 sm:w-20" src={pds.image} alt={pds.name} /> */}
                    {pds.imageUrl ? (
                    <img src={pds.image} className="w-28 sm:w-24 h-28 mr-13 mb-2" /> 
                      ) : pds.type === "table" ? ( // ✅ Use `===` for strict comparison
                      <ShowModelonorders d3sides={pds.sides}/>
                    ) : (
                      <Showtableorders d3sides={pds.sides} />
                    )}
                    <div>
                      <p className="text-xs sm:text-lg font-medium">{pds.title}</p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {currency}
                          {pds.price.toLocaleString()}
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


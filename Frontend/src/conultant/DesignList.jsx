import React, { useState } from 'react';
import PageDesign from './PageDesign';

const DesignList = () => {
  const [productData, setProductData] = useState({
    title: '',
    price: '0.00',
    compareAtPrice: '0.00',
    costPerItem: '0.00',
    profit: '—',
    margin: '—',
    chargeTax: true,
    trackQuantity: true,
    continueWhenOutOfStock: false,
    hasSKU: false,
    isPhysical: true,
    weight: '0.0',
    quantity: '0'
  });

  return (
    <PageDesign />
    // <div className="flex w-full max-w-6xl mx-auto bg-gray-100 p-4 pt-24">
    //   <div className="w-3/5 pr-4">
    //     {/* Left Column */}
    //     <div className="bg-white rounded shadow p-4 mb-4">
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium mb-1">Title</label>
    //         <input
    //           type="text"
    //           className="w-full border rounded p-2"
    //           placeholder="Short sleeve t-shirt"
    //           value={productData.title}
    //           onChange={(e) => setProductData({...productData, title: e.target.value})}
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block text-sm font-medium mb-1">Description</label>
    //         <div className="border rounded p-2">
    //           <div className="flex border-b pb-2 mb-2">
    //             <button className="px-2 py-1 border-r flex items-center">
    //               <span className="text-sm">Paragraph</span>
    //               <span className="ml-1">▼</span>
    //             </button>
    //             <div className="flex px-2">
    //               <button className="px-2 font-bold">B</button>
    //               <button className="px-2 italic">I</button>
    //               <button className="px-2 underline">U</button>
    //               <button className="px-2">A</button>
    //               <span className="mx-2">|</span>
    //               <button className="px-2">≡</button>
    //               <button className="px-2">•</button>
    //               <button className="px-2">@</button>
    //               <button className="px-2">...</button>
    //             </div>
    //             <div className="ml-auto">
    //               <button className="px-2">&lt;/&gt;</button>
    //             </div>
    //           </div>
    //           <div className="h-24"></div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="bg-white rounded shadow p-4 mb-4">
    //       <h3 className="font-medium mb-4">Media</h3>
    //       <div className="border-2 border-dashed rounded p-8 text-center">
    //         <div className="flex justify-center mb-2">
    //           <button className="bg-white text-blue-600 font-medium px-3 py-1 text-sm mr-4">Upload new</button>
    //           <button className="text-gray-600 px-3 py-1 text-sm">Select existing</button>
    //         </div>
    //         <p className="text-gray-500 text-sm">Accepts images, videos, or 3D models</p>
    //       </div>
    //     </div>

    //     <div className="bg-white rounded shadow p-4 mb-4">
    //       <h3 className="font-medium mb-2">Category</h3>
    //       <div className="relative">
    //         <input
    //           type="text"
    //           className="w-full border rounded p-2 pr-8"
    //         />
    //         <div className="absolute right-2 top-2">▼</div>
    //       </div>
    //       <p className="text-xs text-gray-500 mt-1">Determines tax rates and adds metatags to improve search, filters, and cross-channel sales</p>
    //     </div>

    //     <div className="bg-white rounded shadow p-4 mb-4">
    //       <h3 className="font-medium mb-2">Pricing</h3>
    //       <div className="flex mb-4">
    //         <div className="w-1/2 pr-2">
    //           <label className="block text-sm mb-1">Price</label>
    //           <div className="relative">
    //             <span className="absolute left-2 top-2 text-gray-500">₹</span>
    //             <input
    //               type="text"
    //               className="w-full border rounded p-2 pl-6"
    //               value={productData.price}
    //               onChange={(e) => setProductData({...productData, price: e.target.value})}
    //             />
    //           </div>
    //         </div>
    //         <div className="w-1/2 pl-2">
    //           <label className="block text-sm mb-1">Compare-at price</label>
    //           <div className="relative">
    //             <span className="absolute left-2 top-2 text-gray-500">₹</span>
    //             <input
    //               type="text"
    //               className="w-full border rounded p-2 pl-6"
    //               value={productData.compareAtPrice}
    //               onChange={(e) => setProductData({...productData, compareAtPrice: e.target.value})}
    //             />
    //             <span className="absolute right-2 top-2 text-gray-400 text-sm">ⓘ</span>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="mb-4">
    //         <label className="flex items-center">
    //           <input
    //             type="checkbox"
    //             checked={productData.chargeTax}
    //             onChange={(e) => setProductData({...productData, chargeMax: e.target.checked})}
    //             className="mr-2"
    //           />
    //           <span className="text-sm">Charge tax on this product</span>
    //         </label>
    //       </div>
    //       <div className="flex">
    //         <div className="w-1/3 pr-2">
    //           <label className="block text-sm mb-1">Cost per item</label>
    //           <div className="relative">
    //             <span className="absolute left-2 top-2 text-gray-500">₹</span>
    //             <input
    //               type="text"
    //               className="w-full border rounded p-2 pl-6"
    //               value={productData.costPerItem}
    //               onChange={(e) => setProductData({...productData, costPerItem: e.target.value})}
    //             />
    //             <span className="absolute right-2 top-2 text-gray-400 text-sm">ⓘ</span>
    //           </div>
    //         </div>
    //         <div className="w-1/3 px-2">
    //           <label className="block text-sm mb-1">Profit</label>
    //           <input
    //             type="text"
    //             className="w-full border rounded p-2"
    //             value={productData.profit}
    //             readOnly
    //           />
    //         </div>
    //         <div className="w-1/3 pl-2">
    //           <label className="block text-sm mb-1">Margin</label>
    //           <input
    //             type="text"
    //             className="w-full border rounded p-2"
    //             value={productData.margin}
    //             readOnly
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     <div className="bg-white rounded shadow p-4 mb-4">
    //       <h3 className="font-medium mb-2">Inventory</h3>
    //       <div className="mb-4">
    //         <label className="flex items-center">
    //           <input
    //             type="checkbox"
    //             checked={productData.trackQuantity}
    //             onChange={(e) => setProductData({...productData, trackQuantity: e.target.checked})}
    //             className="mr-2"
    //           />
    //           <span className="text-sm">Track quantity</span>
    //         </label>
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-sm mb-1">Quantity</label>
    //         <input
    //           type="text"
    //           className="w-full border rounded p-2"
    //           value={productData.quantity}
    //           onChange={(e) => setProductData({...productData, quantity: e.target.value})}
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-sm mb-1">Shop location</label>
    //         <div className="flex">
    //           <input
    //             type="text"
    //             className="w-full border rounded p-2"
    //             placeholder="0"
    //           />
    //         </div>
    //       </div>
    //       <div className="mb-4">
    //         <label className="flex items-center">
    //           <input
    //             type="checkbox"
    //             checked={productData.continueWhenOutOfStock}
    //             onChange={(e) => setProductData({...productData, continueWhenOutOfStock: e.target.checked})}
    //             className="mr-2"
    //           />
    //           <span className="text-sm">Continue selling when out of stock</span>
    //         </label>
    //         <p className="text-xs text-gray-500 ml-6">This won't affect Shopify POS. Staff will see a warning, but can complete sales when available inventory reaches zero and below.</p>
    //       </div>
    //       <div className="mb-2">
    //         <label className="flex items-center">
    //           <input
    //             type="checkbox"
    //             checked={productData.hasSKU}
    //             onChange={(e) => setProductData({...productData, hasSKU: e.target.checked})}
    //             className="mr-2"
    //           />
    //           <span className="text-sm">This product has a SKU or barcode</span>
    //         </label>
    //       </div>
    //     </div>

    //     <div className="bg-white rounded shadow p-4">
    //       <h3 className="font-medium mb-2">Shipping</h3>
    //       <div className="mb-4">
    //         <label className="flex items-center">
    //           <input
    //             type="checkbox"
    //             checked={productData.isPhysical}
    //             onChange={(e) => setProductData({...productData, isPhysical: e.target.checked})}
    //             className="mr-2"
    //           />
    //           <span className="text-sm">This is a physical product</span>
    //         </label>
    //       </div>
    //       <div>
    //         <label className="block text-sm mb-1">Weight</label>
    //         <div className="flex">
    //           <input
    //             type="text"
    //             className="w-24 border rounded-l p-2"
    //             value={productData.weight}
    //             onChange={(e) => setProductData({...productData, weight: e.target.value})}
    //           />
    //           <div className="border-t border-b border-r rounded-r px-2 py-2 flex items-center">
    //             <span className="text-sm">kg</span>
    //             <span className="ml-1">▼</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="w-2/5 pl-4">
    //     {/* Right Column */}
    //     <div className="bg-white rounded shadow p-4 mb-4">
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium mb-1">Status</label>
    //         <div className="relative">
    //           <select className="w-full border rounded p-2 appearance-none">
    //             <option>Active</option>
    //             <option>Draft</option>
    //             <option>Archived</option>
    //           </select>
    //           <div className="absolute right-2 top-2 pointer-events-none">▼</div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="bg-white rounded shadow p-4 mb-4">
    //       <div className="flex justify-between items-center mb-4">
    //         <h3 className="font-medium">Publishing</h3>
    //         <button className="text-gray-500">...</button>
    //       </div>
    //       <div className="mb-4">
    //         <h4 className="text-sm font-medium mb-2">Sales channels</h4>
    //         <div className="ml-4 mb-1">
    //           <label className="flex items-center">
    //             <span className="mr-2">○</span>
    //             <span className="text-sm">Online Store</span>
    //           </label>
    //         </div>
    //         <div className="ml-4 mb-1">
    //           <label className="flex items-center">
    //             <span className="mr-2">○</span>
    //             <span className="text-sm">Point of Sale</span>
    //           </label>
    //         </div>
    //         <div className="ml-4 mb-1 bg-blue-50 p-2 rounded">
    //           <p className="text-sm text-gray-600">Point of Sale has not been set up. Finish the remaining steps to start selling in person.</p>
    //           <a href="#" className="text-blue-600 text-sm">Learn more</a>
    //         </div>
    //       </div>
    //       <div>
    //         <h4 className="text-sm font-medium mb-2">Markets</h4>
    //         <div className="ml-4 mb-1">
    //           <label className="flex items-center">
    //             <span className="mr-2">○</span>
    //             <span className="text-sm">India and International</span>
    //           </label>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="bg-white rounded shadow p-4 mb-4">
    //       <div className="flex items-center mb-4">
    //         <h3 className="font-medium">Product organization</h3>
    //         <span className="ml-1 text-gray-400 text-sm">ⓘ</span>
    //       </div>
          
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium mb-1">Type</label>
    //         <input type="text" className="w-full border rounded p-2" />
    //       </div>
          
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium mb-1">Vendor</label>
    //         <input type="text" className="w-full border rounded p-2" />
    //       </div>
          
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium mb-1">Collections</label>
    //         <input type="text" className="w-full border rounded p-2" />
    //       </div>
          
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium mb-1">Tags</label>
    //         <input type="text" className="w-full border rounded p-2" />
    //       </div>
    //     </div>

    //     <div className="bg-white rounded shadow p-4">
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium mb-1">Theme template</label>
    //         <div className="relative">
    //           <select className="w-full border rounded p-2 appearance-none">
    //             <option>Default product</option>
    //           </select>
    //           <div className="absolute right-2 top-2 pointer-events-none">▼</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DesignList;
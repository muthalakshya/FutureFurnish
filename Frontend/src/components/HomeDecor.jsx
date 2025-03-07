// import { useContext, useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogPanel,
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
// } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import {
//   ChevronDownIcon,
//   FunnelIcon,
//   MinusIcon,
//   PlusIcon,
//   Squares2X2Icon,
// } from "@heroicons/react/20/solid";
// import Cards from "./Cards";
// import {products} from "../assets/data"
// import axios from "axios";
// import { ShopContext } from "../content/ShopContext";
// import ProductCards from "./ProductCards";

// const sortOptions = [
//   { name: "Most Popular", href: "#", current: true },
//   { name: "Best Rating", href: "#", current: false },
//   { name: "Newest", href: "#", current: false },
//   { name: "Price: Low to High", href: "#", current: false },
//   { name: "Price: High to Low", href: "#", current: false },
// ];

// const filters = [
//   {
//     id: "color",
//     name: "Color",
//     options: ["White", "Beige", "Blue", "Brown", "Green", "Purple"],
//   },
//   {
//     id: "category",
//     name: "Category",
//     options: ["New Arrivals", "Sale", "Travel", "Organization", "Accessories"],
//   },
//   {
//     id: "size",
//     name: "Size",
//     options: ["2L", "6L", "12L", "18L", "20L", "40L"],
//   },
// ];

// export default function HomeDecor() {
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   // console.log(products[0]._id)
//   const { backendUrl, token, currency, setTotalOrders,productData, setProductData, setOrderTotalValues,userContextData } = useContext(ShopContext)
  
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [email, setEmail] = useState('')

//   const loadProductData = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       if (!token) {
//         setLoading(false)
//         return
//       }
//       const response = await axios.get(`${backendUrl}/api/product3model/getAllProducts`)
//       // console.log(response.data)
//       if (response.data.success) {
//         // Process the data correctly based on API response structure
//         let allProducts = []
//         // console.log(response.data)
        
//         response.data.data.forEach((prod) => {
//           // If the product has individual items, flatten them into the list
//           if (Array.isArray(prod.items) && prod.items.length > 0) {
//             prod.items.forEach((item) => {
//               allProducts.push({
//                 ...item,
//                 productId: prod._id || prod.id,
//                 title: prod.title,
//                 description: prod.description,
//                 price: prod.price,
//                 profit: prod.profit,
//                 quantity: prod.quantity || 1,
//                 status: prod.status || 'Available',
//                 type: prod.type,
//                 vendor: prod.vendor,
//                 weight: prod.weight,
//                 imageUrl: prod.imageUrl || (item.image && item.image[0]),
//                 height: prod.dimensions?.height || null,
//                 breadth: prod.dimensions?.breadth || null,
//                 length: prod.dimensions?.length || null,
//                 sides:prod.sides
//               })
//             })
//           } else {
//             // If the product doesn't have items, add the product itself
//             allProducts.push({
//               productId: prod._id || prod.id,
//               title: prod.title,
//               description: prod.description,
//               price: prod.price,
//               profit: prod.profit,
//               quantity: prod.quantity || 1,
//               status: prod.status || 'Available',
//               type: prod.type,
//               vendor: prod.vendor,
//               weight: prod.weight,
//               imageUrl: prod.imageUrl,
//               image: prod.image || [prod.imageUrl],
//               height: prod.dimensions?.height || null,
//               breadth: prod.dimensions?.breadth || null,
//               length: prod.dimensions?.length || null,
//               sides:prod.sides
//             })
//           }
//         })

//         setProductData(allProducts)
        
//         // Update order totals if needed
//         if (typeof setTotalOrders === 'function') {
//           setTotalOrders(allProducts.length)
//           localStorage.setItem("totalOrders", allProducts.length)
//         }
//         // Calculate and set total value if needed
//         if (typeof setOrderTotalValues === 'function') {
//           const totalValue = allProducts.reduce((sum, item) => 
//             sum + (parseFloat(item.price) * (item.quantity || 1)), 0)
//           setOrderTotalValues(totalValue)
//           localStorage.setItem("totalValue", totalValue)
//         }
//       } else {
//         setError('Failed to load products: ' + (response.data.message || 'Unknown error'))
//       }
//     } catch (error) {
//       console.error('Error loading products:', error)
//       setError(error.message || 'Failed to load products')
//       toast.error(error.message || 'Failed to load products')
//     }
//   }

//   useEffect(() => {
//     loadProductData()
//   }, [token])

//   return (
//     <div className="bg-[#f1f9eb] pt-16" >
//       {/* Mobile Filter Dialog */}
//       <Dialog
//         open={mobileFiltersOpen}
//         onClose={setMobileFiltersOpen}
//         className="relative z-40 lg:hidden"
//       >
//         <div className="fixed inset-0 bg-black/30" />
//         <div className="fixed inset-0 flex">
//           <DialogPanel className="relative ml-auto w-80 max-w-xs flex flex-col bg-white p-4 shadow-xl">
//             <div className="flex justify-between items-center border-b pb-3">
//               <h2 className="text-lg font-semibold">Filters</h2>
//               <button
//                 onClick={() => setMobileFiltersOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <XMarkIcon className="w-6 h-6" />
//               </button>
//             </div>
//             <div className="mt-4 space-y-4">
//               {filters.map((section) => (
//                 <Disclosure key={section.id} as="div">
//                   <DisclosureButton className="flex w-full justify-between text-gray-900 font-medium py-2">
//                     {section.name}
//                     <PlusIcon className="w-5 h-5" />
//                   </DisclosureButton>
//                   <DisclosurePanel className="pl-4 text-gray-600">
//                     {section.options.map((option, index) => (
//                       <label
//                         key={index}
//                         className="flex items-center space-x-2 py-1"
//                       >
//                         <input
//                           type="checkbox"
//                           className="rounded border-gray-300 focus:ring-indigo-500"
//                         />
//                         <span>{option}</span>
//                       </label>
//                     ))}
//                   </DisclosurePanel>
//                 </Disclosure>
//               ))}
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>

//       {/* Main Section */}
//       <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="flex items-center justify-between border-b border-gray-200 py-6">
//           <h1 className="text-3xl font-bold text-gray-900">New Arrivals</h1>
//           <div className="flex space-x-4">
//             {/* Sort Menu */}
//             <Menu as="div" className="relative">
//               <MenuButton className="flex items-center space-x-1 text-sm font-medium text-gray-700">
//                 Sort <ChevronDownIcon className="w-5 h-5 text-gray-500" />
//               </MenuButton>
//               <MenuItems className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded-md">
//                 {sortOptions.map((option) => (
//                   <MenuItem key={option.name}>
//                     {({ active }) => (
//                       <a
//                         href={option.href}
//                         className={`block px-4 py-2 text-sm ${
//                           active ? "bg-gray-100" : ""
//                         }`}
//                       >
//                         {option.name}
//                       </a>
//                     )}
//                   </MenuItem>
//                 ))}
//               </MenuItems>
//             </Menu>

//             {/* Grid & Filter Buttons */}
//             <button className="text-gray-500 hover:text-gray-700">
//               <Squares2X2Icon className="w-6 h-6" />
//             </button>
//             <button
//               onClick={() => setMobileFiltersOpen(true)}
//               className="lg:hidden text-gray-500 hover:text-gray-700"
//             >
//               <FunnelIcon className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Product Section */}
//         <section className="pt-6 pb-24">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             {/* Filters - Visible only on Large Screens */}
//             <aside className="hidden lg:block space-y-6">
//               {filters.map((section) => (
//                 <Disclosure key={section.id} as="div">
//                   <DisclosureButton className="w-full flex justify-between text-gray-900 font-medium py-2">
//                     {section.name}
//                     <MinusIcon className="w-5 h-5" />
//                   </DisclosureButton>
//                   <DisclosurePanel className="pl-4 text-gray-600">
//                     {section.options.map((option, index) => (
//                       <label
//                         key={index}
//                         className="flex items-center space-x-2 py-1"
//                       >
//                         <input
//                           type="checkbox"
//                           className="rounded border-gray-300 focus:ring-indigo-500"
//                         />
//                         <span>{option}</span>
//                       </label>
//                     ))}
//                   </DisclosurePanel>
//                 </Disclosure>
//               ))}
//             </aside>


//             <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-8">

// {/* dimensions{height: 22, breadth: 22, length: 12}  */}

//               {productData.map((img, index) => (
//                 // console.log(img)
//                 <ProductCards x3sides={img.sides} type={img.type} compareAtPrice={img.compareAtPrice} weight={img.weight} id={img.productId} imgProd={img.imageUrl} productId={img.productId} name={img.name} price={img.price} description={img.description} sizes={img.dimensions} />
//               ))}
//               {/* {products.map((img, index) => (
//                 // console.log(img.img_link)
//                 <Cards index={img.id} imgProd={img.img_link} productId={img.id} name={img.title} price={img.price} description={img.description} sizes={img.sizes} />
//               ))} */}
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }



// ----------------------------------------------------------

// import { useContext, useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogPanel,
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
// } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import {
//   ChevronDownIcon,
//   FunnelIcon,
//   MinusIcon,
//   PlusIcon,
//   Squares2X2Icon,
// } from "@heroicons/react/20/solid";
// import Cards from "./Cards";
// import { products } from "../assets/data";
// import axios from "axios";
// import { ShopContext } from "../content/ShopContext";
// import ProductCards from "./ProductCards";

// const sortOptions = [
//   { name: "Most Popular", value: "popular", current: true },
//   { name: "Best Rating", value: "rating", current: false },
//   { name: "Newest", value: "newest", current: false },
//   { name: "Price: Low to High", value: "price-asc", current: false },
//   { name: "Price: High to Low", value: "price-desc", current: false },
// ];

// // Updated filters to include proper category values and price ranges
// const filters = [
//   {
//     id: "category",
//     name: "Category",
//     options: [
//       { value: "jute", label: "Jute Bag" },
//       { value: "table", label: "Table" },
//       // { value: "accessories", label: "Accessories" },
//       // { value: "decoration", label: "Decoration" },
//       // { value: "furniture", label: "Furniture" },
//     ],
//   },
//   {
//     id: "price",
//     name: "Price Range",
//     options: [
//       { value: "0-50", label: "Under ₹50" },
//       { value: "50-100", label: "50-100" },
//       { value: "100-200", label: "100-200" },
//       { value: "200-plus", label: "200+" },
//     ],
//   },
//   // {
//   //   id: "color",
//   //   name: "Color",
//   //   options: [
//   //     { value: "white", label: "White" },
//   //     { value: "beige", label: "Beige" },
//   //     { value: "blue", label: "Blue" },
//   //     { value: "brown", label: "Brown" },
//   //     { value: "green", label: "Green" },
//   //     { value: "purple", label: "Purple" },
//   //   ],
//   // },
//   // {
//   //   id: "size",
//   //   name: "Size",
//   //   options: [
//   //     { value: "2L", label: "2L" },
//   //     { value: "6L", label: "6L" },
//   //     { value: "12L", label: "12L" },
//   //     { value: "18L", label: "18L" },
//   //     { value: "20L", label: "20L" },
//   //     { value: "40L", label: "40L" },
//   //   ],
//   // },
// ];

// export default function HomeDecor() {
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const { backendUrl, token, currency, setTotalOrders, productData, setProductData, setOrderTotalValues, userContextData } = useContext(ShopContext);
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [email, setEmail] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [activeFilters, setActiveFilters] = useState({
//     category: [],
//     price: [],
//     color: [],
//     size: [],
//   });
//   const [activeSortOption, setActiveSortOption] = useState("popular");

//   const loadProductData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (!token) {
//         setLoading(false);
//         return;
//       }
//       const response = await axios.get(`${backendUrl}/api/product3model/getAllProducts`);
//       if (response.data.success) {
//         let allProducts = [];
        
//         response.data.data.forEach((prod) => {
//           if (Array.isArray(prod.items) && prod.items.length > 0) {
//             prod.items.forEach((item) => {
//               allProducts.push({
//                 ...item,
//                 productId: prod._id || prod.id,
//                 title: prod.title,
//                 description: prod.description,
//                 price: prod.price,
//                 profit: prod.profit,
//                 quantity: prod.quantity || 1,
//                 status: prod.status || 'Available',
//                 type: prod.type,
//                 vendor: prod.vendor,
//                 weight: prod.weight,
//                 imageUrl: prod.imageUrl || (item.image && item.image[0]),
//                 height: prod.dimensions?.height || null,
//                 breadth: prod.dimensions?.breadth || null,
//                 length: prod.dimensions?.length || null,
//                 sides: prod.sides
//               });
//             });
//           } else {
//             allProducts.push({
//               productId: prod._id || prod.id,
//               title: prod.title,
//               description: prod.description,
//               price: prod.price,
//               profit: prod.profit,
//               quantity: prod.quantity || 1,
//               status: prod.status || 'Available',
//               type: prod.type,
//               vendor: prod.vendor,
//               weight: prod.weight,
//               imageUrl: prod.imageUrl,
//               image: prod.image || [prod.imageUrl],
//               height: prod.dimensions?.height || null,
//               breadth: prod.dimensions?.breadth || null,
//               length: prod.dimensions?.length || null,
//               sides: prod.sides
//             });
//           }
//         });

//         setProductData(allProducts);
//         setFilteredProducts(allProducts);
        
//         if (typeof setTotalOrders === 'function') {
//           setTotalOrders(allProducts.length);
//           localStorage.setItem("totalOrders", allProducts.length);
//         }
//         if (typeof setOrderTotalValues === 'function') {
//           const totalValue = allProducts.reduce((sum, item) => 
//             sum + (parseFloat(item.price) * (item.quantity || 1)), 0);
//           setOrderTotalValues(totalValue);
//           localStorage.setItem("totalValue", totalValue);
//         }
//       } else {
//         setError('Failed to load products: ' + (response.data.message || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error('Error loading products:', error);
//       setError(error.message || 'Failed to load products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Apply filters to products
//   const applyFilters = () => {
//     if (!productData) return;

//     let result = [...productData];

//     // Filter by category
//     if (activeFilters.category.length > 0) {
//       result = result.filter(product => 
//         activeFilters.category.some(category => 
//           product.type && product.type.toLowerCase().includes(category.toLowerCase())
//         )
//       );
//     }

//     // Filter by price range
//     if (activeFilters.price.length > 0) {
//       result = result.filter(product => {
//         const price = parseFloat(product.price);
//         return activeFilters.price.some(range => {
//           if (range === "0-50") return price < 50;
//           if (range === "50-100") return price >= 50 && price < 100;
//           if (range === "100-200") return price >= 100 && price < 200;
//           if (range === "200-plus") return price >= 200;
//           return false;
//         });
//       });
//     }

//     // Apply sorting
//     if (activeSortOption) {
//       result = sortProducts(result, activeSortOption);
//     }

//     setFilteredProducts(result);
//   };

//   // Sort products based on selected option
//   const sortProducts = (products, sortOption) => {
//     const sortedProducts = [...products];
    
//     switch(sortOption) {
//       case "price-asc":
//         return sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//       case "price-desc":
//         return sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//       // For other sort options, you would need appropriate data from your API
//       // For now, we'll just return the original array
//       default:
//         return sortedProducts;
//     }
//   };

//   // Handle filter change
//   const handleFilterChange = (filterId, value, isChecked) => {
//     setActiveFilters(prev => {
//       const updatedFilters = { ...prev };
      
//       if (isChecked) {
//         // Add the filter if it's checked
//         if (!updatedFilters[filterId].includes(value)) {
//           updatedFilters[filterId] = [...updatedFilters[filterId], value];
//         }
//       } else {
//         // Remove the filter if it's unchecked
//         updatedFilters[filterId] = updatedFilters[filterId].filter(val => val !== value);
//       }
      
//       return updatedFilters;
//     });
//   };

//   // Handle sort option change
//   const handleSortChange = (option) => {
//     setActiveSortOption(option.value);
    
//     // Update current status in sort options
//     sortOptions.forEach(opt => {
//       opt.current = (opt.value === option.value);
//     });
//   };

//   // Apply filters whenever activeFilters or activeSortOption changes
//   useEffect(() => {
//     applyFilters();
//   }, [activeFilters, activeSortOption, productData]);

//   useEffect(() => {
//     loadProductData();
//   }, [token]);

//   return (
//     <div className="bg-[#f1f9eb] pt-16">
//       {/* Mobile Filter Dialog */}
//       <Dialog
//         open={mobileFiltersOpen}
//         onClose={setMobileFiltersOpen}
//         className="relative z-40 lg:hidden"
//       >
//         <div className="fixed inset-0 bg-black/30" />
//         <div className="fixed inset-0 flex">
//           <DialogPanel className="relative ml-auto w-80 max-w-xs flex flex-col bg-white p-4 shadow-xl">
//             <div className="flex justify-between items-center border-b pb-3">
//               <h2 className="text-lg font-semibold">Filters</h2>
//               <button
//                 onClick={() => setMobileFiltersOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <XMarkIcon className="w-6 h-6" />
//               </button>
//             </div>
//             <div className="mt-4 space-y-4">
//               {filters.map((section) => (
//                 <Disclosure key={section.id} as="div" defaultOpen>
//                   <DisclosureButton className="flex w-full justify-between text-gray-900 font-medium py-2">
//                     {section.name}
//                     <PlusIcon className="w-5 h-5" />
//                   </DisclosureButton>
//                   <DisclosurePanel className="pl-4 text-gray-600">
//                     {section.options.map((option) => (
//                       <label
//                         key={option.value}
//                         className="flex items-center space-x-2 py-1"
//                       >
//                         <input
//                           type="checkbox"
//                           className="rounded border-gray-300 focus:ring-indigo-500"
//                           checked={activeFilters[section.id].includes(option.value)}
//                           onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
//                         />
//                         <span>{option.label}</span>
//                       </label>
//                     ))}
//                   </DisclosurePanel>
//                 </Disclosure>
//               ))}
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>

//       {/* Main Section */}
//       <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="flex items-center justify-between border-b border-gray-200 py-6">
//           <h1 className="text-3xl font-bold text-gray-900">New Arrivals</h1>
//           <div className="flex space-x-4">
//             {/* Sort Menu */}
//             {/* <Menu as="div" className="relative">
//               <MenuButton className="flex items-center space-x-1 text-sm font-medium text-gray-700">
//                 Sort <ChevronDownIcon className="w-5 h-5 text-gray-500" />
//               </MenuButton>
//               <MenuItems className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded-md">
//                 {sortOptions.map((option) => (
//                   <MenuItem key={option.name}>
//                     {({ active }) => (
//                       <button
//                         onClick={() => handleSortChange(option)}
//                         className={`block w-full text-left px-4 py-2 text-sm ${
//                           active ? "bg-gray-100" : ""
//                         } ${option.current ? "font-medium text-indigo-600" : "text-gray-700"}`}
//                       >
//                         {option.name}
//                       </button>
//                     )}
//                   </MenuItem>
//                 ))}
//               </MenuItems>
//             </Menu> */}

//             {/* Grid & Filter Buttons */}
//             {/* <button className="text-gray-500 hover:text-gray-700">
//               <Squares2X2Icon className="w-6 h-6" />
//             </button> */}
//             <button
//               onClick={() => setMobileFiltersOpen(true)}
//               className="lg:hidden text-gray-500 hover:text-gray-700"
//             >
//               <FunnelIcon className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Active Filters Display */}
//         {(activeFilters.category.length > 0 || activeFilters.price.length > 0) && (
//           <div className="flex flex-wrap gap-2 py-3">
//             {activeFilters.category.map(category => (
//               <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
//                 {category}
//                 <button 
//                   onClick={() => handleFilterChange('category', category, false)}
//                   className="ml-2 text-indigo-500 hover:text-indigo-700"
//                 >
//                   <XMarkIcon className="w-4 h-4" />
//                 </button>
//               </span>
//             ))}
//             {activeFilters.price.map(priceRange => {
//               let label = "";
//               if (priceRange === "0-50") label = "Under $50";
//               if (priceRange === "50-100") label = "$50-$100";
//               if (priceRange === "100-200") label = "$100-$200";
//               if (priceRange === "200-plus") label = "$200+";
              
//               return (
//                 <span key={priceRange} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
//                   {label}
//                   <button 
//                     onClick={() => handleFilterChange('price', priceRange, false)}
//                     className="ml-2 text-indigo-500 hover:text-indigo-700"
//                   >
//                     <XMarkIcon className="w-4 h-4" />
//                   </button>
//                 </span>
//               );
//             })}
//           </div>
//         )}

//         {/* Product Section */}
//         <section className="pt-6 pb-24">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             {/* Filters - Visible only on Large Screens */}
//             <aside className="hidden lg:block space-y-6">
//               {filters.map((section) => (
//                 <Disclosure key={section.id} as="div" defaultOpen>
//                   <DisclosureButton className="w-full flex justify-between text-gray-900 font-medium py-2">
//                     {section.name}
//                     <MinusIcon className="w-5 h-5" />
//                   </DisclosureButton>
//                   <DisclosurePanel className="pl-4 text-gray-600">
//                     {section.options.map((option) => (
//                       <label
//                         key={option.value}
//                         className="flex items-center space-x-2 py-1"
//                       >
//                         <input
//                           type="checkbox"
//                           className="rounded border-gray-300 focus:ring-indigo-500"
//                           checked={activeFilters[section.id].includes(option.value)}
//                           onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
//                         />
//                         <span>{option.label}</span>
//                       </label>
//                     ))}
//                   </DisclosurePanel>
//                 </Disclosure>
//               ))}
//             </aside>

//             {/* Product Grid */}
//             <div className="lg:col-span-3">
//               {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                   <p className="text-gray-500">Loading products...</p>
//                 </div>
//               ) : error ? (
//                 <div className="bg-red-50 p-4 rounded">
//                   <p className="text-red-500">{error}</p>
//                 </div>
//               ) : filteredProducts.length === 0 ? (
//                 <div className="bg-gray-50 p-8 rounded text-center">
//                   <p className="text-gray-500">No products match your filters. Try adjusting your criteria.</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
//                   {filteredProducts.map((product) => (
//                     <ProductCards 
//                       key={product.productId}
//                       x3sides={product.sides} 
//                       type={product.type} 
//                       compareAtPrice={product.compareAtPrice} 
//                       weight={product.weight} 
//                       id={product.productId} 
//                       imgProd={product.imageUrl} 
//                       productId={product.productId} 
//                       name={product.name || product.title} 
//                       price={product.price} 
//                       description={product.description} 
//                       sizes={product.dimensions} 
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }


import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Cards from "./Cards";
import { products } from "../assets/data";
import axios from "axios";
import { ShopContext } from "../content/ShopContext";
import ProductCards from "./ProductCards";

const sortOptions = [
  { name: "Most Popular", value: "popular", current: true },
  { name: "Best Rating", value: "rating", current: false },
  { name: "Newest", value: "newest", current: false },
  { name: "Price: Low to High", value: "price-asc", current: false },
  { name: "Price: High to Low", value: "price-desc", current: false },
];

// Updated filters to include proper category values and price ranges
const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "jute", label: "Jute Bag" },
      { value: "table", label: "Table" },
      // { value: "accessories", label: "Accessories" },
      // { value: "decoration", label: "Decoration" },
      // { value: "furniture", label: "Furniture" },
    ],
  },
  {
    id: "price",
    name: "Price Range",
    options: [
      { value: "0-50", label: "Under ₹50" },
      { value: "50-100", label: "50-100" },
      { value: "100-200", label: "100-200" },
      { value: "200-plus", label: "200+" },
    ],
  },
  // Other filters remain commented out as in the original
];

export default function HomeDecor() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { backendUrl, token, currency, setTotalOrders, productData, setProductData, setOrderTotalValues, userContextData } = useContext(ShopContext);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    price: [],
    color: [],
    size: [],
  });
  const [activeSortOption, setActiveSortOption] = useState("popular");

  const loadProductData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Removed the token check to always fetch products
      const response = await axios.get(`${backendUrl}/api/product3model/getAllProducts`);
      if (response.data.success) {
        let allProducts = [];
        
        response.data.data.forEach((prod) => {
          if (Array.isArray(prod.items) && prod.items.length > 0) {
            prod.items.forEach((item) => {
              allProducts.push({
                ...item,
                productId: prod._id || prod.id,
                title: prod.title,
                description: prod.description,
                price: prod.price,
                profit: prod.profit,
                quantity: prod.quantity || 1,
                status: prod.status || 'Available',
                type: prod.type,
                vendor: prod.vendor,
                weight: prod.weight,
                imageUrl: prod.imageUrl || (item.image && item.image[0]),
                height: prod.dimensions?.height || null,
                breadth: prod.dimensions?.breadth || null,
                length: prod.dimensions?.length || null,
                sides: prod.sides
              });
            });
          } else {
            allProducts.push({
              productId: prod._id || prod.id,
              title: prod.title,
              description: prod.description,
              price: prod.price,
              profit: prod.profit,
              quantity: prod.quantity || 1,
              status: prod.status || 'Available',
              type: prod.type,
              vendor: prod.vendor,
              weight: prod.weight,
              imageUrl: prod.imageUrl,
              image: prod.image || [prod.imageUrl],
              height: prod.dimensions?.height || null,
              breadth: prod.dimensions?.breadth || null,
              length: prod.dimensions?.length || null,
              sides: prod.sides
            });
          }
        });

        setProductData(allProducts);
        setFilteredProducts(allProducts);
        
        // Only update these values if the respective functions are available
        if (typeof setTotalOrders === 'function') {
          setTotalOrders(allProducts.length);
          localStorage.setItem("totalOrders", allProducts.length);
        }
        if (typeof setOrderTotalValues === 'function') {
          const totalValue = allProducts.reduce((sum, item) => 
            sum + (parseFloat(item.price) * (item.quantity || 1)), 0);
          setOrderTotalValues(totalValue);
          localStorage.setItem("totalValue", totalValue);
        }
      } else {
        setError('Failed to load products: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setError(error.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to products
  const applyFilters = () => {
    if (!productData) return;

    let result = [...productData];

    // Filter by category
    if (activeFilters.category.length > 0) {
      result = result.filter(product => 
        activeFilters.category.some(category => 
          product.type && product.type.toLowerCase().includes(category.toLowerCase())
        )
      );
    }

    // Filter by price range
    if (activeFilters.price.length > 0) {
      result = result.filter(product => {
        const price = parseFloat(product.price);
        return activeFilters.price.some(range => {
          if (range === "0-50") return price < 50;
          if (range === "50-100") return price >= 50 && price < 100;
          if (range === "100-200") return price >= 100 && price < 200;
          if (range === "200-plus") return price >= 200;
          return false;
        });
      });
    }

    // Apply sorting
    if (activeSortOption) {
      result = sortProducts(result, activeSortOption);
    }

    setFilteredProducts(result);
  };

  // Sort products based on selected option
  const sortProducts = (products, sortOption) => {
    const sortedProducts = [...products];
    
    switch(sortOption) {
      case "price-asc":
        return sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price-desc":
        return sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      // For other sort options, you would need appropriate data from your API
      // For now, we'll just return the original array
      default:
        return sortedProducts;
    }
  };

  // Handle filter change
  const handleFilterChange = (filterId, value, isChecked) => {
    setActiveFilters(prev => {
      const updatedFilters = { ...prev };
      
      if (isChecked) {
        // Add the filter if it's checked
        if (!updatedFilters[filterId].includes(value)) {
          updatedFilters[filterId] = [...updatedFilters[filterId], value];
        }
      } else {
        // Remove the filter if it's unchecked
        updatedFilters[filterId] = updatedFilters[filterId].filter(val => val !== value);
      }
      
      return updatedFilters;
    });
  };

  // Handle sort option change
  const handleSortChange = (option) => {
    setActiveSortOption(option.value);
    
    // Update current status in sort options
    sortOptions.forEach(opt => {
      opt.current = (opt.value === option.value);
    });
  };

  // Apply filters whenever activeFilters or activeSortOption changes
  useEffect(() => {
    applyFilters();
  }, [activeFilters, activeSortOption, productData]);

  useEffect(() => {
    // Load products when component mounts, regardless of token
    loadProductData();
  }, []); // Removed token dependency to always load products

  return (
    <div className="bg-[#f1f9eb] pt-16">
      {/* Mobile Filter Dialog */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative ml-auto w-80 max-w-xs flex flex-col bg-white p-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {filters.map((section) => (
                <Disclosure key={section.id} as="div" defaultOpen>
                  <DisclosureButton className="flex w-full justify-between text-gray-900 font-medium py-2">
                    {section.name}
                    <PlusIcon className="w-5 h-5" />
                  </DisclosureButton>
                  <DisclosurePanel className="pl-4 text-gray-600">
                    {section.options.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-2 py-1"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 focus:ring-indigo-500"
                          checked={activeFilters[section.id].includes(option.value)}
                          onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Main Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-gray-200 py-6">
          <h1 className="text-3xl font-bold text-gray-900">New Arrivals</h1>
          <div className="flex space-x-4">
            {/* Sort Menu */}
            {/* <Menu as="div" className="relative">
              <MenuButton className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                Sort <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded-md">
                {sortOptions.map((option) => (
                  <MenuItem key={option.name}>
                    {({ active }) => (
                      <button
                        onClick={() => handleSortChange(option)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        } ${option.current ? "font-medium text-indigo-600" : "text-gray-700"}`}
                      >
                        {option.name}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu> */}

            {/* Grid & Filter Buttons */}
            {/* <button className="text-gray-500 hover:text-gray-700">
              <Squares2X2Icon className="w-6 h-6" />
            </button> */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FunnelIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(activeFilters.category.length > 0 || activeFilters.price.length > 0) && (
          <div className="flex flex-wrap gap-2 py-3">
            {activeFilters.category.map(category => (
              <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {category}
                <button 
                  onClick={() => handleFilterChange('category', category, false)}
                  className="ml-2 text-indigo-500 hover:text-indigo-700"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            ))}
            {activeFilters.price.map(priceRange => {
              let label = "";
              if (priceRange === "0-50") label = "Under ₹50";
              if (priceRange === "50-100") label = "₹50-₹100";
              if (priceRange === "100-200") label = "₹100-₹200";
              if (priceRange === "200-plus") label = "₹200+";
              
              return (
                <span key={priceRange} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {label}
                  <button 
                    onClick={() => handleFilterChange('price', priceRange, false)}
                    className="ml-2 text-indigo-500 hover:text-indigo-700"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Product Section */}
        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters - Visible only on Large Screens */}
            <aside className="hidden lg:block space-y-6">
              {filters.map((section) => (
                <Disclosure key={section.id} as="div" defaultOpen>
                  <DisclosureButton className="w-full flex justify-between text-gray-900 font-medium py-2">
                    {section.name}
                    <MinusIcon className="w-5 h-5" />
                  </DisclosureButton>
                  <DisclosurePanel className="pl-4 text-gray-600">
                    {section.options.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-2 py-1"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 focus:ring-indigo-500"
                          checked={activeFilters[section.id].includes(option.value)}
                          onChange={(e) => handleFilterChange(section.id, option.value, e.target.checked)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500">Loading products...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 p-4 rounded">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded text-center">
                  <p className="text-gray-500">No products match your filters. Try adjusting your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                  {filteredProducts.map((product) => (
                    <ProductCards 
                      key={product.productId}
                      x3sides={product.sides} 
                      type={product.type} 
                      compareAtPrice={product.compareAtPrice} 
                      weight={product.weight} 
                      id={product.productId} 
                      imgProd={product.imageUrl} 
                      productId={product.productId} 
                      name={product.name || product.title} 
                      price={product.price} 
                      description={product.description} 
                      sizes={product.dimensions} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
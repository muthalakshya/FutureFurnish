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
import {products} from "../assets/data"
import axios from "axios";
import { ShopContext } from "../content/ShopContext";
import ProductCards from "./ProductCards";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "color",
    name: "Color",
    options: ["White", "Beige", "Blue", "Brown", "Green", "Purple"],
  },
  {
    id: "category",
    name: "Category",
    options: ["New Arrivals", "Sale", "Travel", "Organization", "Accessories"],
  },
  {
    id: "size",
    name: "Size",
    options: ["2L", "6L", "12L", "18L", "20L", "40L"],
  },
];

export default function HomeDecor() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // console.log(products[0]._id)
  const { backendUrl, token, currency, setTotalOrders,productData, setProductData, setOrderTotalValues,userContextData } = useContext(ShopContext)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')

  const loadProductData = async () => {
    setLoading(true)
    setError(null)
    try {
      if (!token) {
        setLoading(false)
        return
      }
      const response = await axios.get(`${backendUrl}/api/product3model/getAllProducts`)
      // console.log(response.data)
      if (response.data.success) {
        // Process the data correctly based on API response structure
        let allProducts = []
        // console.log(response.data)
        
        response.data.data.forEach((prod) => {
          // If the product has individual items, flatten them into the list
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
                sides:prod.sides
              })
            })
          } else {
            // If the product doesn't have items, add the product itself
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
              sides:prod.sides
            })
          }
        })

        setProductData(allProducts)
        
        // Update order totals if needed
        if (typeof setTotalOrders === 'function') {
          setTotalOrders(allProducts.length)
          localStorage.setItem("totalOrders", allProducts.length)
        }
        // Calculate and set total value if needed
        if (typeof setOrderTotalValues === 'function') {
          const totalValue = allProducts.reduce((sum, item) => 
            sum + (parseFloat(item.price) * (item.quantity || 1)), 0)
          setOrderTotalValues(totalValue)
          localStorage.setItem("totalValue", totalValue)
        }
      } else {
        setError('Failed to load products: ' + (response.data.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error loading products:', error)
      setError(error.message || 'Failed to load products')
      toast.error(error.message || 'Failed to load products')
    }
  }

  useEffect(() => {
    loadProductData()
  }, [token])

  return (
    <div className="bg-[#f1f9eb] pt-16" >
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
                <Disclosure key={section.id} as="div">
                  <DisclosureButton className="flex w-full justify-between text-gray-900 font-medium py-2">
                    {section.name}
                    <PlusIcon className="w-5 h-5" />
                  </DisclosureButton>
                  <DisclosurePanel className="pl-4 text-gray-600">
                    {section.options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 py-1"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 focus:ring-indigo-500"
                        />
                        <span>{option}</span>
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
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                Sort <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded-md">
                {sortOptions.map((option) => (
                  <MenuItem key={option.name}>
                    {({ active }) => (
                      <a
                        href={option.href}
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        {option.name}
                      </a>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>

            {/* Grid & Filter Buttons */}
            <button className="text-gray-500 hover:text-gray-700">
              <Squares2X2Icon className="w-6 h-6" />
            </button>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FunnelIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Product Section */}
        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters - Visible only on Large Screens */}
            <aside className="hidden lg:block space-y-6">
              {filters.map((section) => (
                <Disclosure key={section.id} as="div">
                  <DisclosureButton className="w-full flex justify-between text-gray-900 font-medium py-2">
                    {section.name}
                    <MinusIcon className="w-5 h-5" />
                  </DisclosureButton>
                  <DisclosurePanel className="pl-4 text-gray-600">
                    {section.options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 py-1"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 focus:ring-indigo-500"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </aside>


            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-8">

{/* dimensions{height: 22, breadth: 22, length: 12}  */}

              {productData.map((img, index) => (
                // console.log(img)
                <ProductCards x3sides={img.sides} type={img.type} compareAtPrice={img.compareAtPrice} weight={img.weight} id={img.productId} imgProd={img.imageUrl} productId={img.productId} name={img.name} price={img.price} description={img.description} sizes={img.dimensions} />
              ))}
              {/* {products.map((img, index) => (
                // console.log(img.img_link)
                <Cards index={img.id} imgProd={img.img_link} productId={img.id} name={img.title} price={img.price} description={img.description} sizes={img.sizes} />
              ))} */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

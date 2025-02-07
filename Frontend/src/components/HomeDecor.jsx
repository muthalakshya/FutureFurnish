import { useState } from "react";
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

// Importing images
import imgcart24 from "../assets/imgcart24.jpg";
import imgcart25 from "../assets/imgcart25.jpg";
import imgcart26 from "../assets/imgcart26.jpg";
import imgcart27 from "../assets/imgcart27.jpg";
import imgcart28 from "../assets/imgcart28.jpg";
import imgcart29 from "../assets/imgcart29.jpg";
import imgcart30 from "../assets/imgcart30.jpg";
import imgcart31 from "../assets/imgcart31.jpg";
import imgcart32 from "../assets/imgcart32.jpg";
import imgcart33 from "../assets/imgcart33.jpg";
import imgcart34 from "../assets/imgcart34.jpg";
import imgcart35 from "../assets/imgcart35.jpg";
import imgcart36 from "../assets/imgcart36.jpg";

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

  return (
    <div className="bg-white pt-16">
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

            {/* Product Grid */}
            {/* Product Grid */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-8">
              {[
                imgcart24,
                imgcart25,
                imgcart26,
                imgcart27,
                imgcart28,
                imgcart29,
                imgcart30,
                imgcart31,
                imgcart32,
                imgcart33,
                imgcart34,
                imgcart35,
                imgcart36,
              ].map((img, index) => (
                <Cards imgProd={img} productId={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

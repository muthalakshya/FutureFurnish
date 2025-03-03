import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowModel from './ShowModel';
import { ShopContext } from '../content/ShopContext';
import Table3d from './Table3d';
import { toast } from 'react-toastify';

const ProductSubmission = () => {
  // Product type selection state
  const [showTypeSelector, setShowTypeSelector] = useState(true);
  const [productType, setProductType] = useState('');
  const navigate = useNavigate();
  const { token, backendUrl, save3d, setSave3d, userContextData, setUserContextData } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [designSubmitted, setDesignSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  
  // Form data state
  const [productData, setProductData] = useState({
    title: '',
    description: '',
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
    quantity: '0',
    category: '',
    status: 'Active',
    type: '',
    vendor: '',
    collections: '',
    tags: '', height:"", breadth:"", length:""
  });
  
  // Preview state
  const [showPreview, setShowPreview] = useState(false);
  
  // Calculate profit and margin when price or cost changes
  const calculateProfitAndMargin = (price, cost) => {
    const numPrice = parseFloat(price) || 0;
    const numCost = parseFloat(cost) || 0;
    const profit = numPrice - numCost;
    const margin = numPrice > 0 ? (profit / numPrice) * 100 : 0;
    
    return {
      profit: profit.toFixed(2),
      margin: margin.toFixed(2) + '%'
    };
  };
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    let updatedData = {
      ...productData,
      [name]: newValue
    };
    
    // Calculate profit and margin if price or cost changes
    if (name === 'price' || name === 'costPerItem') {
      const { profit, margin } = calculateProfitAndMargin(
        name === 'price' ? value : productData.price,
        name === 'costPerItem' ? value : productData.costPerItem
      );
      updatedData = {
        ...updatedData,
        profit,
        margin
      };
    }
    
    setProductData(updatedData);
  };
  
  // Handle product type selection
  const handleSelectProductType = (type) => {
    setProductType(type);
    setProductData({
      ...productData,
      type: type,
      title: type === 'jute_bag' ? 'Eco-friendly Jute Bag' : 'Handcrafted Wooden Table'
    });
    setShowTypeSelector(false);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!productData.title || !productData.price) {
      alert('Please fill in all required fields (Title and Price)');
      return;
    }
    
    // Log the product data to console
    console.log('Form submitted with product data:', productData);
    
    // Show preview
    setShowPreview(true);
  };
  
  // Handle final submission
  // Handle final submission
const handleFinalSubmit = async () => {
  try {
    // Format product data for the API
    console.log("userContextData.email",userContextData.email)
    const formattedData = {
      ...productData,
      
      // Convert string number values to actual numbers
      price: parseFloat(productData.price) || 0,
      compareAtPrice: parseFloat(productData.compareAtPrice) || 0,
      costPerItem: parseFloat(productData.costPerItem) || 0,
      weight: parseFloat(productData.weight) || 0,
      emailId:userContextData.email,
      quantity: parseInt(productData.quantity) || 0,
      dimensions: {
        height: parseFloat(productData.height) || 0,
        breadth: parseFloat(productData.breadth) || 0,
        length: parseFloat(productData.length) || 0
      },
      // Add image URL if available
      imageUrl: selectedImage || null
    };
    
    // Make API call to save product
    const response = await fetch(`${backendUrl}/api/product3model/createProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formattedData)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      return toast.error(result.message || 'Failed to save product');
    }
    
    // Show success message
    toast.success(`Your ${productType === 'jute_bag' ? 'Jute Bag' : 'Table'} has been successfully submitted!`);
    
    // Reset form
    setShowPreview(false);
    setShowTypeSelector(true);
    setProductType('');
    setProductData({
      title: '',
      description: '',
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
      quantity: '0',
      category: '',
      status: 'Active',
      type: '',
      vendor: '',
      collections: '',
      tags: '', 
      height: "", 
      breadth: "", 
      length: ""
    });
    
    // Clear image selection
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    // Reset 3D design state
    setDesignSubmitted(false);
    setSave3d(false);
    localStorage.removeItem("save3d");
  } catch (error) {
    console.error('Error submitting product:', error);
    alert(`Error: ${error.message || 'Failed to submit product. Please try again.'}`);
  }
};
  
  // Component for product type selection
  const TypeSelector = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Product Type</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSelectProductType('jute_bag')}
            className="bg-green-100 hover:bg-green-200 border-2 border-green-300 rounded-lg p-6 flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-green-200 rounded-full mb-4 flex items-center justify-center">
              <span className="text-3xl">🛍️</span>
            </div>
            <span className="font-medium">Jute Bag</span>
          </button>
          
          <button
            onClick={() => handleSelectProductType('table')}
            className="bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 rounded-lg p-6 flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-amber-200 rounded-full mb-4 flex items-center justify-center">
              <span className="text-3xl">🪑</span>
            </div>
            <span className="font-medium">Table</span>
          </button>
        </div>
      </div>
    </div>
  );
  
  // Product preview component
  const ProductPreview = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Product Preview</h2>
        <p className="mb-6 text-gray-600">Review how your product will appear when listed</p>
        
        <div className="border rounded-lg p-4 mb-6">
          <div className="flex mb-4">
            <div className="w-1/3 bg-gray-200 rounded-lg flex items-center justify-center h-64">
              <span className="text-6xl">{productType === 'jute_bag' ? '🛍️' : '🪑'}</span>
            </div>
            <div className="w-2/3 pl-6">
              <h3 className="text-2xl font-bold mb-2">{productData.title}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-xl font-bold">₹{productData.price}</span>
                {parseFloat(productData.compareAtPrice) > 0 && (
                  <span className="ml-2 text-gray-500 line-through">₹{productData.compareAtPrice}</span>
                )}
              </div>
              <p className="text-gray-700 mb-4">{productData.description || `Description for your ${productType === 'jute_bag' ? 'eco-friendly jute bag' : 'handcrafted wooden table'}`}</p>
              <div className="mb-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {productData.category || (productType === 'jute_bag' ? 'Eco Products' : 'Furniture')}
                </span>
                {productData.tags && productData.tags.split(',').map((tag, i) => (
                  <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                {productData.trackQuantity && <p>In stock: {productData.quantity}</p>}
                {productData.vendor && <p>Vendor: {productData.vendor}</p>}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={() => setShowPreview(false)} 
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Edit Details
          </button>
          <button 
            onClick={handleFinalSubmit} 
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit Product
          </button>
        </div>
      </div>
    </div>
  );

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setDesignSubmitted(false);
      setSave3d(false);
      localStorage.removeItem("save3d");
    }
  };
  
  // Function to clear the selected image
  const clearSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const savedState = localStorage.getItem("save3d");
    if (savedState === "true") {
      setDesignSubmitted(true);
      setSave3d(true);
    }
    
    // Listen for messages from the design window
    const handleMessage = (event) => {
      if (event.data && event.data.type === "DESIGN_SAVED" && event.data.success) {
        setDesignSubmitted(true);
        setSave3d(true);
      }
    };
    
    // Listen for storage changes (works across different tabs/windows)
    const handleStorageChange = (e) => {
      if (e.key === "save3d" && e.newValue === "true") {
        setDesignSubmitted(true);
        setSave3d(true);
      }
    };
    
    window.addEventListener("message", handleMessage);
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setSave3d]);

  // Function to open the design window
  const openNewWindow = () => {
    localStorage.removeItem("save3d");
    setDesignSubmitted(false);
    setSave3d(false);
    
    const newWindow = window.open(`/design-${productType === 'jute_bag' ? 'jute' : 'table'}`, "_blank", "width=full,height=full");
    if (newWindow) {
      localStorage.setItem("windowRef", "opened");
    }
  };

  return (
    // <ShowModel />

    // <Table3d />
    <div className="flex w-full max-w-6xl mx-auto bg-gray-100 p-4 pt-24">
      {showTypeSelector && <TypeSelector />}
      {showPreview && <ProductPreview />}

      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex bg-white rounded shadow p-4 mb-4">
          <h1 className="text-xl font-bold">
            {productType === "jute_bag"
              ? "Jute Bag"
              : productType === "table"
              ? "Table"
              : "Product"}{" "}
            Details
          </h1>
          <div className="ml-auto">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Preview
            </button>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/5 pr-0 lg:pr-4">
            {/* Left Column */}
            <div className="bg-white rounded shadow p-4 mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full border rounded p-2"
                  placeholder={
                    productType === "jute_bag"
                      ? "Eco-friendly Jute Bag"
                      : "Handcrafted Wooden Table"
                  }
                  value={productData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <div className="border rounded p-2">
                  <div className="flex border-b pb-2 mb-2">
                    <button
                      type="button"
                      className="px-2 py-1 border-r flex items-center"
                    >
                      <span className="text-sm">Paragraph</span>
                      <span className="ml-1">▼</span>
                    </button>
                    <div className="flex px-2">
                      <button type="button" className="px-2 font-bold">
                        B
                      </button>
                      <button type="button" className="px-2 italic">
                        I
                      </button>
                      <button type="button" className="px-2 underline">
                        U
                      </button>
                      <button type="button" className="px-2">
                        A
                      </button>
                      <span className="mx-2">|</span>
                      <button type="button" className="px-2">
                        ≡
                      </button>
                      <button type="button" className="px-2">
                        •
                      </button>
                      <button type="button" className="px-2">
                        @
                      </button>
                      <button type="button" className="px-2">
                        ...
                      </button>
                    </div>
                    <div className="ml-auto">
                      <button type="button" className="px-2">
                        &lt;/&gt;
                      </button>
                    </div>
                  </div>
                  <textarea
                    name="description"
                    className="w-full h-24 outline-none resize-none"
                    placeholder={
                      productType === "jute_bag"
                        ? "Describe your eco-friendly jute bag..."
                        : "Describe your handcrafted wooden table..."
                    }
                    value={productData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white rounded shadow p-4 mb-4">
              <h3 className="font-medium mb-4">Media</h3>
              {designSubmitted || save3d ? (
                // Show success message when design is submitted
                <div className="border-2 border-dashed rounded p-8 text-center bg-green-50">
                  <div className="text-green-600 font-bold text-xl mb-4">
                    Successfully submitted!
                  </div>
                  <p className="text-gray-600">
                    Your design has been processed and saved.
                  </p>
                </div>
              ) : (
                // Show normal upload UI when not submitted
                <div className="border-2 border-dashed rounded p-8 text-center">
                  {selectedImage ? (
                    <div className="mb-4 relative">
                      <img
                        src={selectedImage}
                        alt="Product preview"
                        className="max-h-64 mx-auto"
                      />
                      <button
                        onClick={clearSelectedImage}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        title="Remove image"
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  ) : null}

                  <div className="flex justify-center mb-2">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="bg-white text-blue-600 font-medium px-3 py-1 text-sm mr-4"
                      ref={fileInputRef}
                    />

                    {!selectedImage && (
                      <button
                        type="button"
                        className="px-3 py-1 text-sm text-red-500 font-bold"
                        onClick={openNewWindow}
                      >
                        Create
                      </button>
                    )}
                  </div>

                  <p className="text-gray-500 text-sm">
                    Accepts images, videos, or 3D models
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded shadow p-4 mb-4">
            <div className="flex mb-4">
              <h3 className="font-medium py-2 px-4 pr-14">Length</h3>
                <div className="w-1/2 pr-2">
                  <div className="relative">
                    <input
                      type="text"
                      name="length"
                      className="w-full border rounded p-2 pl-6"
                      value={productData.length}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <p className="font-medium py-2 px-4">inch</p>
              </div>
            <div className="flex mb-4">
              <h3 className="font-medium py-2 px-4 pr-12">Breadth</h3>
                <div className="w-1/2 pr-2">
                  <div className="relative">
                    <input
                      type="text"
                      name="breadth"
                      className="w-full border rounded p-2 pl-6"
                      value={productData.breadth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <p className="font-medium py-2 px-4">inch</p>
              </div>
              
              <div className="flex mb-4">
              <h3 className="font-medium py-2 px-4 pr-14">Height</h3>
                <div className="w-1/2 pr-2">
                  <div className="relative">
                    <input
                      type="text"
                      name="height"
                      className="w-full border rounded p-2 pl-6"
                      value={productData.height}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <p className="font-medium py-2 px-4">inch</p>
              </div>

              
            </div>

            <div className="bg-white rounded shadow p-4 mb-4">
              <h3 className="font-medium mb-2">Pricing</h3>
              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <label className="block text-sm mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="text"
                      name="price"
                      className="w-full border rounded p-2 pl-6"
                      value={productData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-sm mb-1">Compare-at price</label>
                  <div className="relative">
                    <span className="absolute left-2 top-2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="text"
                      name="compareAtPrice"
                      className="w-full border rounded p-2 pl-6"
                      value={productData.compareAtPrice}
                      onChange={handleInputChange}
                    />
                    <span className="absolute right-2 top-2 text-gray-400 text-sm">
                      ⓘ
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="chargeTax"
                    checked={productData.chargeTax}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm">Charge tax on this product</span>
                </label>
              </div>
              <div className="flex">
                <div className="w-1/3 pr-2">
                  <label className="block text-sm mb-1">Cost per item</label>
                  <div className="relative">
                    <span className="absolute left-2 top-2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="text"
                      name="costPerItem"
                      className="w-full border rounded p-2 pl-6"
                      value={productData.costPerItem}
                      onChange={handleInputChange}
                    />
                    <span className="absolute right-2 top-2 text-gray-400 text-sm">
                      ⓘ
                    </span>
                  </div>
                </div>
                <div className="w-1/3 px-2">
                  <label className="block text-sm mb-1">Profit</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={productData.profit}
                    readOnly
                  />
                </div>
                <div className="w-1/3 pl-2">
                  <label className="block text-sm mb-1">Margin</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={productData.margin}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded shadow p-4 mb-4">
              <h3 className="font-medium mb-2">Inventory</h3>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="trackQuantity"
                    checked={productData.trackQuantity}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm">Track quantity</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  className="w-full border rounded p-2"
                  value={productData.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="continueWhenOutOfStock"
                    checked={productData.continueWhenOutOfStock}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm">
                    Continue selling when out of stock
                  </span>
                </label>
              </div>
              <div className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasSKU"
                    checked={productData.hasSKU}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm">
                    This product has a SKU or barcode
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded shadow p-4">
              <h3 className="font-medium mb-2">Shipping</h3>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPhysical"
                    checked={productData.isPhysical}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm">This is a physical product</span>
                </label>
              </div>
              <div>
                <label className="block text-sm mb-1">Weight</label>
                <div className="flex">
                  <input
                    type="text"
                    name="weight"
                    className="w-24 border rounded-l p-2"
                    value={productData.weight}
                    onChange={handleInputChange}
                  />
                  <div className="border-t border-b border-r rounded-r px-2 py-2 flex items-center">
                    <span className="text-sm">kg</span>
                    <span className="ml-1">▼</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 pl-0 lg:pl-4 mt-4 lg:mt-0">
            {/* Right Column */}
            <div className="bg-white rounded shadow p-4 mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <div className="relative">
                  <select
                    name="status"
                    className="w-full border rounded p-2 appearance-none"
                    value={productData.status}
                    onChange={handleInputChange}
                  >
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                  <div className="absolute right-2 top-2 pointer-events-none">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded shadow p-4 mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  className="w-full border rounded p-2"
                  value={productData.type}
                  onChange={handleInputChange}
                  placeholder={
                    productType === "jute_bag" ? "Eco Bag" : "Furniture"
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  className="w-full border rounded p-2"
                  value={productData.tags}
                  onChange={handleInputChange}
                  placeholder={
                    productType === "jute_bag"
                      ? "eco-friendly, handmade"
                      : "handcrafted, wooden"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductSubmission;
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../content/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
import ShowModel from './ShowModel'
import ShowTableModel from './ShowTableModel'

const ConsultantProduct = () => {
  const { backendUrl, token, currency, setTotalOrders, setOrderTotalValues,userContextData } = useContext(ShopContext)
  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')

  // useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/user-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setEmail(response.data.user.email);
          // console.log(email)
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

  fetchUserData()

  const loadProductData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      if (!token) {
        setLoading(false)
        return
      }
      
      const response = await axios.post(`${backendUrl}/api/product3model/getProductById`,{email})
      console.log(response.data)
      if (response.data.success) {
        // Process the data correctly based on API response structure
        let allProducts = []
        console.log((response.data.data).length)
        
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
                length: prod.dimensions?.length || null
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProductData()
  }, [email])

  return (
    <div className='border-t pt-24 px-4 md:px-12 lg:px-24 mb-8'>
      <div className='text-2xl mb-6'>
        <Title text1={'ALL'} text2={'PRODUCTS'} />
      </div>
      
      {loading && (
        <div className='text-center py-8'>
          <p className='text-gray-600'>Loading products...</p>
        </div>
      )}
      
      {error && (
        <div className='text-center py-8 text-red-500'>
          <p>{error}</p>
          <button 
            onClick={loadProductData} 
            className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Try Again
          </button>
        </div>
      )}
      
      {!loading && !error && productData.length === 0 && (
        <div className='text-center py-8'>
          <img src="https://miraaf.com/assets/images/no_order1.png" alt="No products found" className='mx-auto sm:w-[45%] rounded-lg' />
          <p className='mt-4 text-gray-700 text-lg'>No products available</p>
        </div>
      )}
      
      {!loading && !error && productData.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {productData.map((item, index) => (
            <div key={index} className='border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
              <div className='aspect-square overflow-hidden bg-gray-100'>
                {
                  item.imageUrl || (item.image && item.image[0])?
                  <img 
                  src={item.imageUrl || (item.image && item.image[0]) } 
                  alt={item.title || item.name} 
                  className='w-full h-full object-cover' 
                  onError={(e) => {e.target.src = 'https://miraaf.com/assets/images/no_order1.png'}}
                />
                  : item.type === "table" ? ( // ✅ Use `===` for strict comparison
                  <ShowTableModel d3sides={item.sides} />
                ) : (
                  <ShowModel d3sides={item.sides} />
                )
                }
                {/* <img 
                  src={item.imageUrl || (item.image && item.image[0]) || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80'} 
                  alt={item.title || item.name} 
                  className='w-full h-full object-cover' 
                  onError={(e) => {e.target.src = 'https://miraaf.com/assets/images/no_order1.png'}}
                /> */}
              </div>
              
              <div className='p-4'>
                <h3 className='font-medium text-lg truncate'>{item.title || item.name}</h3>
                
                <div className='mt-2 flex items-center justify-between'>
                  <p className='text-lg font-semibold'>{currency}{parseFloat(item.price).toFixed(2)}</p>
                  <p className='text-sm text-gray-500'>Qty: {item.quantity || 1}</p>
                </div>
                
                {item.description && (
                  <p className='mt-2 text-sm text-gray-600 line-clamp-2'>{item.description}</p>
                )}
                
                <div className='mt-4 flex items-center justify-between'>
                  <span className='inline-flex items-center'>
                    <span className='w-2 h-2 rounded-full bg-green-500 mr-2'></span>
                    <span className='text-sm'>{item.status || 'Available'}</span>
                  </span>
                  
                  <button className='border border-gray-300 px-4 py-1 text-sm font-medium rounded hover:bg-gray-50'>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && !error && productData.length > 0 && (
        <div className='mt-8 text-center'>
          <button 
            onClick={loadProductData} 
            className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600'
          >
            Refresh Products
          </button>
        </div>
      )}
    </div>
  )
}

export default ConsultantProduct
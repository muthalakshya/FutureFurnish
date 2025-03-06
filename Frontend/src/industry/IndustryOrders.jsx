import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../content/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
import Showtableorders from '../conultant/Showtableorders'
import ShowModelonorders from '../conultant/ShowModelonorders'

const IndustryOrders = () => {
  const {backendUrl, token, currency, setTotalOrders, setOrderTotalValues} = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [inemail, setInEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Fetch user profile data
  useEffect(() => {
    const fetchUserContextData = async () => {
      if (!token) return;
      
      try {
        const response = await axios.get(`${backendUrl}/api/user/user-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setInEmail(response.data.user);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserContextData();
  }, [token, backendUrl]);

  // Load order data
  const loadOrderData = async () => {
    if (!token) return;
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${backendUrl}/api/order/industryorders`,{inemail:inemail.email});
  
      if (response.data.success) {
        console.log(response.data.orders)
        let allOrdersItem = [];
        let totalValue = 0;
  
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
  
            totalValue += item.price * item.quantity;
            allOrdersItem.push(item);
          });
        });
  
        // Sort by date (newest first)
        allOrdersItem.reverse();
        
        setOrderData(allOrdersItem);
        setOrderTotalValues(totalValue);
        setTotalOrders(allOrdersItem.length);
  
        // Store in localStorage
        localStorage.setItem("totalValue", totalValue.toString());
        localStorage.setItem("totalOrders", allOrdersItem.length.toString());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error(error.message || "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  // Single useEffect to load order data
  useEffect(() => {
    if (token) {
      loadOrderData();
    }
    
    // Optional: Set up polling to check for new orders
    const intervalId = setInterval(() => {
      if (token) loadOrderData();
    }, 60000); // Check for new orders every minute
    
    return () => clearInterval(intervalId);
  }, [token, backendUrl]);

  return (
    <div className='border-t pt-20 px-24 mb-2'>
      <div className='text-2xl'>
        <Title text1={'ALL'} text2={'ORDERS'} />
      </div>
      
      <div className="flex justify-end mb-4">
        <button 
          onClick={loadOrderData} 
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Orders'}
        </button>
      </div>
      
      <div>
        {isLoading && orderData.length === 0 ? (
          <div className="text-center py-8">Loading orders...</div>
        ) : orderData.length === 0 ? (
          <div className='text-2xl text-center pb-24'>
            <img src="https://miraaf.com/assets/images/no_order1.png" alt="" className='mx-auto sm:w-[45%] rounded-4xl'/>
          </div>
        ) : (
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                {/* <img src={item.image} className='w-16 sm:w-20' alt={item.title} /> */}
                {item.imageUrl ? (
                    <img src={item.image} className="w-28 sm:w-24 h-28 mr-13 mb-2" /> 
                  ) : item.type === "table" ? ( // ✅ Use `===` for strict comparison
                  <ShowModelonorders d3sides={item.sides}/>
                ) : (
                  <Showtableorders d3sides={item.sides} />
                )}
                <div>
                  <p className='font-medium sm:text-base'>{item.title}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toLocaleDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <div className={`min-w-2 h-2 rounded-full ${
                    item.status === 'Delivered' ? 'bg-green-500' :
                    item.status === 'Processing' ? 'bg-yellow-500' :
                    item.status === 'Shipped' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button 
                  className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100'
                >
                  TRACK ORDER
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default IndustryOrders
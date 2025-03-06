import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../content/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const {backendUrl,token,currency} = useContext(ShopContext)
  const  [orderData, setOrderData] = useState([])

  const loadOrderData = async ()=>{
    try {
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
      console.log(response.data)
      if(response.data.success){
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod']  = order.paymentMethod
            item['date']  = order.date
            allOrdersItem.push(item)
          })
        })
        // console.log(allOrdersItem)
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // console.log(orderData.length)

  useEffect(()=>{
    loadOrderData()
  },[token])

    return (
      <div className='border-t pt-20 px-24'>
        <div className='text-2xl'>
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
        <div>
          {
            orderData.length==0?
            <div className='text-2xl text-center pb-24'>
              <img src="https://miraaf.com/assets/images/no_order1.png" alt="" className='mx-auto sm:w-[45%] rounded-4xl'/>
              {/* <p>No orders yet</p> */}
            </div>
            :
            orderData.map((item, index) => {
              return (
                <div key={index} className='py-4 border-t border-b  text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 '>
                  <div className='flex items-start gap-6 text-sm '>
                    <img src={item.img_link} className='w-16 sm:w-20' />
                    <div>
                      <p className='font-medium sm:text-base'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                        <p>{currency}{item.price}</p>
                        <p>Quantity : {item.quantity}</p>
                        <p>Size : {item.size}</p>
                      </div>
                      <p className='mt-1'>Date: <span className='text-gray-400'>{new  Date(item.date).toLocaleDateString()}</span></p>
                      <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                    </div>
                    
                  </div>
                  <div className= 'md:w-1/2 flex justify-between' >
                      <div className= 'flex items-center gap-2 '>
                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                        <p className='text-sm md:text-base' >{item.status}</p>
                      </div>
                      <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>TRACK ORDER</button>
                    </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
}

export default Orders

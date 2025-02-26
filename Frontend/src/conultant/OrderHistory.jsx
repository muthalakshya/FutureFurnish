// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Collapse,
//   IconButton,
//   Chip,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { motion } from "framer-motion";

// const initialOrders = [
//   {
//     id: "#12345",
//     date: "Jan 12, 2025",
//     status: "Delivered",
//     total: "$450",
//     details: [
//       "1x Modern Luxury Sofa - $400",
//       "1x Antique Wall Clock - $50",
//     ],
//   },
//   {
//     id: "#67890",
//     date: "Feb 05, 2025",
//     status: "Shipped",
//     total: "$250",
//     details: ["1x Elegant Floor Lamp - $75", "1x Wooden Coffee Table - $175"],
//   },
//   {
//     id: "#54321",
//     date: "Feb 20, 2025",
//     status: "Processing",
//     total: "$120",
//     details: ["1x Decorative Wall Mirror - $120"],
//   },
// ];

// const getStatusColor = (status) => {
//   switch (status) {
//     case "Delivered":
//       return "success";
//     case "Shipped":
//       return "info";
//     case "Processing":
//       return "warning";
//     default:
//       return "default";
//   }
// };

// const OrderHistory = () => {
//   const [expanded, setExpanded] = useState(null);

//   const handleExpand = (id) => {
//     setExpanded(expanded === id ? null : id);
//   };

//   return (
//     <div className="sm:px-24 px-8 py-20">
//       <Typography variant="h4" gutterBottom>
//         Your Order History 📦
//       </Typography>

//       <Grid container spacing={3}>
//         {initialOrders.map((order) => (
//           <Grid item xs={12} key={order.id}>
//             <motion.div whileHover={{ scale: 1.02 }}>
//               <Card className="shadow-md">
//                 <CardContent>
//                   <div className="flex justify-between items-center">
//                     <Typography variant="h6">{order.id}</Typography>
//                     <Chip label={order.status} color={getStatusColor(order.status)} />
//                   </div>
//                   <Typography variant="body2" color="text.secondary">
//                     Ordered on: {order.date}
//                   </Typography>
//                   <Typography variant="body2" fontWeight="bold">
//                     Total: {order.total}
//                   </Typography>

//                   <IconButton onClick={() => handleExpand(order.id)}>
//                     <ExpandMoreIcon />
//                   </IconButton>

//                   <Collapse in={expanded === order.id}>
//                     <div className="mt-2">
//                       {order.details.map((item, index) => (
//                         <Typography key={index} variant="body2">
//                           {item}
//                         </Typography>
//                       ))}
//                     </div>
//                   </Collapse>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>

//       {initialOrders.length === 0 && (
//         <Typography variant="h6" color="text.secondary" className="mt-4">
//           No past orders found.
//         </Typography>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;

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
        console.log(allOrdersItem)
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  console.log(orderData.length)

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
                    <img src={item.image[0]} className='w-16 sm:w-20' />
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

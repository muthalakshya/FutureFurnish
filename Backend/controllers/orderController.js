import orderModel  from '../models/orderModel.js';
import userModel from '../models/userModel.js'
import Stripe  from 'stripe';
import razorpay  from 'razorpay';


const currency = 'inr'
const deliveryCharges = 50

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const  razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const placeOrder  = async (req, res) => {
    try {
        const { userId, items, amount, address} = req.body;
        // console.log(items)

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment : false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success : true, message: "Order Placed"})
    } catch (error) {
        console.log(error)
        res.json({success : false, message: error.message})
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment : false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items =  items.map((item) => ({
            price_data: {
                currency:currency,
                product_data : {
                    name:item.name
                },
                unit_amount : item.price*100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency:currency,
                product_data : {
                    name:"Delivery Charges"
                },
                unit_amount : deliveryCharges*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${req.get('origin')}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${req.get('origin')}/verify?success=false&orderId=${newOrder._id}` ,
            line_items,
            mode: 'payment',
        })
            res.json({success:true, session_url:session.url});
    } catch (error) {
        console.log(error)
        res.json({success : false, message: error.message})
    }

}

// Verify Stripe
const verifyStripe = async (req, res) => {

    const { orderId, success, userId } = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true} );
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true} ) ;
        } else {
            await orderModel. findByIdAndDelete(orderId)
            res.json( {success : false})
        }
    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req,res) => {
    try {
        const { userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment : false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }
            
        await razorpayInstance.orders.create(options, (error, order)=>{
            if (error) {
                console.log(error)
                return res.json({success: false, message: error})
            }
            res.json({success : true, order} )
        })
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const verifyRazorpay = async(req, res)=>{
    try {
        const { userId, razorpay_order_id} = req.body

        const orderInfo = await  razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true} ) ;
            await userModel.findByIdAndUpdate(userId, {cartData: {} })
            res.json({ success: true, message: "Payment Successful" })
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// All Orders data for Admin Panel
const allOrders = async (req,res) => {
    try {

        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.json({success : false, message: error.message})
    }
}

// User Order Data For Forntend
const userOrders = async (req, res) => {
    try {
        const {userId}  = req.body

        const orders = await orderModel.find({userId})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.json({success : false, message: error.message})
    }
}
// update order status
const updateStatus = async (req, res) => {
    try {
        const  {orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success : false, message: error.message})
    }
}

// const industryOrders = async (req, res) => {
//     try {
//       const { inemail } = req.body;
//       console.log("Looking for orders with industry email:", inemail);
      
//       // Find orders where any item has the matching industry email
//       const orders = await orderModel.find({
//         "items.industryEmail": inemail
//       });
      
//       if (orders.length === 0) {
//         return res.json({ 
//           success: true, 
//           orders: [],
//           message: "No orders found for this industry email" 
//         });
//       }
      
//       // You can either return full orders
//       res.json({
//         success: true,
//         orders: orders,
//         count: orders.length
//       });
      
//       // OR filter to only include matching items
//       /*
//       // Extract only the items that match the industry email
//       const matchingItems = [];
//       orders.forEach(order => {
//         if (order.items && Array.isArray(order.items)) {
//           const filteredItems = order.items.filter(item => 
//             item.industryEmail === inemail
//           );
//           matchingItems.push(...filteredItems);
//         }
//       });
      
//       res.json({
//         success: true,
//         items: matchingItems,
//         count: matchingItems.length
//       });
//       */
      
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ success: false, message: error.message });
//     }
//   };
const industryOrders = async (req, res) => {
    try {
      const { inemail } = req.body;
    //   console.log("Looking for orders with industry email:", inemail);
      
      // Find orders where any item has the matching industry email
      const orders = await orderModel.find({
        "items.industryEmail": inemail
      });
      
      // Create a modified version of orders where each order only includes the matching items
      const ordersWithFilteredItems = orders.map(order => {
        // Create a copy of the order
        const orderCopy = JSON.parse(JSON.stringify(order));
        
        // Filter items to only include those with matching industry email
        orderCopy.items = orderCopy.items.filter(item => 
          item.industryEmail === inemail
        );
        
        return orderCopy;
      });
      
      res.json({
        success: true,
        orders: ordersWithFilteredItems,
        count: orders.length
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

export  {verifyRazorpay, verifyStripe,placeOrder,industryOrders, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}
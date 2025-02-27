"use client";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../content/ShopContext";

export default function IndustryUpdateStatus() {
  const [orders, setOrders] = useState([]);
  const {backendUrl,token,currency} = useContext(ShopContext)


  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      if (!token) return;
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders!");
    }
  };

  // Update order status
  const handleStatusChange = async (event, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`, { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        toast.success("Order status updated!");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update status!");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="py-30 px-4 sm:px-10 lg:px-40 w-full justify-center">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">
          Update Order Delivery Status
        </h1>
        
        {orders.length === 0 ? (
          <p className="text-gray-700">No orders available.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="border-b border-gray-300 py-4">
              <p className="text-sm font-medium text-gray-700">
                Order ID: <span className="text-gray-900">{order._id}</span>
              </p>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Customer: <span className="text-gray-900">{order.address.firstName} {order.address.lastName}</span>
              </p>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Address: <span className="text-gray-900">{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.pincode}</span>
              </p>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Phone: <span className="text-gray-900">{order.address.phone}</span>
              </p>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Amount: <span className="text-gray-900">₹{order.amount}</span>
              </p>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Payment: <span className="text-gray-900">{order.payment ? "Done" : "Pending"}</span>
              </p>

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Update Status
              </label>
              <select
                value={order.status}
                onChange={(event) => handleStatusChange(event, order._id)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Order Confirmed">Order Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

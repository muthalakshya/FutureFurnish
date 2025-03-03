import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ShopContext } from "../content/ShopContext";
import { Link } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Sample data for the charts
const clientEngagementData = [
  { month: "Jan", meetings: 10, proposals: 5, closedDeals: 3 },
  { month: "Feb", meetings: 15, proposals: 8, closedDeals: 6 },
  { month: "Mar", meetings: 12, proposals: 7, closedDeals: 4 },
  { month: "Apr", meetings: 18, proposals: 10, closedDeals: 8 },
];

const projectStatusData = [
  { status: "Completed", value: 40 },
  { status: "Ongoing", value: 30 },
  { status: "Pending", value: 20 },
  { status: "Cancelled", value: 10 },
];

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 17000 },
  { month: "Apr", revenue: 20000 },
];

const ConsultantDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {navigate} = useContext(ShopContext)
  const {backendUrl,token,currency} = useContext(ShopContext)
  const  [orderData, setOrderData] = useState([])

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const loadOrderData = async ()=>{
    try {
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
      // console.log(response.data)
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
    <div className="sm:px-24 px-6 space-y-8 py-28">
      <Typography variant="h4" gutterBottom>
        Consultant Dashboard
      </Typography>

      {/* Quick Actions */}
      <Grid container spacing={2} className="text-sm">
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent className="bg-blue-500 text-white">
              <Typography variant="h5">Manage Clients</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Link to={"/design-product"}>
          <Card>
            <CardContent className="bg-blue-500 text-white">
              <Typography variant="h5" >Create Proposal</Typography>
            </CardContent>
          </Card>
          </Link>
          
        </Grid>
        <Grid item xs={12} md={2}>
        <Link to={"/consultant-product"}>
        <Card>
            <CardContent className="bg-blue-500 text-white">
              <Typography variant="h5">View Projects</Typography>
            </CardContent>
          </Card>
        </Link>
          
        </Grid>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent className="bg-blue-500 text-white">
              <Typography variant="h5">Financial Reports</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent className="bg-blue-500 text-white">
              <Typography variant="h5">Schedule Meeting</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Summary Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Total Clients</Typography>
              <Typography variant="h5">150</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Ongoing Projects</Typography>
              <Typography variant="h5">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Monthly Revenue</Typography>
              <Typography variant="h5">$20,000</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Success Rate</Typography>
              <Typography variant="h5">85%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for Insights */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Client Engagement" />
        <Tab label="Project Status" />
        <Tab label="Revenue Trends" />
      </Tabs>

      {/* Chart Components */}
      {activeTab === 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={clientEngagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="meetings" stroke="#8884d8" name="Meetings" />
            <Line type="monotone" dataKey="proposals" stroke="#82ca9d" name="Proposals" />
            <Line type="monotone" dataKey="closedDeals" stroke="#FFBB28" name="Closed Deals" />
          </LineChart>
        </ResponsiveContainer>
      )}

      {activeTab === 1 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={projectStatusData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {projectStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}

      {activeTab === 2 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ConsultantDashboard;

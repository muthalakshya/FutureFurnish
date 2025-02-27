import React, { useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import { Link } from "react-router-dom";
import { ShopContext } from "../content/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const orderHistoryData = [
  { month: "Jan", orders: 120, returns: 10, profit: 8000, interest: 90 },
  { month: "Feb", orders: 150, returns: 5, profit: 9000, interest: 85 },
  { month: "Mar", orders: 170, returns: 8, profit: 11000, interest: 75 },
  { month: "Apr", orders: 200, returns: 15, profit: 15000, interest: 70 },
];

const productInterestPredictionData = [
  { month: "May", furniture: 70, lighting: 60, decor: 50, textiles: 45 },
  { month: "Jun", furniture: 65, lighting: 55, decor: 45, textiles: 40 },
  { month: "Jul", furniture: 60, lighting: 50, decor: 40, textiles: 35 },
  { month: "Aug", furniture: 55, lighting: 45, decor: 35, textiles: 30 },
];

const wastePredictionData = [
  { product: "Furniture", waste: 15 },
  { product: "Lighting", waste: 10 },
  { product: "Decor", waste: 5 },
  { product: "Textiles", waste: 8 },
];

const trafficData = [
  { source: "Organic Search", value: 56 },
  { source: "Facebook", value: 15 },
  { source: "Twitter", value: 11 },
  { source: "LinkedIn", value: 8 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {backendUrl,token,currency, totalOrders , setTotalOrders, orderTotalValues, setOrderTotalValues} = useContext(ShopContext)
  const  [orderData, setOrderData] = useState([])

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const loadOrderData = async () => {
    try {
      if (!token) return;
  
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
  
      if (response.data.success) {
        let allOrdersItem = [];
        let totalValue = 0;
  
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            totalValue += item.price * item.quantity;
            allOrdersItem.push(item);
          });
        });
  
        setOrderData(allOrdersItem.reverse());
        setOrderTotalValues(totalValue);
        setTotalOrders(allOrdersItem.length);
  
        // Store in localStorage
        localStorage.setItem("totalValue", totalValue);
        localStorage.setItem("totalOrders", allOrdersItem.length);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const savedTotalOrders = localStorage.getItem("totalOrders");
    const savedTotalValue = localStorage.getItem("totalValue");
  
    if (savedTotalOrders) setTotalOrders(Number(savedTotalOrders));
    if (savedTotalValue) setOrderTotalValues(Number(savedTotalValue));
  
    loadOrderData();
  }, [token]);

  loadOrderData();

  return (
    <div className="sm:px-24 px-6 space-y-8 py-28">
      <Typography variant="h4" gutterBottom>
        Home Decor AI Platform Dashboard
      </Typography>

      <Grid container spacing={2} className="text-sm">
        <Grid item xs={12} md={1.5}>
          <Link to="/inventory-management-form">
            <Card>
              <CardContent className="bg-blue-500 text-white ">
                <Typography color="text.main" variant="h5">
                  Add Product
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={1.5}>
          <Link to="/product-management">
            <Card>
              <CardContent className="bg-blue-500 text-white ">
                <Typography color="text.main" variant="h5">
                  View Product
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={1.7}>
          <Link to="/industry-order">
            <Card>
              <CardContent className="bg-blue-500 text-white">
                <Typography color="text.main" variant="h5">
                  View All Orders
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} md={2}>
          <Link to="/returns-refunds">
            <Card>
              <CardContent className="bg-blue-500 text-white">
                <Typography color="text.main" variant="h5">
                  Returns & Refunds
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} md={2.5}>
          <Link to="/">
            <Card>
              <CardContent className="bg-blue-500 text-white">
                <Typography color="text.main" variant="h5">
                  AI Demand Forecasting
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={2}>
          <Link to="/industry-update-status">
            <Card>
              <CardContent className="bg-blue-500 text-white">
                <Typography color="text.main" variant="h5">
                  Delivery Status
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Total Orders</Typography>
              <Typography variant="h5">{totalOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Total Revenue</Typography>
              <Typography variant="h5">{orderTotalValues}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Active Customers</Typography>
              <Typography variant="h5">1,230</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Return Rate</Typography>
              <Typography variant="h5">2.5%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Order Trends" />
        <Tab label="Profit Trends" />
        <Tab label="Product Comparison" />
        <Tab label="Interest Predictions" />
        <Tab label="Traffic Insights" />
      </Tabs>

      {activeTab === 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={orderHistoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
            <Line type="monotone" dataKey="returns" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}

      {activeTab === 1 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={wastePredictionData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="waste"
            >
              {wastePredictionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}

      {activeTab === 2 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={wastePredictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="waste"
              fill="#8884d8"
              name="Predicted Waste (Units)"
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {activeTab === 3 && (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={productInterestPredictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="furniture"
              stroke="#8884d8"
              fill="#8884d8"
              name="Furniture"
            />
            <Area
              type="monotone"
              dataKey="lighting"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Lighting"
            />
            <Area
              type="monotone"
              dataKey="decor"
              stroke="#FFBB28"
              fill="#FFBB28"
              name="Decor"
            />
            <Area
              type="monotone"
              dataKey="textiles"
              stroke="#FF8042"
              fill="#FF8042"
              name="Textiles"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {activeTab === 4 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={trafficData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.source}: ${entry.value}%`}
              dataKey="value"
            >
              {trafficData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Dashboard;

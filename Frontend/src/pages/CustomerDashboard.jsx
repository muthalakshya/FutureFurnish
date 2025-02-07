import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Sample Data
const orderData = [
  { month: "Jan", orders: 200, favorites: 80, profit: 10000 },
  { month: "Feb", orders: 250, favorites: 120, profit: 14000 },
  { month: "Mar", orders: 300, favorites: 150, profit: 20000 },
];

const customerTrafficData = [
  { source: "Organic Search", value: 50 },
  { source: "Social Media", value: 25 },
  { source: "Email Marketing", value: 15 },
  { source: "Referral", value: 10 },
];

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sm:px-24 px-6 space-y-8 py-20">
      <Typography variant="h4" gutterBottom>
        Home Decor Customer Dashboard
      </Typography>

      {/* Navigation Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card onClick={() => handleNavigation("/home-decor")} style={{ cursor: "pointer" }}>
            <CardContent className="bg-green-500 text-white">
              <Typography variant="h6">Explore Collections</Typography>
              <Typography variant="body2">
                Discover trending furniture, lighting, decor, and more.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card onClick={() => handleNavigation("/wishlist")} style={{ cursor: "pointer" }}>
            <CardContent className="bg-blue-500 text-white">
              <Typography variant="h6">Your Wishlist</Typography>
              <Typography variant="body2">
                View and manage your saved favorites.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card onClick={() => handleNavigation("/order-history")} style={{ cursor: "pointer" }}>
            <CardContent className="bg-purple-500 text-white">
              <Typography variant="h6">Order History</Typography>
              <Typography variant="body2">
                Track your past purchases and invoices.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Statistics Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Total Orders</Typography>
              <Typography variant="h5">520</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Favorite Items</Typography>
              <Typography variant="h5">80</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Points Earned</Typography>
              <Typography variant="h5">1,200</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for Data Visualizations */}
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Order Trends" />
        <Tab label="Traffic Insights" />
        <Tab label="Favorite Trends" />
      </Tabs>

      {activeTab === 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
            <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}

      {activeTab === 1 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={customerTrafficData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.source}: ${entry.value}%`}
              dataKey="value"
            >
              {customerTrafficData.map((entry, index) => (
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
          <AreaChart data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="favorites"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CustomerDashboard;

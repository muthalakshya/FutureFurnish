import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Cart from './pages/Cart';
import Consultants from './conultant/Consultants';
import HomeDecor from './components/HomeDecor';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';
import Customer from './customer/Customer';
import Industry from './industry/Industry';
import InventoryPredictionForm from "./industry/InventoryPredictionForm";
import ProductManagement from "./industry/ProductManagement";
import ConsultantRegistration from "./conultant/ConsultantRegistration";
import HomeownerRegistration from "./customer/HomeownerRegistration";
import ProductDetail from "./components/ProductDetail";
import OrderTracking from "./pages/OrderTracking";
import IndustryUpdateStatus from "./industry/IndustryUpdateStatus";
import ReturnsRefunds from "./pages/ReturnsRefunds";
import IndustryDashboard from "./dashboard/IndustryDashboard";
import ConsultantDashboard from "./dashboard/ConsultantDashboard";
import CustomerDashboard from "./dashboard/CustomerDashboard";
import Wishlist from "./pages/Wishlist";
import OrderHistory from "./conultant/OrderHistory";
import Placeorder from "./pages/Placeorders";
import { ShopContext } from './content/ShopContext';
import Unauthorized from './components/Unauthorized';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, userType } = useContext(ShopContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  return (
    <div className='bg-[#f1f9eb]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/home-decor/:productId' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path="/consultant-registration" element={<ConsultantRegistration />} />
        <Route path="/homeowner-registration" element={<HomeownerRegistration />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path='/consultants' element={<Consultants />} />
        <Route path='/home-decor' element={<HomeDecor />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/inventory-management-form" element={<InventoryPredictionForm />} />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/returns-refunds" element={<ReturnsRefunds />} />
        
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path='/place-order' element={<Placeorder />} />

        {/* Protected Routes */}
        <Route path="/industry-dashboard" element={
          <ProtectedRoute allowedRoles={["industry"]}>
            <IndustryDashboard />
          </ProtectedRoute>
        } />

        <Route path="/consultant-dashboard" element={
          <ProtectedRoute allowedRoles={["consultant"]}>
            <ConsultantDashboard />
          </ProtectedRoute>
        } />

        <Route path="/customer-dashboard" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        } />

        <Route path="/industry-update-status" element={
          <ProtectedRoute allowedRoles={["industry"]}>
            <IndustryUpdateStatus />
          </ProtectedRoute>
        } />

        <Route path="/unauthorized" element={<Unauthorized />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;

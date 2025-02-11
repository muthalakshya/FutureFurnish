import { useState } from 'react'
import {Routes, Route} from  'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Cart from './pages/Cart'
import Consultants from './conultant/Consultants'
import HomeDecor from './components/HomeDecor'
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from 'react-toastify';
import Customer from './customer/Customer'
import Industry from './industry/Industry'
import InventoryPredictionForm from "./industry/InventoryPredictionForm"
import ProductManagement  from "./industry/ProductManagement"
import ConsultantRegistration from "./conultant/ConsultantRegistration"
import HomeownerRegistration from "./customer/HomeownerRegistration"
import ProductDetail from "./components/ProductDetail"
import OrderTracking from "./pages/OrderTracking"
import IndustryUpdateStatus from "./industry/IndustryUpdateStatus"
import ReturnsRefunds from "./pages/ReturnsRefunds"
import IndustryDashboard from "./dashboard/IndustryDashboard"
import ConsultantDashboard from "./dashboard/ConsultantDashboard"
import CustomerDashboard from "./dashboard/CustomerDashboard"
import Wishlist from "./pages/Wishlist"
import OrderHistory from "./conultant/OrderHistory"
import imgcart24 from "./assets/imgcart24.jpg";
import imgcart25 from "./assets/imgcart25.jpg";
import imgcart26 from "./assets/imgcart26.jpg";
import {products} from "./assets copy/assets"



function App() {

  return (
    <div className='bg-[#f1f9eb]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/home-decor/:productId' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/consultants' element={<Consultants />} />
        <Route path='/home-decor' element={<HomeDecor />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/inventory-management-form" element={<InventoryPredictionForm />}/>
        <Route path="/product-management" element={<ProductManagement />}/>
        <Route path="/consultant-registration" element={<ConsultantRegistration />}/>
        <Route path="/homeowner-registration" element={<HomeownerRegistration />}/>
        <Route path="/order-tracking" element={<OrderTracking />}/>
        <Route path="/industry-update-status" element={<IndustryUpdateStatus />}/>
        <Route path="/returns-refunds" element={<ReturnsRefunds />}/>
        <Route path="/industry-dashboard" element={<IndustryDashboard />}/>
        <Route path="/consultant-dashboard" element={<ConsultantDashboard />}/>
        <Route path="/customer-dashboard" element={<CustomerDashboard />}/>
        <Route path="/wishlist" element={<Wishlist />}/>
        <Route path="/order-history" element={<OrderHistory />}/>

        {/* <Route path='/place-order' element={<Placeorder />} /> */}
        {/* <Route path='/orders' element={<Orders />} /> */}
        {/* <Route path='/verify' element={<Verify />}  /> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App

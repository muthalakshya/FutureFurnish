import { useState } from 'react'
import {Routes, Route} from  'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Cart from './pages/Cart'
import Consultants from './pages/Consultants'
import HomeDecor from './components/HomeDecor'
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from 'react-toastify';
import Customer from './pages/Customer'
import Industry from './pages/Industry'
import InventoryPredictionForm from "./pages/InventoryPredictionForm"
import ProductManagement  from "./pages/ProductManagement"
import ConsultantRegistration from "./pages/ConsultantRegistration"
import HomeownerRegistration from "./pages/HomeownerRegistration"
import ProductDetail from "./components/ProductDetail"
import OrderTracking from "./pages/OrderTracking"
import IndustryUpdateStatus from "./pages/IndustryUpdateStatus"
import ReturnsRefunds from "./pages/ReturnsRefunds"
import IndustryDashboard from "./pages/IndustryDashboard"
import ConsultantDashboard from "./pages/ConsultantDashboard"
import CustomerDashboard from "./pages/CustomerDashboard"
import Wishlist from "./pages/Wishlist"
import OrderHistory from "./pages/OrderHistory"
import imgcart24 from "./assets/imgcart24.jpg";
import imgcart25 from "./assets/imgcart25.jpg";
import imgcart26 from "./assets/imgcart26.jpg";


const products = [
  { id: "0", img: imgcart24, name: "Gallery 25 Sundarbans", price: 499 },
  { id: "1", img: imgcart25, name: "Zip Tote Basket", price: 140 },
  { id: "2", img: imgcart26, name: "Halfsize Tote", price: 210 },
  // Add more products...
];

function App() {

  return (
    <div className='bg-[#f1f9eb]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/home-decor/:productId' element={<ProductDetail products={products}/>} />
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

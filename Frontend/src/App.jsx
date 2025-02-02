import { useState } from 'react'
import {Routes, Route} from  'react-router-dom'
import Navbar from './components/Navbar'
import Shopcategory from './components/Shopcategory'
import Newarrival from './components/Newarrival'
import Topselling from './components/Topselling'
import Footer from './components/Footer'
import Carosel from './components/Carosel'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Home from './components/Home'
import Login from './components/Login'
import About from './components/About'
import Consultants from './components/Consultants'
import HomeDecor from './components/HomeDecor'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Cart from './components/Cart'




function App() {

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='/product/:productId' element={<Product />} /> */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/consultants' element={<Consultants />} />
        <Route path='/home-decor' element={<HomeDecor />} />
        {/* <Route path='/place-order' element={<Placeorder />} /> */}
        {/* <Route path='/orders' element={<Orders />} /> */}
        {/* <Route path='/verify' element={<Verify />}  /> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App

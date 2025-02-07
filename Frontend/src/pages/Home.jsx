import React from 'react'
import Shopcategory from '../components/Shopcategory'
import Newarrival from '../components/Newarrival'
import Topselling from '../components/Topselling'
import Carosel from '../components/Carosel'

const Home = () => {
  return (
    <div>
        <Carosel />
        <Shopcategory />
        <Newarrival />
        <Topselling />
    </div>
  )
}

export default Home
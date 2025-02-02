import React from 'react'
import Shopcategory from './Shopcategory'
import Newarrival from './Newarrival'
import Topselling from './Topselling'
import Carosel from './Carosel'

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
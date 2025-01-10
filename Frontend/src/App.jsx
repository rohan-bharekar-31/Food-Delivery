import React,{useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { LoginPopUp } from './components/LoginPopUp/LoginPopUp'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrders from './Pages/MyOrders/MyOrders'


const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (

    <>
    <ToastContainer/>
    {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/myorders' element={<MyOrders />} />
      </Routes>
    </div>
      <Footer />
    </>

  )
}

export default App

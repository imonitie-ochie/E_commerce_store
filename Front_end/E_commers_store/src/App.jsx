import React from 'react'
import ProductDetails from "./compunent/ProductCard"
import Loging from "../src/pages/Loging"
import Contact from './pages/Contact';
import SingleProduct from './compunent/ProductPage';
import Shop from './pages/Shop';
import CartPage from './pages/CartPage';
import { Routes, Route, } from 'react-router-dom';
import './App.css';
import Hero from './compunent/Hero';
import HomePage from './pages/HomePage';
import NavBar from './compunent/Nav';
import Register from './pages/Register';
import ProductPage from './compunent/ProductPage';



const App = () => {
  return (
    <>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/shop' element={<Shop />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Loging />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/product/:id" element={< ProductPage/>} />"
      </Routes>

    </>
  )
}

export default App
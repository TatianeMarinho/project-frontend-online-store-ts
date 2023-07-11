import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import './App.css';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={ <Search /> } />
        <Route path="/shoppingcart" element={ <ShoppingCart /> } />
        <Route path="/checkout" element={ <Checkout /> } />
        <Route path="/product/details/:id" element={ <ProductDetails /> } />
      </Routes>
    </main>
  );
}

export default App;

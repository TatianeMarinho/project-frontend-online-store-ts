import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import './App.css';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={ <Search /> } />
        <Route path="/shoppingcart" element={ <ShoppingCart /> } />
      </Routes>
    </main>
  );
}

export default App;

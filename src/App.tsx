import { Routes, Route } from 'react-router-dom';
import Search from './components/Search/Search';
import './App.css';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Search /> } />
      <Route path="/shoppingcart" element={ <ShoppingCart /> } />
      <Route path="/checkout" element={ <Checkout /> } />
      <Route path="/product/details/:id" element={ <ProductDetails /> } />
    </Routes>
  );
}

export default App;

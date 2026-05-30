import axios from 'axios';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { Tracking } from './pages/Tracking';
import { NotFound } from './pages/404';
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
    const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data);
      };

  useEffect(() => {
      loadCart();
  }, []); 

  return (
    <Routes>
      <Route index element={<HomePage cart = {cart} setCart = {setCart} loadCart={loadCart}/>} />
      <Route path="checkout" element={<CheckoutPage 
      cart = {cart} 
      setCart = {setCart}
      loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart = {cart} setCart = {setCart} loadCart={loadCart}/>} />
      <Route path="/tracking/:orderId/:productId" element={<Tracking />} />
      <Route path="*" element={<NotFound cart={cart} />} />
    </Routes>
  )
}

export default App

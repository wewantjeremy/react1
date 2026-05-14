import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { Tracking } from './pages/Tracking';
import { NotFound } from './pages/404';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element= {<OrdersPage />}/>
      <Route path="tracking" element={<Tracking />} />
      <Route path="*" element={<NotFound />} />
    </Routes> 
  )
}

export default App

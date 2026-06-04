import axios from 'axios';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import { useEffect, useState } from 'react';
import './CheckoutHeader.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart, setCart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
            favicon.href = '/cart-favicon.png';
        }
    }, []);
    useEffect(() => {
        const fetchCheckoutData = async () => {
            const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data);
        };
        fetchCheckoutData();
    }, []);
    useEffect(() => {
    const fetchPaymentSummary = async () => {
        const response = await axios.get('/api/payment-summary')
    }
    fetchPaymentSummary()
  }, [cart])
    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type='image/png' href="/cart-favicon.png" />
            <CheckoutHeader cart={cart} />
            <div className="checkout-page">
                <div className="page-title"> {cart.length === 0 ? "Your Cart Is Empty" : "Review your order"}</div>
                <div className="checkout-grid">
                    <OrderSummary cart={cart} setCart={setCart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
                    <PaymentSummary cart={cart} loadCart={loadCart} />
                </div >
            </div >
        </>

    );
}

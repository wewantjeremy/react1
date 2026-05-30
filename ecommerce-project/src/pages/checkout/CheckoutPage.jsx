import axios from 'axios';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import { useEffect, useState } from 'react';
import './CheckoutHeader.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart, setCart, loadCart }) {

    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");

        if (favicon) {
            favicon.href = '/cart-favicon.png';
        }
    }, []);
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    console.log(cart);
console.log(deliveryOptions);
useEffect(() => {
    const fetchCheckoutData = async () => {
    const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data);
    };
    fetchCheckoutData();
}, []);
    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type='image/png' href="/cart-favicon.png" />
            <CheckoutHeader cart={cart}/>
            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    <OrderSummary cart={cart} setCart={setCart} deliveryOptions={deliveryOptions} />
                    <PaymentSummary cart={cart} loadCart={loadCart}/>
                </div >
            </div >
        </>
        
    );
}

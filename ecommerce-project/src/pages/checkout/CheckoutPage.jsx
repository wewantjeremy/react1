import axios from 'axios';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import { useEffect, useState } from 'react';
import './CheckoutHeader.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart, setCart }) {
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");

        if (favicon) {
            favicon.href = '/cart-favicon.png';
        }
    }, []);
    const [deliveryOptions, setDeliveryOptions] = useState([]);

useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
        .then((response) => {
            setDeliveryOptions(response.data);
        });
}, []);
    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type='image/png' href="/cart-favicon.png" />
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    <OrderSummary cart={cart} setCart={setCart} deliveryOptions={deliveryOptions} />
                    <PaymentSummary />
                </div >
            </div >
        </>
    );
}

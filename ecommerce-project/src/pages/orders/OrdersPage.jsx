import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { OrdersGrid } from './OrdersGrid'
import { OrderHeader } from './OrderHeader'
import axios from 'axios';
import dayjs from 'dayjs'
import './OrdersPage.css';

export function OrdersPage({ cart, loadCart }) {
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");

        if (favicon) {
            favicon.href = '/orders-favicon.png';
        }
    }, []);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrdersData = async () => {
            const response = await axios.get('/api/orders?expand=products')
            setOrders(response.data);
        };
        fetchOrdersData();
    }, []);
    return (
     <>
    <title>Orders Page</title>
    <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
            {orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">
                        <OrderHeader order={order}/>
                        <OrdersGrid order={order} loadCart={loadCart} />
                        </div>
                );
            })}
            </div>
        </div >
        </>
    );
}
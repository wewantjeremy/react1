import { Header } from '../components/Header';
import { NavLink } from 'react-router';
import './Tracking.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';

export function TrackPackage({ orderId, productId }) {

  return (
    <div className="product-actions">
      <NavLink to={`/tracking/${orderId}/${productId}`}>
        <button className="track-package-button button-secondary">
          Track package
        </button>
      </NavLink>
    </div>)
};



export function Tracking() {
  const { orderId, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");

    if (favicon) {
      favicon.href = '../tracking-favicon.png';
    }
  }, []);


  useEffect(() => {
    const loadTrackingData = async () => {
      const response = await axios.get('/api/orders?expand=products');

      const order = response.data.find(
        (order) => order.id === orderId
      );

      const orderProduct = order?.products.find(
        (product) => product.product.id === productId
      );
      setOrder(order);
      setProduct(orderProduct);
    };

    loadTrackingData();
  }, [orderId, productId]);

  if (!order || !product) {
    return <div>Loading...</div>;
  }
  const totalDeliveryTimeMs =
    product.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs =
    dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent =
    (timePassedMs / totalDeliveryTimeMs) * 100;

  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }
  const isPreparing = deliveryPercent < 33;

  const isShipped =
    deliveryPercent >= 33 &&
    deliveryPercent < 100;

  const isDelivered =
    deliveryPercent === 100;
  return (
    <>
      <title>Tracking Page</title>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo"
              src="images/logo-white.png" />
            <img className="mobile-logo"
              src="images/mobile-logo-white.png" />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>

      <div className="tracking-page">
        <div className="order-tracking">
          <NavLink className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </NavLink>

          <div className="delivery-date">
            Arriving on {dayjs(product.estimatedDeliveryTimeMs).format('MMMM D')}
          </div>

          <div className="product-info">
            {product.product.name}
          </div>

          <div className="product-info">
            Quantity: {product.quantity}
          </div>

          <img className="product-image" src={product.product.image} />
          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing ? 'current-status': ''}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped ? 'current-status': ''}`}>
              Shipped on {dayjs(order.orderTimeMs).format('MMMM D')}
            </div>
            <div className={`progress-label ${isDelivered ? 'current-status': ''}`}>
              Delivered on {dayjs(product.estimatedDeliveryTimeMs).format('MMMM D')}
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
};

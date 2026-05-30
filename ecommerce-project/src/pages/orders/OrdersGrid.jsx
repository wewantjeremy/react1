import { Fragment } from 'react';
import dayjs from 'dayjs';
import { TrackPackage } from '../Tracking'
import {addToCart} from '../../utils/cart'

export function OrdersGrid({ order, loadCart }) {
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button"
                onClick={() => {
                  addToCart(orderProduct.product.id, 1, loadCart)
                  }}>
                    <img className="buy-again-icon"
                    src="images/icons/buy-again.png" />
                Buy Again
            </button>
            </div>
            <TrackPackage
              orderId={order.id}
              productId={orderProduct.product.id}
            />
            </Fragment>
            );
          })}
          </div>
  )
};
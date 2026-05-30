import { Fragment } from 'react';
import dayjs from 'dayjs';
import { TrackPackage } from '../Tracking'

export function OrdersGrid({ order }) {
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
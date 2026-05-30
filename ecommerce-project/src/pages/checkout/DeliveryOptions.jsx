import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import axios from 'axios';

export function DeliveryOptions({
  cartItem,
  cart,
  setCart,
  deliveryOptions
}) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>

      {deliveryOptions.map((deliveryOption) => {
        let priceString = 'FREE SHIPPING';

        if (deliveryOption.priceCents > 0) {
          priceString = formatMoney(deliveryOption.priceCents);
        }

        return (
          <div key={deliveryOption.id} className="delivery-option">
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={async () => {
                await axios.put(`/api/cart-items/${cartItem.productId}`, {
                  deliveryOptionId: deliveryOption.id
                });

                const newCart = cart.map((item) => {
                  if (item.productId === cartItem.productId) {
                    return {
                      ...item,
                      deliveryOptionId: deliveryOption.id
                    };
                  }

                  return item;
                });

                setCart(newCart);
              }}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />

            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs)
                  .format('dddd, MMMM D')}
              </div>

              <div className="delivery-option-price">
                {priceString}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
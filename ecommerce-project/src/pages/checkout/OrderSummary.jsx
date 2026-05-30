import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';

export function OrderSummary({ cart, deliveryOptions, setCart }) {
    return (
       
            <div className="order-summary">
                {deliveryOptions.length > 0 && cart.map((cartItem) => {

                    return (
                    <div key={cartItem.productId} className = "cart-item-container">
                <DeliveryDate deliveryOptions={deliveryOptions}
                cartItem= {cartItem}
                />
                  <CartItemDetails
                    cart={cart}
                    setCart={setCart} 
                    cartItem={cartItem}
                    deliveryOptions={deliveryOptions}
                  />
                  </div>
            );
          })}
        </div>
  );
}
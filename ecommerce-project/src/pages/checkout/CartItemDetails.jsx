import axios from 'axios';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';
import { useState } from 'react';

export function CartItemDetails ({ cart, setCart, cartItem, deliveryOptions, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity)
  const updateQuantity = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(quantity) 
  })    
    await loadCart()
    setIsUpdating(false)
}
  const deleteCartItem = async () => {
      await axios.delete(`/api/cart-items/${cartItem.productId}`);
      const newCart = cart.filter((item) => {
        return item.productId !==cartItem.productId
      })
      setCart(newCart)
    }
  return (
    <div className="cart-item-details-grid">
  <img className="product-image"
    src={cartItem.product.image} />
  <div className="cart-item-details">
    <div className="product-name">
      {cartItem.product.name}
    </div>
    <div className="product-price">
      {formatMoney(cartItem.product.priceCents)}
    </div>

    <div className="product-quantity">
      {isUpdating ? (
      <input 
      className="cart-input" 
      value={quantity} 
      onChange={(event) => setQuantity(event.target.value)}
      onKeyDown={async (event) => {
        if (event.key === 'Enter') {
          await updateQuantity()
          }
          if (event.key === 'Escape'){
          setQuantity(cartItem.quantity)
          setIsUpdating(false)
        }
      }} 
      />
      ) : ( 
      <span>
        Quantity: <span className="quantity-label">
          {quantity}
        </span>
      </span>
      )}

      <span className="update-quantity-link link-primary"
      onClick={async () => {
        if (isUpdating) {
          await updateQuantity()
        } else {
          setIsUpdating(true)
        }
      }}
      >
        Update
      </span>
      <span className="delete-quantity-link link-primary"
      onClick= {deleteCartItem} >
        Delete
      </span>
    </div>
  </div>
  <DeliveryOptions cart={cart} setCart={setCart} cartItem={cartItem} deliveryOptions={deliveryOptions} />
</div>
  );
};

import axios from 'axios'
export async function addToCart(productId, quantity, loadCart) {
  await axios.post('/api/cart-items', {
    productId,
    quantity
  });

  await loadCart();
}
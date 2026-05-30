import dayjs from 'dayjs';

export function DeliveryDate({ deliveryOptions, cartItem }) {

   const selectedDeliveryOption = deliveryOptions.find(
        (deliveryOption) => {
            return (
                deliveryOption.id === cartItem.deliveryOptionId
            );
        })
        console.log(cartItem);
console.log(selectedDeliveryOption);
  return (
      <div className="delivery-date">
        Delivery date: {' '}
        {dayjs(
          selectedDeliveryOption.
            estimatedDeliveryTimeMs
        ).format('dddd, MMMM D')}
      </div>
    );
  };

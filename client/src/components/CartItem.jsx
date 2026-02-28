import { useState } from "react";
import { addItem } from "../services/CartService";

const CartItem = ({ item, onRemove, refreshCart }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const decreaseQty = async () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      await addItem({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: newQty,
        image: item.image,
        shopId: item.shopId
      });
      refreshCart();
    }
  };

  const increaseQty = async () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    await addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: newQty,
      image: item.image,
      shopId: item.shopId
    });
    refreshCart();
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4">

      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-xl"
      />

      {/* Product Details */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">Price: Rs {item.price}</p>

        {/* Quantity Selector */}
        <div className="flex items-center justify-center sm:justify-start mt-1 gap-2">
          <button
            onClick={decreaseQty}
            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-lg"
          >
            -
          </button>
          <span className="px-2 font-medium">{quantity}</span>
          <button
            onClick={increaseQty}
            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-lg"
          >
            +
          </button>
        </div>

        <p className="font-bold text-green-600 mt-1">
          Subtotal: Rs {item.price * quantity}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.productId)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
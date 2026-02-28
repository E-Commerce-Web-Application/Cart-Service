import { useState } from "react";
import { addItem } from "../services/cartService";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      await addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        shopId: product.shopId
      });

      alert(`Added ${quantity} item(s)`);
      setQuantity(1);
    } catch (err) {
      alert("Login required!");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-64 hover:shadow-2xl transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-xl"
      />

      <h3 className="text-lg font-semibold mt-3">
        {product.name}
      </h3>

      <p className="text-green-600 font-bold mt-1">
        Rs {product.price}
      </p>

      {/* Quantity Selector */}
      <div className="flex items-center justify-center mt-3 space-x-3">
        <button
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
        >
          -
        </button>

        <span className="text-lg font-medium">
          {quantity}
        </span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
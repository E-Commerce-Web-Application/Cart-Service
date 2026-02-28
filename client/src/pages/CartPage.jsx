import { useEffect, useState } from "react";
import { getCart, removeItem, clearCart, addItem } from "../services/CartService";
import CartItem from "../components/CartItem";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });

  const fetchCart = async () => {
    try {
      const { data } = await getCart();
      setCart(data);
    } catch (err) {
      alert("Authentication required. Add JWT token in localStorage.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    await removeItem(id);
    fetchCart();
  };

  const handleClear = async () => {
    await clearCart();
    fetchCart();
  };

  const handleAddTest = async () => {
    await addItem({
      productId: "p001",
      name: "Nike Shoes",
      price: 12000,
      quantity: 1,
      image: "https://via.placeholder.com/80",
      shopId: "shop001"
    });
    fetchCart();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Your Cart
        </h1>

        {/* Test Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleAddTest}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md transition"
          >
            Add Test Item
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white shadow-md rounded-xl p-8 text-center text-gray-500 text-lg">
            Cart is empty 🛒
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onRemove={handleRemove}
                  refreshCart={fetchCart} // Pass refresh function for quantity updates
                />
              ))}
            </div>

            {/* Total Section */}
            <div className="bg-white shadow-lg rounded-2xl p-6 mt-8 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Total Amount
              </h2>

              <span className="text-2xl font-bold text-green-600">
                Rs {cart.totalAmount}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={handleClear}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl transition"
              >
                Clear Cart
              </button>

              <button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
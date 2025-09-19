import React, { useContext } from "react";
import { ProductContext } from "../context/StoreContext"; // adjust path if needed

export default function CartPage() {
  const { cart, setCart } = useContext(ProductContext);

  // Calculate total price
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Increase quantity
  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain mr-6"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="px-3 font-medium">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="ml-4 text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">Total:</h2>
            <p className="text-xl font-semibold text-green-600">
              ${total.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

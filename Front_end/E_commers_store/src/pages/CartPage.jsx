// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import NavBar from "../compunent/Nav";
import Footer from "../compunent/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // page loading
  const [showModal, setShowModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // id/title for specific action
  const [paystack, setPaystack] = useState("");
  const navigate = useNavigate();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setCart([]);
        setTotal(0);
        setLoading(false);
        return console.warn("No token found.");
      }

      api = "https://ecommerce-zv1v.onrender.com/cart"

      const res = await axios.get(`${api}/view`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = res.data?.items ?? [];
      setCart(items);
      // prefer server total if provided, else compute locally
      const serverTotal = res.data?.cartTotal;
      if (typeof serverTotal === "number") setTotal(serverTotal);
      else {
        const computed = items.reduce(
          (s, it) => s + (it.product?.price ?? 0) * (it.quantity ?? 0),
          0
        );
        setTotal(computed);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // helper to call API and refetch, with per-action loading flag
  const withAction = async (actionFn, actionId) => {
    try {
      setActionLoading(actionId);
      await actionFn();
      await fetchCart();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const removeItem = (itemtitle) =>
    withAction(
      async () => {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token");
        await axios.delete(
          `${api}/remove/${encodeURIComponent(itemtitle)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      },
      `remove:${itemtitle}`
    );

  const increase = (itemtitle) =>
    withAction(
      async () => {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token");
        await axios.put(
          `http://localhost:3008/cart/increase/${encodeURIComponent(itemtitle)}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      },
      `increase:${itemtitle}`
    );

  const decrease = (itemtitle) =>
    withAction(
      async () => {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token");
        await axios.put(
          `http://localhost:3008/cart/decrease/${encodeURIComponent(itemtitle)}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      },
      `decrease:${itemtitle}`
    );

  const clearCart = () =>
    withAction(
      async () => {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token");
        await axios.delete("http://localhost:3008/cart/clear", {
          headers: { Authorization: `Bearer ${token}` },
        });
      },
      "clear"
    );

  const handleCheckout = () => {
    // go to checkout page — replace logic if you need to call an API first
    setShowModal(true);
  };

  // small helper for formatting
  const formatPrice = (v) =>
    typeof v === "number" ? v.toFixed(2) : Number(v ?? 0).toFixed(2);

  const confirmPayment = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token");

      const user = JSON.parse(localStorage.getItem("user"));
      const amount = Math.round(total);

      const res = await axios.post(
        "http://localhost:3008/transaction/pay",
        { amount, email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const checkoutUrl = res.data.data.data.authorization_url;
      setPaystack(checkoutUrl);
      setPaymentSuccess(true);
      console.log("Payment initialized:", checkoutUrl);
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
    } finally {
      setShowModal(false);
    }
  };






  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Your Cart</h1>

          {loading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <div className="text-gray-500">Loading cart...</div>
            </div>
          ) : cart.length === 0 ? (
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
              <p className="text-gray-600 text-lg">Your cart is empty</p>
              <button
                onClick={() => navigate("/shop")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
              >
                Browse products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Items list */}
              <section className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Items ({cart.length})</div>
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-semibold">Total: ₦{formatPrice(total)}</div>
                    <button
                      onClick={() => clearCart()}
                      disabled={actionLoading === "clear"}
                      className="ml-2 inline-flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-60"
                    >
                      {actionLoading === "clear" ? "Clearing..." : "Clear cart"}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {cart.map((item, idx) => {
                    const title = item.product?.title ?? `item-${idx}`;
                    const price = Number(item.product?.price ?? 0);
                    const subtotal = price * (item.quantity ?? 0);
                    const actionIdInc = `increase:${title}`;
                    const actionIdDec = `decrease:${title}`;
                    const actionIdRemove = `remove:${title}`;

                    return (
                      <div
                        key={item._id ?? idx}
                        className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white rounded-2xl p-4 shadow"
                      >
                        <img
                          src={item.product?.image}
                          alt={title}
                          className="w-28 h-28 object-contain rounded-md bg-gray-50 p-2"
                        />

                        <div className="flex-1 w-full">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-base font-semibold text-gray-800">{title}</h3>
                              <p className="text-sm text-gray-500 mt-1">{item.product?.category}</p>
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-gray-500">Unit</div>
                              <div className="text-lg font-semibold text-indigo-600">₦{formatPrice(price)}</div>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-4">
                            {/* quantity controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => decrease(title)}
                                disabled={actionLoading === actionIdDec || actionLoading === actionIdRemove}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-60"
                                aria-label={`Decrease quantity for ${title}`}
                              >
                                −
                              </button>

                              <div className="px-3 text-sm font-medium">{item.quantity}</div>

                              <button
                                onClick={() => increase(title)}
                                disabled={actionLoading === actionIdInc || actionLoading === actionIdRemove}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-60"
                                aria-label={`Increase quantity for ${title}`}
                              >
                                +
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="text-sm text-gray-600">Subtotal</div>
                              <div className="text-lg font-semibold">₦{formatPrice(subtotal)}</div>

                              <button
                                onClick={() => removeItem(title)}
                                disabled={actionLoading === actionIdRemove}
                                className="ml-3 inline-flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-60"
                              >
                                {actionLoading === actionIdRemove ? "Removing..." : "Remove"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Summary / checkout */}
              <aside className="lg:col-span-1">
                <div className="sticky top-6 bg-white rounded-2xl p-6 shadow">
                  <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
                  <div className="mt-4 text-sm text-gray-600 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span>Items</span>
                      <span>{cart.reduce((s, it) => s + (it.quantity ?? 0), 0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <strong>₦{formatPrice(total)}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Shipping</span>
                      <span className="text-sm text-gray-500">Calculated at checkout</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="mt-6 w-full inline-flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                  >
                    Proceed to checkout
                  </button>

                  {/* ✅ Modal */}
                  {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                          Confirm Payment
                        </h2>
                        <p className="text-gray-600 mb-6">
                          You are about to pay <strong>₦{formatPrice(total)}</strong>.
                          Do you want to continue?
                        </p>

                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={confirmPayment}
                            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"

                          >
                            Pay
                          </button>

                        </div>
                      </div>
                    </div>
                  )}
                  {paymentSuccess && paystack && (
                    <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
                      ✅ Payment initialized successfully!
                      <div className="mt-2">
                        <a
                          href={paystack}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          Proceed to Paystack
                        </a>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => navigate("/products")}
                    className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    Continue shopping
                  </button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

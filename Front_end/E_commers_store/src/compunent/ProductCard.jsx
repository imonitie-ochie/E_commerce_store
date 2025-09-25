// src/components/ProductCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductCard({ product }) {
  const { id, title, image, price, description } = product || {};
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const api = "https://e-commerce-store-576s.vercel.app/cart"
  // api ="http://localhost:3008/cart"

  const addToCart = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("User not authenticated");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${api}/add`,
        { product },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setToastVisible(true);
      window.setTimeout(() => setToastVisible(false), 2500);
    } catch (err) {
      console.error("Error adding to cart:", err);

    } finally {
      setLoading(false);
    }
  };

  // Keep toast in DOM and animate via Tailwind classes
  useEffect(() => {
    // cleanup on unmount
    return () => window.clearTimeout();
  }, []);

  return (
    <>
      <article
        className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
        aria-labelledby={`product-${id}-title`}
      >
        <Link to={`/product/${id}`} className="flex-1 flex flex-col">
          <div className="bg-gray-50 p-4 flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="max-h-48 w-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <h3
              id={`product-${id}-title`}
              className="text-base font-semibold text-gray-800 truncate"
              title={title}
            >
              {title}
            </h3>

            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {description}
            </p>
          </div>
        </Link>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-indigo-600">
              ${Number(price).toFixed(2)}
            </span>
            {/* Optional small meta (rating, badge, etc) */}
          </div>

          <button
            onClick={addToCart}
            disabled={loading}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300
              ${loading
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            aria-pressed={loading}
          >
            {loading ? "Adding..." : "Add to cart"}
          </button>
        </div>
      </article>

      {/* Toast (kept always in DOM so transition works) */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={`fixed left-1/2 bottom-6 z-50 transform -translate-x-1/2 transition-all duration-300
          ${toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}
      >
        <div className="bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <svg className="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Added to cart</span>
        </div>
      </div>
    </>
  );
}

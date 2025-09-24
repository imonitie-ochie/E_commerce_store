// src/pages/SingleProduct.jsx
import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import { ProductContext } from "../context/StoreContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "../compunent/Nav";
import axios from "axios";

export default function SingleProductFullScreen() {

  const api = "https://e-commerce-store-576s.vercel.app/cart"
  const { products = [], loading, error } = useContext(ProductContext);
  const { id } = useParams();
  const navigate = useNavigate();
  

  // find product by robust id matching
  const product = useMemo(
    () =>
      products?.find(
        (p) =>
          p?.id?.toString() === id?.toString() ||
          p?._id?.toString() === id?.toString()
      ),
    [products, id]
  );

  // Gallery state
  const images = product?.images ?? (product?.image ? [product.image] : []);
  const [activeIndex, setActiveIndex] = useState(0);

  // Purchase UI state
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product?.variants?.[0] ?? null);
  const [btnLoading, setBtnLoading] = useState(false);

  // Toast
  const [toast, setToast] = useState({ visible: false, text: "" });
  const toastTimeoutRef = useRef(null);

  // refs for keyboard navigation
  const galleryRef = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
    setQty(1);
    setVariant(product?.variants?.[0] ?? null);
  }, [product]);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setActiveIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setActiveIndex((i) => Math.min(images.length - 1, i + 1));
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [images.length]);

  // show toast helper
  const showToast = (text, ms = 2500) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToast({ visible: true, text });
    toastTimeoutRef.current = window.setTimeout(() => setToast({ visible: false, text: "" }), ms);
  };

  // axios-based add-to-cart used by both Add to cart and Buy now
  const handleAddToCart = async (opts = { buyNow: false }) => {
    if (!product) return;
    setBtnLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        showToast("You must be signed in to add to cart", 3000);
        setBtnLoading(false);
        return;
      }

      const payload = {
        product,
        qty,
        variant: variant ?? null,
      };

      // direct axios POST to your endpoint
      const res = await axios.post(`${api}/add`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const message = res?.data?.message ?? "Added to cart";
      showToast(message, 2500);

      // If user clicked Buy now, navigate to checkout (SPA)
      if (opts.buyNow) {
        navigate("/checkout");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      // try to get useful message
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to add to cart. Try again.";
      showToast(msg, 3500);
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading product…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <p className="text-gray-600">We couldn't find that product — try browsing other items.</p>
        <Link to="/products" className="mt-3 inline-block px-5 py-3 bg-indigo-600 text-white rounded-md">Back to products</Link>
      </div>
    );
  }

  const inStock = product.stock == null || product.stock > 0;
  const price = Number(product.price ?? 0);

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Gallery (left: large) */}
            <section
              tabIndex={0}
              ref={galleryRef}
              className="lg:col-span-7 bg-white rounded-2xl shadow-sm p-4 lg:p-6 flex flex-col"
              aria-label="Product gallery"
            >
              <div className="w-full h-[520px] flex items-center justify-center rounded-xl bg-gray-100 overflow-hidden">
                {images?.length ? (
                  <img
                    src={images[activeIndex]}
                    alt={`${product.title} - image ${activeIndex + 1}`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">No image available</div>
                )}
              </div>

              {/* thumbnails */}
              {images?.length > 1 && (
                <div className="mt-4 flex items-center gap-3 overflow-x-auto py-2">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      aria-label={`Show image ${i + 1}`}
                      onClick={() => setActiveIndex(i)}
                      className={`flex-none w-20 h-20 rounded-lg overflow-hidden border transition ${
                        i === activeIndex ? "ring-2 ring-indigo-500 border-transparent" : "border-gray-200"
                      }`}
                    >
                      <img src={src} alt={`thumb ${i + 1}`} className="w-full h-full object-contain" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}

              {/* product features & description */}
              <div className="mt-6 prose prose-sm max-w-none text-gray-700">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-600">{product.subtitle ?? ""}</p>
                <div className="mt-4">
                  <h3 className="font-medium text-gray-800">Product details</h3>
                  <p className="mt-2 text-sm leading-relaxed">{product.description}</p>
                </div>

                {product.features?.length ? (
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {product.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-600">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>

            {/* Sticky right panel (checkout/details) */}
            <aside className="lg:col-span-5">
              <div className="sticky top-6">
                <div className="bg-white rounded-2xl shadow p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-extrabold text-gray-900">{product.title}</h1>
                      <p className="text-sm text-gray-500 mt-1">{product.brand ?? product.seller}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold text-indigo-600">₦{price.toFixed(2)}</div>
                      <div className={`mt-1 text-sm ${inStock ? "text-green-600" : "text-red-500"}`}>{inStock ? "In stock" : "Out of stock"}</div>
                    </div>
                  </div>

                  {/* variants */}
                  {product.variants?.length > 0 && (
                    <div className="mt-4">
                      <label className="block text-sm text-gray-600 mb-2">Options</label>
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((v, idx) => (
                          <button
                            key={idx}
                            onClick={() => setVariant(v)}
                            className={`px-3 py-2 text-sm rounded-md border transition ${
                              variant === v ? "bg-indigo-600 text-white border-transparent" : "bg-white text-gray-700 border-gray-200"
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* quantity + CTA */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                        className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <div className="px-4 py-2 w-14 text-center font-medium">{qty}</div>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        aria-label="Increase quantity"
                        className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddToCart({ buyNow: false })}
                      disabled={!inStock || btnLoading}
                      className={`flex-1 inline-flex justify-center items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                        !inStock ? "bg-gray-300 text-gray-600 cursor-not-allowed" : btnLoading ? "bg-indigo-300 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {btnLoading ? "Adding..." : "Add to cart"}
                    </button>
                  </div>

                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => handleAddToCart({ buyNow: true })}
                      disabled={!inStock || btnLoading}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-200 text-sm hover:shadow"
                    >
                      Buy now
                    </button>

                    <button className="px-3 py-2 rounded-md border border-gray-200 text-sm hover:bg-gray-50">
                      Save
                    </button>
                  </div>

                  {/* promo / subtotal */}
                  <div className="mt-4 border-t pt-4 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <strong>₦{(price * qty).toFixed(2)}</strong>
                    </div>
                    <div className="mt-3">
                      <input placeholder="Promo code" className="w-full rounded-md border-gray-200 px-3 py-2 text-sm" />
                      <button className="mt-2 w-full inline-flex justify-center items-center px-3 py-2 rounded-md bg-gray-100 text-sm">Apply</button>
                    </div>
                  </div>
                </div>

                {/* Reviews & related (secondary) */}
                <div className="mt-6">
                  <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold">Customer reviews</h3>
                    <div className="mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="text-yellow-400">★★★★★</div>
                        <div className="text-gray-500">4.7 • 132 reviews</div>
                      </div>
                      <p className="mt-3 text-sm text-gray-500">Top review: "Great quality — would buy again!"</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="bg-white rounded-2xl shadow p-6">
                      <h4 className="font-semibold mb-2">You might also like</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Placeholder related product cards */}
                        <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-600">Product A</div>
                        <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-600">Product B</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Toast */}
      <div
        aria-live="polite"
        className={`fixed left-1/2 bottom-6 z-50 transform -translate-x-1/2 transition-all duration-300 ${
          toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <svg className="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{toast.text}</span>
        </div>
      </div>
    </>
  );
}

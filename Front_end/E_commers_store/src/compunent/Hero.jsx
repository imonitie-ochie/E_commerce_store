// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white"
      aria-label="Promotional hero"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm p-8 md:p-12 lg:p-16">
          {/* Decorative SVG shapes */}
          <svg
            className="absolute -right-10 -top-10 w-48 h-48 opacity-20 pointer-events-none"
            viewBox="0 0 200 200"
            aria-hidden
          >
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
                <stop offset="1" stopColor="#a78bfa" stopOpacity="0.06" />
              </linearGradient>
            </defs>
            <path
              fill="url(#g1)"
              d="M43.3,-55.6C55.3,-46.2,63.7,-33.3,68.1,-19.8C72.6,-6.3,73.1,8,68.6,20.6C64.1,33.2,54.5,44.1,42,51.9C29.5,59.7,14.8,64.3,-0.6,65.1C-16,65.9,-31.9,62.9,-46.1,55.8C-60.3,48.7,-72.9,37.4,-77.4,23.8C-82,10.2,-78.5,-6.9,-70.4,-22.1C-62.3,-37.3,-49.7,-50.6,-35,-59.6C-20.2,-68.7,-10.1,-73.6,2.7,-76.1C15.4,-78.7,30.9,-78.9,43.3,-55.6Z"
              transform="translate(100 100)"
            />
          </svg>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: text content */}
            <div className="text-center md:text-left">
              <p className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                New arrivals · curated picks
              </p>

              <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Elevate your everyday
              </h1>

              <p className="mt-4 max-w-xl text-white/90 text-base sm:text-lg">
                Discover timeless pieces crafted for comfort and style — effortless
                staples that work for every part of your day.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 justify-center md:justify-start">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold bg-white text-indigo-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                >
                  Shop Now
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-white/90 bg-white/10 hover:bg-white/20 transition"
                >
                  contact us
                </Link>
              </div>

              {/* Feature chips */}
              <ul className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                <li className="flex items-center gap-2 bg-white/6 px-3 py-2 rounded-lg text-sm">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Free shipping over $50
                </li>
                <li className="flex items-center gap-2 bg-white/6 px-3 py-2 rounded-lg text-sm">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Easy 30-day returns
                </li>
                <li className="flex items-center gap-2 bg-white/6 px-3 py-2 rounded-lg text-sm">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                  Curated quality
                </li>
              </ul>
            </div>

            {/* Right: decorated CTA / stats block (no external image) */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md bg-white/6 rounded-2xl p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/90 font-medium">Best Sellers</div>
                      <div className="text-lg font-bold text-white">$29 - $199</div>
                    </div>
                    <div className="inline-flex items-center justify-center bg-white/10 px-3 py-2 rounded-lg text-sm">
                      Trending
                    </div>
                  </div>

                  <div className="rounded-lg bg-white/8 p-3">
                    <div className="h-28 flex items-center justify-center text-sm text-white/80">
                      Featured product preview (no image)
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to="/shop"
                      className="flex-1 inline-flex items-center justify-center rounded-md px-4 py-2 bg-white text-indigo-700 font-semibold hover:bg-white/90 transition"
                    >
                      Shop best sellers
                    </Link>
                    <button
                      className="px-3 py-2 rounded-md bg-transparent border border-white/20 text-sm hover:bg-white/5 transition"
                      aria-label="See details"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>
  );
}

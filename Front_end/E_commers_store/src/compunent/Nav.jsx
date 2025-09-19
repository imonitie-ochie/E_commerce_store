// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";


function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/">Beep</Link>
      </div>

      <button
        className="navbar__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul className={`navbar__links ${isOpen ? "navbar__links--open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" onClick={() => setIsOpen(false)}>
            Shop
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </li>
        <li>
          <Link to="/shopping_cart" onClick={() => setIsOpen(false)}>
            🛒
          </Link>
          </li>
      </ul>
    </nav>
  );
}

export default NavBar;

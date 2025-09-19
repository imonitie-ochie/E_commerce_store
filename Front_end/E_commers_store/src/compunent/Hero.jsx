import React from "react";

import { Link } from "react-router-dom";



function Hero() {
  return (
    <div className="hero">
      <div className="hero__container">
        <div className="hero__image-wrap">
          <img
            src={
              "https://previews.123rf.com/images/antonioguillem/antonioguillem1611/antonioguillem161100137/66439922-happy-shopper-wearing-red-coat-showing-blank-colorful-shopping-bags-and-pointing-you-in-the-street.jpg"
            }
            alt="Happy shopper holding shopping bags"
            className="hero__image"
          />
        </div>

        <div className="hero__content">
          <h1 className="hero__title">Elevate Your Everyday</h1>
          <p className="hero__lead">Discover timeless pieces for every occasion.</p>
          <Link className="hero__button" to="/Shop">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
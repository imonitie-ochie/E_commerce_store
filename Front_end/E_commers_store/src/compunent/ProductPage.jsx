import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/StoreContext";

const SingleProduct = ({ productId }) => {
  const { products, loading, error, addToCart } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  // Find product from context instead of refetching
  // useEffect(() => {
  //   if (products.length > 0) {
  //     const foundProduct = products.find((p) => p.id === Number(productId));
  //     setProduct(foundProduct);
  //   }
  // }, [products, productId]);

  // const handleAddToCart = async () => {
  //   if (!product) return;
  //   const result = await addToCart(product.id);
  //   setCartMessage(result.message);
  // };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="product_card">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="150" />
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <h3>
        <span>₦</span>
        {product.price}
      </h3>

      <button onClick={handleAddToCart} style={{ marginTop: "10px" }}>
        🛒 Add to Cart
      </button>

      {cartMessage && <p>{cartMessage}</p>}
    </div>
  );
};

export default SingleProduct;

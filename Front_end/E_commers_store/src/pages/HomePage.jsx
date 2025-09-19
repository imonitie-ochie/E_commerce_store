import React, { useContext } from 'react'
import Hero from '../compunent/Hero'
import ProductCard from '../compunent/ProductCard' 
import NavBar from '../compunent/Nav'
import { ProductContext } from '../context/StoreContext'
import Footer from '../compunent/Footer'

const HomePage = () => {
  const { products, loading, error } = useContext(ProductContext)

  if (loading) return <p>Loading products...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <NavBar />
      <Hero />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      <Footer/>
    </>
  )
}

export default HomePage

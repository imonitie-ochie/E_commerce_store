import React from 'react'
import NavBar from '../compunent/Nav'
import { useContext } from 'react'
import { ProductContext } from '../context/StoreContext'
import ProductCard from '../compunent/ProductCard'
import Footer from '../compunent/Footer'

const Shop = () => {
  const { products } = useContext(ProductContext)
  console.log(products)


  // Male Category
  const Men = products.filter((menproduct) => {
    return menproduct.category === "men's clothing";
  });

  // Female Category
  const Women = products.filter((womenproduct) => {
    return womenproduct.category === "women's clothing";
  });

  // Electronics
  const Electronics = products.filter((electronicsproduct) => {
    return electronicsproduct.category === "electronics";
  });

  // Jewelery
  const Jewelery = products.filter((jeweleryproduct) => {
    return jeweleryproduct.category === "jewelery";
  });


  return (
    <>
      <NavBar />
      <div >


        <div class="flex items-center w-full my-6">
  <div class="flex-grow border-t border-gray-300"></div>
  <span class="px-4 text-gray-500 font-bold">men</span>
  <div class="flex-grow border-t border-gray-300"></div>
</div>
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
        {Men.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
</div>
<div class="flex items-center w-full my-6">
  <div class="flex-grow border-t border-gray-300"></div>
  <span class="px-4 text-gray-500 font-bold">Women</span>
  <div class="flex-grow border-t border-gray-300"></div>
</div>

<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
        {Women.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
        </div>

        <div class="flex items-center w-full my-6">
  <div class="flex-grow border-t border-gray-300"></div>
  <span class="px-4 text-gray-500 font-bold">Electronics</span>
  <div class="flex-grow border-t border-gray-300"></div>
</div>

<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>

        {Electronics.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
</div>
        <div class="flex items-center w-full my-6">
  <div class="flex-grow border-t border-gray-300"></div>
  <span class="px-4 text-gray-500 font-bold">Jewelery</span>
  <div class="flex-grow border-t border-gray-300"></div>
</div>

<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
        {Jewelery.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}


        </div>
        {/*<h1>SHOP PAGE</h1>*/}



      </div>
      <Footer/>
    </>
  )
}

export default Shop
import React from 'react'

const ProductCard = ({ product }) => {
  const { title, image, price, description } = product

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <img 
        src={image} 
        alt={title} 
        className="h-56 w-full object-contain p-4"
      />

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-blue-600">${price}</span>
          <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

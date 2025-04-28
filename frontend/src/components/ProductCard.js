import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
      {/* Product Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={`https://placehold.co/400x300/e2e8f0/1e40af?text=${encodeURIComponent(product.name.split(' ')[0])}`}
          alt={product.name}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 h-10 overflow-hidden">{product.description}</p>
        
        {/* Price and Categories */}
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-xl text-gray-800">${product.price.toFixed(2)}</span>
          
          <div className="flex flex-wrap gap-1">
            {product.categories && product.categories.slice(0, 2).map((category, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {category}
              </span>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-4 flex justify-between">
          <Link 
            to={`/product/${product._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition-colors"
          >
            View Details
          </Link>
          <button
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 text-sm transition-colors"
            onClick={() => alert('Add to cart feature coming soon!')}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
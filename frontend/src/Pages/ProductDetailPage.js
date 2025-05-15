import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function ProductDetailPage() {
  const { productId } = useParams();
  const { token, user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [styleMatch, setStyleMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Determine which endpoint to use based on authentication
        const endpoint = token 
          ? `http://localhost:5000/api/products/${productId}/with-style-match`
          : `http://localhost:5000/api/products/${productId}`;
        
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.get(endpoint, { headers });
        
        if (token) {
          setProduct(response.data.product);
          setStyleMatch(response.data.style_match);
        } else {
          setProduct(response.data.product);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchProduct();
  }, [productId, token]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: show a success message
    alert(`Added ${quantity} of ${product.name} to cart`);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Product not found'}
        </div>
        <button 
          onClick={() => navigate('/shop')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Shop
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={`https://placehold.co/600x400/e2e8f0/1e40af?text=${encodeURIComponent(product.name.split(' ')[0])}`}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2">
          {/* Style Match Indicator (if available) */}
          {styleMatch && styleMatch.has_style_profile && (
            <div className={`mb-4 p-3 rounded-lg ${
              styleMatch.match_score > 75 ? 'bg-green-100 text-green-800' :
              styleMatch.match_score > 50 ? 'bg-blue-100 text-blue-800' :
              styleMatch.match_score > 25 ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-medium">Style Match</span>
                <span className="font-bold">{styleMatch.match_score}%</span>
              </div>
              {styleMatch.match_reasons.length > 0 && (
                <ul className="mt-2 text-sm">
                  {styleMatch.match_reasons.map((reason, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {reason}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          
          {/* Product Name and Price */}
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mt-2">${product.price.toFixed(2)}</p>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {product.categories && product.categories.map((category, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {category}
              </span>
            ))}
          </div>
          
          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>
          
          {/* Attributes */}
          {product.attributes && Object.keys(product.attributes).length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Details</h2>
              <ul className="mt-2 space-y-1">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <li key={key} className="flex">
                    <span className="font-medium w-24 capitalize">{key}:</span>
                    <span className="text-gray-600 capitalize">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Quantity Selector */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <div className="flex items-center">
              <button 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="bg-gray-200 px-3 py-1 rounded-l"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center border-t border-b border-gray-200 py-1"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded-r"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add to Cart
          </button>
          
          {/* Back to Shop */}
          <button
            onClick={() => navigate('/shop')}
            className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">PersonaShop</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/shop" className="hover:underline">Shop</Link>
          
          {/* Cart Link with Counter */}
          <Link to="/cart" className="hover:underline relative">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <button 
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link 
                to="/register" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
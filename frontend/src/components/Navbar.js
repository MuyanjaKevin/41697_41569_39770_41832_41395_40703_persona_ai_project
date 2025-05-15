import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Logo/Brand */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            PERSONA
          </Link>

          {/* Right side - Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/shop" className="hover:underline">
              Shop
            </Link>
            
            {user ? (
              <>
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
                <Link to="/cart" className="hover:underline relative">
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={logout}
                  className="hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
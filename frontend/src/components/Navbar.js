import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">PersonaShop</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/shop" className="hover:underline">Shop</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
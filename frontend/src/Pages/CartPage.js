import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../context/CartContext';
 
function CartPage() {

  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {

    if (newQuantity >= 1) {

      updateQuantity(productId, newQuantity);

    }

  };

  if (cartItems.length === 0) {

    return (
<div className="container mx-auto px-4 py-8">
<h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
<div className="bg-gray-100 p-8 rounded-lg text-center">
<h2 className="text-xl font-medium text-gray-700">Your cart is empty</h2>
<p className="text-gray-500 mt-2">Add some products to your cart and they will appear here</p>
<button

            onClick={() => navigate('/shop')}

            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>

            Browse Products
</button>
</div>
</div>

    );

  }

  return (
<div className="container mx-auto px-4 py-8">
<h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
<div className="flex flex-col lg:flex-row gap-8">

        {/* Cart Items */}
<div className="lg:w-2/3">
<div className="bg-white rounded-lg shadow overflow-hidden">
<div className="p-4 border-b">
<h2 className="text-lg font-semibold">Cart Items ({cartItems.length})</h2>
</div>
<ul className="divide-y divide-gray-200">

              {cartItems.map(item => (
<li key={item._id} className="p-4 flex flex-col sm:flex-row">

                  {/* Product Image */}
<div className="sm:w-24 h-24 bg-gray-100 rounded overflow-hidden mb-4 sm:mb-0">
<img 

                      src={`https://placehold.co/200x200/e2e8f0/1e40af?text=${encodeURIComponent(item.name.split(' ')[0])}`}

                      alt={item.name}

                      className="w-full h-full object-cover"

                    />
</div>

                  {/* Product Details */}
<div className="sm:ml-4 flex-grow">
<div className="flex justify-between mb-2">
<h3 className="font-medium">
<Link to={`/product/${item._id}`} className="hover:text-blue-600">

                          {item.name}
</Link>
</h3>
<span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
</div>
<p className="text-sm text-gray-500 mb-4 line-clamp-1">{item.description}</p>
<div className="flex justify-between items-center">

                      {/* Quantity Selector */}
<div className="flex items-center">
<button 

                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}

                          className="bg-gray-200 px-2 py-1 rounded-l"
>

                          -
</button>
<span className="w-10 text-center border-t border-b border-gray-200 py-1">

                          {item.quantity}
</span>
<button 

                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}

                          className="bg-gray-200 px-2 py-1 rounded-r"
>

                          +
</button>
</div>

                      {/* Remove Button */}
<button

                        onClick={() => removeFromCart(item._id)}

                        className="text-red-600 hover:text-red-800 text-sm"
>

                        Remove
</button>
</div>
</div>
</li>

              ))}
</ul>

            {/* Cart Actions */}
<div className="p-4 border-t flex justify-between">
<button

                onClick={clearCart}

                className="text-red-600 hover:text-red-800"
>

                Clear Cart
</button>
<button

                onClick={() => navigate('/shop')}

                className="text-blue-600 hover:text-blue-800"
>

                Continue Shopping
</button>
</div>
</div>
</div>

        {/* Order Summary */}
<div className="lg:w-1/3">
<div className="bg-white rounded-lg shadow overflow-hidden">
<div className="p-4 border-b">
<h2 className="text-lg font-semibold">Order Summary</h2>
</div>
<div className="p-4">
<div className="space-y-3">
<div className="flex justify-between">
<span>Subtotal</span>
<span>${getTotalPrice().toFixed(2)}</span>
</div>
<div className="flex justify-between">
<span>Shipping</span>
<span>Free</span>
</div>
<div className="border-t pt-3 font-bold flex justify-between">
<span>Total</span>
<span>${getTotalPrice().toFixed(2)}</span>
</div>
</div>
<button

                onClick={() => navigate('/checkout')}

                className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>

                Proceed to Checkout
</button>
</div>
</div>
</div>
</div>
</div>

  );

}
 
export default CartPage;
 
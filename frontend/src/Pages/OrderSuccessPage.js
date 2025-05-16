import React from 'react';
import { Link } from 'react-router-dom';

function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <svg className="mx-auto h-24 w-24 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      
      <h1 className="mt-4 text-3xl font-bold text-gray-900">Order Successful!</h1>
      <p className="mt-2 text-lg text-gray-600">Thank you for your purchase.</p>
      <p className="text-gray-500">Your order has been placed and will be processed soon.</p>
      
      <div className="mt-8 flex justify-center space-x-4">
        <Link 
          to="/"
          className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Home
        </Link>
        <Link 
          to="/shop"
          className="px-5 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
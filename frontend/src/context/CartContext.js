import React, { createContext, useState, useContext, useEffect } from 'react';
 
// Create context

const CartContext = createContext();
 
export const CartProvider = ({ children }) => {

  // Initialize cart from localStorage or empty array

  const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];

  });

  // Update localStorage whenever cart changes

  useEffect(() => {

    localStorage.setItem('cart', JSON.stringify(cartItems));

  }, [cartItems]);

  // Add item to cart

  const addToCart = (product, quantity = 1) => {

    setCartItems(prevItems => {

      // Check if item already exists in cart

      const existingItemIndex = prevItems.findIndex(item => item._id === product._id);

      if (existingItemIndex !== -1) {

        // Update quantity of existing item

        const updatedItems = [...prevItems];

        updatedItems[existingItemIndex] = {

          ...updatedItems[existingItemIndex],

          quantity: updatedItems[existingItemIndex].quantity + quantity

        };

        return updatedItems;

      } else {

        // Add new item to cart

        return [...prevItems, { ...product, quantity }];

      }

    });

  };

  // Remove item from cart

  const removeFromCart = (productId) => {

    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));

  };

  // Update item quantity

  const updateQuantity = (productId, quantity) => {

    if (quantity <= 0) {

      removeFromCart(productId);

      return;

    }

    setCartItems(prevItems => 

      prevItems.map(item => 

        item._id === productId ? { ...item, quantity } : item

      )

    );

  };

  // Clear cart

  const clearCart = () => {

    setCartItems([]);

  };

  // Calculate total price

  const getTotalPrice = () => {

    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  };

  // Get cart item count

  const getCartCount = () => {

    return cartItems.reduce((count, item) => count + item.quantity, 0);

  };

  return (
<CartContext.Provider value={{

      cartItems,

      addToCart,

      removeFromCart,

      updateQuantity,

      clearCart,

      getTotalPrice,

      getCartCount

    }}>

      {children}
</CartContext.Provider>

  );

};
 
// Custom hook for using cart context

export const useCart = () => useContext(CartContext);
 
export default CartContext;
 
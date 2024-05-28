import { createContext, useState, useEffect } from 'react';

import { CartContextType, ProviderProps, CartItem } from '../types';

const CartContext = createContext<CartContextType>({
  cartQuantity: 0,
  setCartQuantity: () => {},
});

export const CartProvider = ({ children }: ProviderProps) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const items: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartQuantity(items.length);
  }, []);

  return (
    <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

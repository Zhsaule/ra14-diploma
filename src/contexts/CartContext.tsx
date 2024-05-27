import { createContext, useState } from 'react';

import { CartContextType, ProviderProps } from '../types';

const CartContext = createContext<CartContextType>({
  cartQuantity: 0,
  setCartQuantity: () => {},
});

export const CartProvider = ({ children }: ProviderProps) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  return (
    <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

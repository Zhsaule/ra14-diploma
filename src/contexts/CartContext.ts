import { createContext, Dispatch, SetStateAction } from 'react';

interface CartContextType {
  cartQuantity: number;
  setCartQuantity: Dispatch<SetStateAction<number>>;

}

const CartContext = createContext<CartContextType>({
  cartQuantity: 0,
  setCartQuantity: () => {},
});

export default CartContext;

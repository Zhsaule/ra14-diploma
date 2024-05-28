import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../contexts/CartContext';
import { CartItem } from '../types';

const Cart = () => {
  const { cartQuantity, setCartQuantity } = useContext(CartContext);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const items: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, [cartQuantity]);

  const handleRemove = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartQuantity(updatedCart.length);
  };

  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className='cart'>
      <h2 className="text-center">Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td><Link to={`/product/${item.id}`}>{item.title}</Link></td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price} руб.</td>
                  <td>{item.price * item.quantity} руб.</td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemove(index)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-right">
                  Общая стоимость:
                </td>
                <td>{totalCost} руб.</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </section>
  );
};

export default Cart;

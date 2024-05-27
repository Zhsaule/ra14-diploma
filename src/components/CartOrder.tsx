import { useContext, useState, FormEvent } from 'react';
import axios from 'axios';

import { CartItem } from '../types';
import CartContext from '../contexts/CartContext';

const CartOrder = () => {
  const { setCartQuantity } = useContext(CartContext);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]').map((item: CartItem) => ({
      id: item.id,
      price: item.price,
      count: item.quantity,
    }));

    const order = {
      owner: {
        phone,
        address,
      },
      items: cartItems,
    };

    try {
      await axios.post('http://localhost:7070/api/order', order);
      setSuccess(true);
      localStorage.removeItem('cart');
      setCartQuantity(0);
    } catch (err) {
      setError('Ошибка при оформлении заказа. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='order'>
      <h2 className="text-center">Оформить заказ</h2>
      <div className='card' style={{ maxWidth: '30rem', margin: '0 auto' }}>
        {success ? (
          <p>Ваш заказ успешно оформлен!</p>
        ) : (
          <form className='card-body' onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className='form-group'>
              <label htmlFor='phone'>Телефон</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agree" required />
              <label className="form-check-label" htmlFor="agree">
                Согласен с правилами доставки
              </label>
            </div>
            <button type="submit" className="btn btn-outline-secondary" disabled={loading}>
              {loading ? 'Оформление...' : 'Оформить'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default CartOrder;

import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import CartContext from '../contexts/CartContext';
import { CartItem, ItemData } from '../types';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setCartQuantity } = useContext(CartContext);
  const [item, setItem] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:7070/api/items/${id}`)
        .then((response) => {
          setItem(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading item data:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize && item) {
      const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
      const itemInCart = cart.find(
        (cartItem) => cartItem.id === item.id && cartItem.size === selectedSize,
      );

      if (itemInCart) {
        itemInCart.quantity += quantity;
      } else {
        cart.push({
          id: item.id,
          title: item.title,
          size: selectedSize,
          quantity,
          price: item.price,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      setCartQuantity(cart.length); // Устанавливаем количество уникальных позиций
      // console.log(cart.length);
      navigate('/cart');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Error loading item data.</div>;
  }

  const availableSizes = item.sizes.filter((size) => size.available);

  return (
    <section className="catalog-item">
      <h2 className="text-center">{item.title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={item.images[0]} className="img-fluid" alt={item.title} />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{item.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{item.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{item.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{item.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{item.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{item.reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>Размеры в наличии
              {availableSizes.map((size) => (
                <span
                  key={size.size}
                  onClick={() => handleSizeSelect(size.size)}
                  className={`catalog-item-size ${size.size === selectedSize ? 'selected' : ''}`}
                >
                  {size.size}
                </span>
              ))}
            </p>
            <p>Количество:
              <span className="btn-group btn-group-sm pl-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="btn btn-outline-primary">{quantity}</span>
                <button
                  className="btn btn-secondary"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  +
                </button>
              </span>
            </p>
          </div>
          {availableSizes.length > 0 && (
            <button
              className="btn btn-danger btn-block btn-lg"
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Product;

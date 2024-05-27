import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../contexts/CartContext';

function HeaderCartPic() {
  const { cartQuantity } = useContext(CartContext);

  return (
    <Link to="/cart">
      <div className="header-controls-pic header-controls-cart">
        { (cartQuantity > 0) && <div className="header-controls-cart-full">{cartQuantity}</div> }
      </div>
    </Link>
  );
}

export default HeaderCartPic;

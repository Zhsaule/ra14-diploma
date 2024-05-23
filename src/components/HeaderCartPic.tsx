import { Link } from "react-router-dom";

const HeaderCartPic = () => {
  const cartCount: number = 0;

  return (
    <Link to="/cart" >
    <div className="header-controls-pic header-controls-cart">
      { (cartCount > 0) && <div className="header-controls-cart-full">{cartCount}</div> }
    </div>
    </Link>
  );
}

export default HeaderCartPic;

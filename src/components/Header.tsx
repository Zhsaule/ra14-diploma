import { Link } from 'react-router-dom';

import HeaderCartPic from './HeaderCartPic';
import Nav from './HeaderNav';
import HeaderSearchPic from './HeaderSearchPic';

import Logo from '../img/header-logo.png';

function Header() {
  return (
    <header className='container'>
      <div className='row'>
        <div className='col'>
          <nav className='navbar navbar-expand-sm navbar-light bg-light'>
            <Link to='/'><img className='navbar-brand' src={Logo} alt='Bosa Noga' /></Link>
            <div className='collapase navbar-collapse' id='navbarMain'>
              <Nav />
              <div>
                <div className='header-controls-pics'>
                  <HeaderSearchPic />
                  <HeaderCartPic />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

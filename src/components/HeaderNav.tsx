import { NavLink } from 'react-router-dom';

const menu = [
  {link:"/", name:"Главная"},
  {link:"/catalog", name:"Каталог"},
  {link:"/about", name:"О магазине"},
  {link:"/contacts", name:"Контакты"}
];

const Nav = () => {
  const activeLink = ({ isActive }: { isActive: boolean }) => (
    isActive ? "nav-link active" : "nav-link"
  );

  return (
    <ul className="navbar-nav mr-auto">
    {menu.map((item, index) =>
      <NavLink className={activeLink} key={index} to={item.link} >
        <li className="nav-item">
          {item.name}
        </li>
      </NavLink>
    )}
  </ul>
  );
}

export default Nav;

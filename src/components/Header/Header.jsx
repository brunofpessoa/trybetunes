import React from 'react';
import { FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../img/logo-white.png';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return !user.name ? <Loading /> : (
      <header data-testid="header-component">
        <div className={ styles.top_section }>
          <img className={ styles.logo } src={ logo } alt="Logo do trybetunes" />
          <div className={ styles.profile }>
            <FaUser className={ styles.profile_image } />
            <span
              className={ styles.profile_name }
              data-testid="header-user-name"
            >
              { user.name }
            </span>
          </div>
        </div>
        <nav>
          <ul className={ styles.nav_list }>
            <li className={ styles.list_item }>
              <NavLink
                to="/search"
                data-testid="link-to-search"
                className={ (isActive) => (isActive ? styles.active : styles.inactive) }
              >
                Pesquisar
              </NavLink>
            </li>
            <li className={ styles.list_item }>
              <NavLink
                to="/favorites"
                data-testid="link-to-favorites"
                className={ (isActive) => (isActive ? styles.active : styles.inactive) }
              >
                Favoritas
              </NavLink>
            </li>
            <li className={ styles.list_item }>
              <NavLink
                to="/profile"
                data-testid="link-to-profile"
                className={ (isActive) => (isActive ? styles.active : styles.inactive) }
              >
                Perfil
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;

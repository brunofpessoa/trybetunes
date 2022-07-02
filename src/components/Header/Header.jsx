import React from 'react';
import { FaUser } from 'react-icons/fa';
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

  componentDidMount() {
    getUser()
      .then((res) => this.setState({ user: res }));
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
      </header>
    );
  }
}

export default Header;

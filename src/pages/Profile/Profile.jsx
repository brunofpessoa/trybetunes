import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Header from '../../components/Header/Header';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import styles from './Profile.module.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: true,
    };
  }

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({ user, loading: false });
  };

  render() {
    const { user: { name, email, image, description }, loading } = this.state;
    return (
      <div data-testid="page-profile" className={ styles.main }>
        <Header />
        {loading ? <Loading /> : (
          <main className={ styles.profile }>
            <div className={ styles.edit }>
              { image ? <img
                src={ image }
                alt={ name }
                data-testid="profile-image"
                className={ styles.image }
              /> : (
                <FaUser className={ styles.profile_image } />
              )}
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
            <span>Nome:</span>
            <p>{name}</p>
            <hr />
            <span>E-mail:</span>
            <p>{email}</p>
            <hr />
            <span>Descrição:</span>
            <p>{description}</p>
            <hr />
          </main>
        )}
      </div>
    );
  }
}

export default Profile;

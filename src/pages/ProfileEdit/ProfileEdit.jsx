import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import Input from '../../components/Form/Input';
import SubmitButton from '../../components/Form/Button';
import styles from './ProfileEdit.module.css';

class ProfileEdit extends React.Component {
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

  handleChange = ({ target }) => {
    const { user } = this.state;
    this.setState({ user: {
      ...user, [target.name]: target.value,
    } });
  };

  handleClick = () => {
    const { user } = this.state;
    updateUser(user);
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const { user, user: { name, email, image, description }, loading } = this.state;
    return (
      <div data-testid="page-profile-edit" className={ styles.main }>
        <Header />
        {
          loading ? <Loading /> : (
            <form className={ styles.form }>
              <p>Edite Seu Perfil</p>
              <Input
                testId="edit-input-name"
                value={ name }
                type="text"
                text="Nome:"
                name="name"
                handleOnChange={ this.handleChange }
                placeholder="usuário"
              />
              <Input
                testId="edit-input-email"
                value={ email }
                type="text"
                text="E-mail:"
                name="email"
                handleOnChange={ this.handleChange }
                placeholder="usuario@usuario.com.br"
              />
              <Input
                testId="edit-input-description"
                value={ description }
                type="text"
                text="Descrição:"
                name="description"
                handleOnChange={ this.handleChange }
                placeholder="Sobre mim"
              />
              <Input
                testId="edit-input-image"
                value={ image }
                type="text"
                text="Imagem:"
                name="image"
                handleOnChange={ this.handleChange }
                placeholder="Url da imagem"
              />
              <SubmitButton
                testId="edit-button-save"
                text="Salvar"
                disabled={ Object.values(user).some((value) => value === '') }
                handleClick={ this.handleClick }
              />
            </form>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default ProfileEdit;

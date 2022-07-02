import React from 'react';
import PropTypes from 'prop-types';
import SubmitButton from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import Loading from '../../components/Loading/Loading';
import styles from './Login.module.css';
import logo from '../../img/logo.png';
import { createUser } from '../../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ loginName: target.value });
  };

  shouldButtonBeDisabled = () => {
    const { loginName } = this.state;
    const minLength = 3;
    return loginName.length < minLength;
  };

  handleClick = async (path) => {
    this.setState({ loading: true });
    const { loginName } = this.state;
    await createUser({ name: loginName });
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { loading } = this.state;

    return loading ? <Loading /> : (
      <div data-testid="page-login" className={ styles.main }>
        <img src={ logo } alt="Trybetunes" />
        <form className={ styles.form_control }>
          <Input
            type="text"
            text="Login"
            name="userName"
            placeholder="Nome"
            handleOnChange={ this.handleChange }
            testId="login-name-input"
          />
          <SubmitButton
            text="Entrar"
            handleClick={ () => { this.handleClick('/search'); } }
            testId="login-submit-button"
            disabled={ this.shouldButtonBeDisabled() }
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;

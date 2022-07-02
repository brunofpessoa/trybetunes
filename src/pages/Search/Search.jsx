import React from 'react';
import Header from '../../components/Header/Header';
import Input from '../../components/Form/Input';
import SubmitButton from '../../components/Form/Button';
import styles from './Search.module.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ artist: target.value });
  };

  shouldButtonBeDisabled = () => {
    const { artist } = this.state;
    const minLength = 2;
    return artist.length < minLength;
  };

  render() {
    return (
      <div data-testid="page-search" className={ styles.main }>
        <Header />
        <form>
          <Input
            name="search"
            placeholder="Nome do Artista"
            testId="search-artist-input"
            type="text"
            handleOnChange={ this.handleChange }
          />
          <SubmitButton
            testId="search-artist-button"
            text="Procurar"
            disabled={ this.shouldButtonBeDisabled() }
          />
        </form>
      </div>
    );
  }
}

export default Search;

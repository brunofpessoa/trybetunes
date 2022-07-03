import React from 'react';
import Header from '../../components/Header/Header';
import Input from '../../components/Form/Input';
import SubmitButton from '../../components/Form/Button';
import styles from './Search.module.css';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Albums from '../../components/Albums';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchFor: '',
      loading: false,
      searchResult: [],
      shouldUpdateAlbums: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ searchFor: target.value });
  };

  shouldButtonBeDisabled = () => {
    const { searchFor } = this.state;
    const minLength = 2;
    return searchFor.length < minLength;
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { searchFor } = this.state;
    this.setState({ loading: true });
    const result = await searchAlbumsAPI(searchFor);
    this.setState({ searchResult: result, loading: false, shouldUpdateAlbums: true });
  };

  disableAlbumsUpdate = () => {
    this.setState({ shouldUpdateAlbums: false, searchFor: '' });
  };

  render() {
    const { searchFor, searchResult, loading, shouldUpdateAlbums } = this.state;
    return (
      <div data-testid="page-search" className={ styles.main }>
        <Header />

        {!loading && (
          <form>
            <Input
              name="search"
              placeholder="Nome do Artista"
              testId="search-artist-input"
              type="text"
              value={ searchFor }
              handleOnChange={ this.handleChange }
            />
            <SubmitButton
              testId="search-artist-button"
              text="Procurar"
              disabled={ this.shouldButtonBeDisabled() }
              handleClick={ this.handleClick }
            />
          </form>)}

        <Albums
          loading={ loading }
          searchFor={ searchFor }
          albums={ searchResult }
          shouldUpdateAlbums={ shouldUpdateAlbums }
          disableAlbumsUpdate={ this.disableAlbumsUpdate }
        />
      </div>
    );
  }
}

export default Search;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Albums.module.css';
import Loading from '../Loading';

class Albums extends React.Component {
  shouldComponentUpdate({ shouldUpdateAlbums }) {
    return shouldUpdateAlbums;
  }

  componentDidUpdate() {
    const { disableAlbumsUpdate } = this.props;
    disableAlbumsUpdate();
  }

  render() {
    const { albums, searchFor, loading, shouldUpdateAlbums } = this.props;
    return (
      loading ? <Loading /> : (
        <div className={ styles.main }>
          {searchFor && (
            <p>
              Resultado de álbuns de:
              {' '}
              <span className={ styles.theme }>{searchFor}</span>
            </p>)}
          {
            albums.length > 0 ? (
              <div className={ styles.albums }>
                {
                  albums.map((album) => (
                    <Link
                      to={ `/album/${album.collectionId}` }
                      key={ album.collectionId }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <div className={ styles.album }>
                        <img
                          src={ album.artworkUrl100.replace('100x100bb', '592x592bb') }
                          alt={ album.artistName }
                        />
                        <div className={ styles.description_section }>
                          <span
                            className={ styles.album_artist }
                          >
                            {album.artistName}
                          </span>
                          <span className={ styles.album_name }>
                            {album.collectionName}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </div>
            ) : shouldUpdateAlbums && <p>Nenhum álbum foi encontrado</p>
          }
        </div>)
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchFor: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  shouldUpdateAlbums: PropTypes.bool.isRequired,
  disableAlbumsUpdate: PropTypes.func.isRequired,
};

Albums.defaultProps = {
  searchFor: '',
};

export default Albums;

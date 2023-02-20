import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import MusicCard from '../../components/MusicCard';
import getMusics from '../../services/musicsAPI';
import styles from './Album.module.css';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../../components/Loading';

class Album extends React.Component {
  state = {
    albumInfo: {},
    songs: [],
    favoriteSongs: [],
    loading: true,
    showError: false,
  };

  setSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    if (data.length > 0) {
      const [albumInfo, ...songs] = data;
      this.setState({ albumInfo, songs });
    } else {
      this.setState({ showError: true });
    }
  };

  componentDidMount = async () => {
    this.setSongs();
    this.handleFavorites();
  }

  handleFavorites = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, favoriteSongs });
  };

  render() {
    const { albumInfo, songs, loading, favoriteSongs, showError } = this.state;
    return loading ? <Loading /> : (
      <div data-testid="page-album" className={ styles.container }>
        <Header />

        {songs.length > 0 && (
          <main className={ styles.main }>
            <section className={ styles.album_info_container }>
              <img
                src={ albumInfo.artworkUrl100.replace('100x100bb', '592x592bb') }
                alt={ albumInfo.collectionName }
              />
              <div className={ styles.album_info }>
                <span data-testid="artist-name">{albumInfo.artistName}</span>
                <span
                  className={ styles.album_name }
                  data-testid="album-name"
                >
                  { albumInfo.collectionName }
                </span>
              </div>
            </section>
            <section className={ styles.song_list }>
              {
                songs.map((song) => (
                  <MusicCard
                    key={ song.trackId }
                    song={ song }
                    trackName={ song.trackName }
                    previewUrl={ song.previewUrl }
                    trackId={ song.trackId }
                    favorite={ favoriteSongs.some((e) => e.trackId === song.trackId) }
                    artWork={ albumInfo.artworkUrl60 }
                    collectionName={ albumInfo.collectionName }
                  />
                ))
              }
            </section>
          </main>
        )}

        {showError && (
          <p className="txt-center">
            Não foi possível acessar as informações desse álbum, por favor tente outro.
          </p>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;

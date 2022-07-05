import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import MusicCard from '../../components/MusicCard';
import getMusics from '../../services/musicsAPI';
import styles from './Album.module.css';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../../components/Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumInfo: {},
      songs: [],
      favoriteSongs: [],
      loading: true,
    };
  }

  setSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const [albumInfo, ...songs] = data;
    this.setState({ albumInfo, songs });
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
    const { albumInfo, songs, loading, favoriteSongs } = this.state;
    console.log(favoriteSongs);
    return loading ? <Loading /> : (
      <div data-testid="page-album">
        <Header />
        <main className={ styles.main }>
          <section className={ styles.album_info }>
            <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.collectionName } />
            <span data-testid="artist-name">{albumInfo.artistName}</span>
            <span data-testid="album-name">{ albumInfo.collectionName }</span>
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
                />
              ))
            }
          </section>
        </main>
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

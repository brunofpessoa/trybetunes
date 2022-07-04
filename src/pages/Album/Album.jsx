import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import MusicCard from '../../components/MusicCard';
import getMusics from '../../services/musicsAPI';
import styles from './Album.module.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumInfo: {},
      songs: [],
    };
  }

  setSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const albumInfo = data[0];
    const songs = data.slice(1);
    this.setState({ albumInfo, songs });
  };

  componentDidMount = async () => {
    this.setSongs();
  }

  render() {
    const { albumInfo, songs } = this.state;
    return (
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

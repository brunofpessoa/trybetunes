import React from 'react';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Header from '../../components/Header';
import styles from './Favorite.module.css';

class Favorites extends React.Component {
  state = {
    favorites: [],
    loading: true,
  };

  componentDidMount = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, favorites: favoriteSongs });
  }

  updateFavorites = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, favorites: favoriteSongs });
  };

  render() {
    const { loading, favorites } = this.state;

    return loading ? <Loading /> : (
      <div data-testid="page-favorites" className={ styles.container }>
        <Header />
        <main className={ styles.main }>
          <h3 className={ styles.title }>Favoritas</h3>
          {
            favorites.length < 1
              ? <p>Você ainda não possui músicas favoritas.</p>
              : favorites.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  song={ song }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  trackId={ song.trackId }
                  artWork={ song.artworkUrl60 }
                  collectionName={ song.collectionName }
                  favorite={ favorites.some((e) => e.trackId === song.trackId) }
                  updateFavorites={ this.updateFavorites }
                />
              ))
          }
        </main>
      </div>
    );
  }
}

export default Favorites;

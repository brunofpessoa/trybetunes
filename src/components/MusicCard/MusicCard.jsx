import React from 'react';
import PropTypes from 'prop-types';
import styles from './MusicCard.module.css';
import Loading from '../Loading';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      loading: false,
    };
  }

  handleFavorite = async () => {
    const { song } = this.props;
    const { isFavorite } = this.state;

    this.setState({ loading: true });

    if (isFavorite) {
      await removeSong(song);
    } else {
      await addSong(song);
    }

    this.setState({ isFavorite: !isFavorite, loading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite, loading } = this.state;
    return loading ? <Loading /> : (
      <div className={ styles.main }>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            id="favorite"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleFavorite }
            checked={ isFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape({}).isRequired,
};

export default MusicCard;
import React from 'react';
import PropTypes from 'prop-types';
import styles from './MusicCard.module.css';
import Loading from '../Loading';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import whiteHeartIcon from '../../img/whiteHeartIcon.svg';
import redHeartIcon from '../../img/redHeartIcon.svg';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { favorite } = this.props;
    this.setState({ isFavorite: favorite });
  }

  handleFavorite = async () => {
    const { song, updateFavorites } = this.props;
    const { isFavorite } = this.state;

    this.setState({ loading: true });

    if (isFavorite) {
      await removeSong(song);
    } else {
      await addSong(song);
    }

    this.setState({ isFavorite: !isFavorite, loading: false },
      updateFavorites);
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite, loading } = this.state;

    return loading ? <Loading /> : (
      <div className={ styles.main }>
        <span>{ trackName }</span>
        <div className={ styles.audio }>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ `favorite-${trackId}` }>
            { isFavorite
              ? <img className="heart" src={ redHeartIcon } alt="filled heart" />
              : <img className="heart" src={ whiteHeartIcon } alt="empty heart" />}
            <input
              id={ `favorite-${trackId}` }
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleFavorite }
              checked={ isFavorite }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape({}).isRequired,
  favorite: PropTypes.bool.isRequired,
  updateFavorites: PropTypes.func,
};

MusicCard.defaultProps = {
  updateFavorites: () => {},
};

export default MusicCard;

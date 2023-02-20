import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import styles from './MusicCard.module.css';
import Loading from '../Loading';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    loading: false,
  };

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

    this.setState({
      isFavorite: !isFavorite,
      loading: false,
    }, updateFavorites);
  };

  render() {
    const { trackName, previewUrl, trackId, artWork, collectionName } = this.props;
    const { isFavorite, loading } = this.state;

    return loading ? <Loading /> : (
      <div className={ styles.main }>
        <div className={ styles.info }>
          <img
            src={ artWork }
            alt={ collectionName }
          />
          <span>{ trackName }</span>
        </div>
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
              ? <AiFillStar fill="yellow" />
              : <AiOutlineStar fill="yellow" />}
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
  artWork: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};

MusicCard.defaultProps = {
  updateFavorites: () => {},
};

export default MusicCard;

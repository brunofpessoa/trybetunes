import React from 'react';
import PropTypes from 'prop-types';
import styles from './MusicCard.module.css';

function MusicCard({ trackName, previewUrl }) {
  return (
    <div className={ styles.main }>
      <span>{ trackName }</span>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
    </div>
  );
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;

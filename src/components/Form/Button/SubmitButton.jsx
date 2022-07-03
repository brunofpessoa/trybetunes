import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubmitButton.module.css';

function SubmitButton({ text, handleClick, testId, disabled }) {
  return (
    <button
      type="submit"
      className={ styles.btn }
      onClick={ handleClick }
      data-testid={ testId }
      disabled={ disabled }
    >
      { text }
    </button>
  );
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  disabled: false,
};

export default SubmitButton;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

function Input({ type, text, name, placeholder, handleOnChange, testId }) {
  return (
    <div className={ styles.form_control }>
      {text && <label htmlFor={ name }>{`${text}:`}</label>}
      <input
        type={ type }
        name={ name }
        id={ name }
        data-testid={ testId }
        placeholder={ placeholder }
        onChange={ handleOnChange }
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};

Input.defaultProps = {
  text: '',
};

export default Input;

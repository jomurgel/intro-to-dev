import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from '../config/propTypes';

const Button = ({
  theme,
  setThemeState
}) => (
  <button
    onClick={() => setThemeState()}
    style={theme.button}
    type="button"
  >
    {theme.dark ? 'Toggle to Light' : 'Toggle to Dark'}
  </button>
);

/**
 * Set initial props.
 *
 * @type {object}
 */
Button.propTypes = {
  theme: PropTypes.shape(STYLES).isRequired,
  setThemeState: PropTypes.func.isRequired,
};

export default Button

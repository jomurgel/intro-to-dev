import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  theme,
  toggleTheme,
}) => (
  <button
    onClick={() => toggleTheme()}
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
  theme: PropTypes.shape({}).isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Button

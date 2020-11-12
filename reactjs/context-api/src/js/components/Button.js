import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  isDark,
  setThemeState,
}) => (
  <button
    onClick={() => setThemeState(! isDark)}
    type="button"
  >
    {isDark ? 'Toggle to Light' : 'Toggle to Dark'}
  </button>
);

/**
 * Set initial props.
 *
 * @type {object}
 */
Button.propTypes = {
  isDark: PropTypes.bool.isRequired,
  setThemeState: PropTypes.func.isRequired,
};

export default Button

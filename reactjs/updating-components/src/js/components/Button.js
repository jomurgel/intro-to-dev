import React from 'react';

const Button = () => (
  <button
    onClick={() => setThemeState(! isDark)}
    type="button"
  >
    {isDark ? 'Toggle to Light' : 'Toggle to Dark'}
  </button>
);

export default Button

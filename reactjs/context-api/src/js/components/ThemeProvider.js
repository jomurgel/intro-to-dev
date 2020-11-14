import React, { createContext, useState } from 'react';
import theme from '../config/theme';

export const ThemeContext = createContext([ false, () => {} ]);

export const ThemeProvider = ({ children }) => {
  const [themeType, setThemeState] = useState('light');

  const toggleTheme = () => setThemeState( 'light' === themeType ? 'dark' : 'light' );

  const themeStyles = theme[themeType];

  return (
    <ThemeContext.Provider value={{ theme: themeStyles, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

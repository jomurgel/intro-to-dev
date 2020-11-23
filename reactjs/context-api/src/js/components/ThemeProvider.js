import React, { createContext, useState } from 'react';
import theme from '../config/theme';

// Default value, default x — in this case is a function.
export const ThemeContext = createContext([ false, () => {} ]);

export const ThemeProvider = ({ children }) => {
	const [themeType, setThemeState] = useState('light');

	const toggleTheme = () => setThemeState( 'light' === themeType ? 'dark' : 'light' );

	const themeStyles = theme[themeType]; // theme.light or theme.dark === theme['light'] or theme['dark']

	return (
		<ThemeContext.Provider value={{ theme: themeStyles, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

import React, { useContext } from 'react';

// Components.
import Button from './Button';
import Content from './Content';
import Title from './Title';

import { ThemeContext } from './ThemeProvider';

const App = () => {
  const { themeType, theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={theme.body}>
      <Button
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Title theme={theme} themeType={theme} />
      <Content theme={theme} themeType={theme} />
    </div>
  );
}

export default App;
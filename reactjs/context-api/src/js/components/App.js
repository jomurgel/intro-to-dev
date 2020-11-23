import React, { useContext } from 'react';

// Components.
import Button from './Button';
import Content from './Content';
import { ThemeContext } from './ThemeProvider';
import Title from './Title';

const App = () => {
  // const [isDark, setThemeState] = useState(false);
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <div style={theme.body}>
      <Button
        theme={theme}
        setThemeState={toggleTheme}
      />
      <Title theme={theme} />
      <Content theme={theme} />
    </div>
  );
}

export default App;
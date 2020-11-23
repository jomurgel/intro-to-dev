import React, { useState } from 'react';

// Components.
import Button from './Button';
import Content from './Content';
import Title from './Title';

const App = () => {
  const [isDark, setThemeState] = useState(false);

  return (
    <div>
      <Button
        isDark={isDark}
        setThemeState={setThemeState}
      />
      <Title isDark={isDark} />
      <Content isDark={isDark} />
    </div>
  );
}

export default App;
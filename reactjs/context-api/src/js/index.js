// Import dependencies.
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ThemeProvider } from './components/ThemeProvider';

// Render the app in the DOM.
ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById( 'root' ),
);

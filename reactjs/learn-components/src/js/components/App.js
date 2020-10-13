import React from 'react';
import Title from './Title';

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Title />
        <div>Hello World, Woo!</div>
      </div>
    );
  }
}

import React from 'react';
import Title from './Title';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Title text="This is a Prop!" />
				<div>Hello World</div>
			</div>
		);
	}
}

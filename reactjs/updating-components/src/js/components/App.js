import React from 'react';
import Title from './Title';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isDark: false,
		};

		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	handleButtonClick() {
		this.setState({ isDark: ! this.state.isDark });
	}

	render() {
		return (
			<div>
				<button
					onClick={() => this.handleButtonClick()}
					type="button"
				>
					{this.state.isDark ? 'Toggle to Light' : 'Toggle to Dark'}
				</button>
				<Title text={this.state.isDark ? 'This is a Dark Prop!' : 'This is a Light Prop!'} />
				<div>Hello World</div>
			</div>
		);
	}
}

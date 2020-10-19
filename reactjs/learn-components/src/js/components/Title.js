import React from 'react';

export default class Title extends React.Component {
	/**
	 * Set initial props.
	 * @type {object}
	 */
	static defaultProps = {
		text: 'Alternative Title',
	};

	render() {
		return <h1>{this.props.text}</h1>;
	}
}

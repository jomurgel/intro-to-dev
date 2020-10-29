import React from 'react';
import PropTypes from 'prop-types';

export default class Title extends React.Component {
	/**
	 * Set initial props.
	 * @type {object}

	 */
	static propTypes = {
		text: PropTypes.string.isRequired,
	};

	render() {
		return <h1>{this.props.text}</h1>;
	}
}

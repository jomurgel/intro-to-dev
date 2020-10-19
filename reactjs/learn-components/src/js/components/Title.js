import React from 'react';

class Title extends React.Component {
	render() {
		return <h1>{this.props.text}</h1>;
	}
}

/**
 * Set initial props.
 * @type {object}
 */
Title.defaultProps = {
	text: 'Alternative Title',
};

export default Title;

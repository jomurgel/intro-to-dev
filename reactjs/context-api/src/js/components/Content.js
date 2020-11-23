import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from '../config/propTypes';

const Content = ({ theme: { content, dark } }) => <p style={content}>{dark ? 'This is Dark Content.' : 'This is light content.'}</p>;

/**
 * Set initial props.
 *
 * @type {object}
 */
Content.propTypes = {
	theme: PropTypes.shape(STYLES).isRequired,
};

export default Content;

import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ isDark }) => <h1>{isDark ? 'Dark Title' : 'Light Title!'}</h1>;

/**
 * Set initial props.
 *
 * @type {object}
 */
Title.propTypes = {
	isDark: PropTypes.bool.isRequired,
};

export default Title;
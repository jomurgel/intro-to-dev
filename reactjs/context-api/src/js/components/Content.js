import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ isDark }) => <p>{isDark ? 'This is Dark Content.' : 'This is light content.'}</p>;

/**
 * Set initial props.
 *
 * @type {object}
 */
Content.propTypes = {
	isDark: PropTypes.bool.isRequired,
};

export default Content;

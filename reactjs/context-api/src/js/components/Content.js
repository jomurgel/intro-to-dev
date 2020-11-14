import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ theme }) => <p style={theme.content}>Sometimes you look up at the sky and see the {theme.dark ? 'moon' : 'sun'}.</p>;

/**
 * Set initial props.
 *
 * @type {object}
 */
Content.propTypes = {
  theme: PropTypes.shape({}).isRequired,
};

export default Content;

import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ theme }) => <h1 style={theme.title}>{theme.dark ? 'Are you afraid of the dark!' : 'We\'re safe, the sun is up!'}</h1>;

/**
 * Set initial props.
 *
 * @type {object}
 */
Title.propTypes = {
  theme: PropTypes.shape({}).isRequired,
};

export default Title;

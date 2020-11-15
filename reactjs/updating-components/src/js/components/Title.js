import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ text }) => <h1>{text}</h1>;

/**
 * Set initial props.
 * @type {object}

  */
Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;

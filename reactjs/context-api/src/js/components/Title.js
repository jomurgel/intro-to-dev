import React from 'react';
import PropTypes from 'prop-types';
import { STYLES } from '../config/propTypes';

const Title = ({ theme }) => <h1 style={theme.title}>{theme.dark? 'Dark Title' : 'Light Title!'}</h1>;

/**
 * Set initial props.
 *
 * @type {object}
 */
Title.propTypes = {
	theme: PropTypes.shape(STYLES).isRequired,
};

export default Title;
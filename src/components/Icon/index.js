import React from 'react';
import IndicatorSVG from 'assets/images/arrow.svg';
import PropTypes from 'prop-types';

const Icon = ({ name, color, size }) => (
    <svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
        <use xlinkHref={`${IndicatorSVG}#icon-${name}`} />
    </svg>
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number
}

export default Icon;

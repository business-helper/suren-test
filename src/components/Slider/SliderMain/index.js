import React, { useState } from 'react';
import IndicatorSVG from 'assets/images/arrow.svg';
import {container, colorBarContainer, colorTop, colorBottom, indicator, amount, minLabel, maxLabel} from './style.module.css';

export default function SliderMain(props) {
    const [percentage, SetPercentage] = useState(69.24);

    return (
        <div className={container}>
            <div className={colorBarContainer}>
                <div className={colorTop}></div>
                <div className={colorBottom}></div>
            </div>
            <div className={indicator}>
                <img src={IndicatorSVG} alt="Indicator SVG" />
                <label className={amount}>{percentage}</label>
            </div>
            <label className={maxLabel}>100</label>
            <label className={minLabel}>0</label>
        </div>
    );
}
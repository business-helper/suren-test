import React from 'react';
import styles from './style.module.css';
import SliderMain from './SliderMain';
import Amount from './Amount';

export default function Slider(props) {
    return (
        <div className={styles.container}>
            <SliderMain />
            <Amount />
        </div>
    );
}
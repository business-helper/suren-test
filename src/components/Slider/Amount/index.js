import React from 'react';
import styles from './style.module.css';

export default function Amount(props) {
    return (
        <div className={styles.container}>
            <div className={styles.counter}>
                <span className={styles.label}>BET AMOUNT</span>
                <p className={styles.amount}><span>&#8383;</span>0.04885313</p>
            </div>

            <div className={styles.half}>
                <p className={styles.mutiplier}>1/2</p>
            </div>

            <div className={styles.double}>
                <p className={styles.mutiplier}>x2</p>
            </div>
        </div>
    );
}
import React from 'react';
import styles from './style.module.css';

export default function ArtBoard(props) {
    return (
        <div className={styles.board}>
            {props.children}
        </div>
    );
}
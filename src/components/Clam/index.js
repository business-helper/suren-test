import React from 'react';
import styles from './style.module.css';
import ClamTop from 'assets/images/clam_top.svg';
import ClamBottom from 'assets/images/clam_bottom.svg';


export default function Clam(props) {
    return (
        <div className={styles.container}>
            <div className={styles.subContainerOfClam_top}>
                <img src={ClamTop} alt="" className={styles.clam_top}></img>
            </div>
            <div className={styles.subContainerOfClam_bottom}>
                <img src={ClamBottom} alt="" className={styles.clam_bottom}></img>
            </div>

        </div>
    );
}

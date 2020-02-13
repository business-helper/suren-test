import React, { useState } from 'react';
import Modal from '../Modal'
import styles from './style.module.css';
import ClamTop from 'assets/images/clam_top.svg';
import ClamBottom from 'assets/images/clam_bottom.svg';
import modalAlert from 'assets/images/alert.svg';



export default function Clam(props) {
    const [modalFlag, setmodalFlag] = useState(false);
    return (
        <div className={styles.container}>
            {/* <div className={styles.subContainerOfClam_top} onClick={() => { setmodalFlag(true); console.log(modalFlag) }}>
                <img src={ClamTop} alt="" className={styles.clam_top}></img>
            </div> */}
            <div className={styles.subContainerOfClam_bottom} onClick={() => { setmodalFlag(true); console.log(modalFlag) }}>
                <img src={ClamTop} alt="" className={styles.clam_top}></img>
                <img src={ClamBottom} alt="" className={styles.clam_bottom}></img>
            </div>
            <Modal
                isModalOpen={modalFlag}
                closeModal={() => setmodalFlag(false)}
            >
                <div className={styles.modalContainer}>
                    <div className={styles.modalHeader}>
                        <div className={styles.modalHeaderLeft}>
                            <img src={modalAlert} alt="" className={styles.modalAlert}></img>
                            <label className={styles.modalHeaderLabel}>CONFIRM</label>
                        </div>

                        <div className={styles.modalHeaderRight}   onClick={() => setmodalFlag(false)}>
                            <hr className={styles.multiplyStyleFirst} />
                            <hr className={styles.multiplyStyleSecond} />
                        </div>

                    </div>
                </div>
                
            </Modal>
        </div>
    );
}

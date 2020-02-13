import React from 'react'
import propTypes from 'prop-types'
import styles from './style.module.css';

export default class Modal extends React.Component {
	static propTypes = {
		isModalOpen:propTypes.bool.isRequired,
		closeModal: propTypes.func.isRequired,
	};

	render() {
		return (
			<div
            className={styles.outsider}
				style={{
					display: this.props.isModalOpen ? "block" : "none"
				}}
			>
				<div className={styles.overlay}  />
				<div className={styles.modal}>{this.props.children}</div>
			</div>
		);
	}
}
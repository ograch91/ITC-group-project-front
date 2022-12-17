import React from 'react'
import styles from '../Modal/Modal.module.css';


export const Modal = ({ open, onClose, image }) => {
    if (!open) return null

    return (
        <>
            <div className={styles.overlay} onClick={onClose}>
                <div onClick={(e) => {
                    e.stopPropagation()
                }} className={styles.modalContainer}>
                    <p onClick={onClose} className={styles.closeBtn}>X</p>
                    <img src={image}></img>
                </div>
            </div>
        </>

    )
}


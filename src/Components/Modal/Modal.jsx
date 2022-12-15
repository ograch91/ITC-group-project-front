import React from 'react'
import styles from '../Modal/Modal.css';


const Modal = ({ open, onClose, image }) => {
    if (!open) return null

    return (
        <>
            <div className='overlay' onClick={onClose}>Modal
                <div onClick={(e) => {
                    e.stopPropagation()
                }} className="modalContainer">
                    <p onClick={onClose} className='closeBtn'>X</p>
                    <img src={image}></img>
                </div>
            </div>
        </>

    )
}

export default Modal
import React from 'react';
import './Modal.css'; // Import CSS for modal styles

const Modal = ({ closeModal, modalType, children }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={closeModal} className="close-btn">X</button>
                <div className="modal-body">
                    <h2 className="text-xl font-bold">{modalType === 'signup' ? 'Đăng ký' : 'Đăng nhập'}</h2>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

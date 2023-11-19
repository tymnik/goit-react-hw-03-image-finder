import React, { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ imageUrl, altText, onClose }) => {
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleClickOutside = event => {
    if (event.target.classList.contains('overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose, handleKeyDown, handleClickOutside]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img src={imageUrl} alt={altText} />
      </div>
    </div>
  );
};

export default Modal;

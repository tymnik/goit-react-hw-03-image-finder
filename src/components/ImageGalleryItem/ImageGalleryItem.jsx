import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ src, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className={styles.galleryItem} onClick={openModal}>
        <img className={styles.imageGalleryItem} src={src} alt={alt} />
      </li>
      {isModalOpen && (
        <Modal imageUrl={src} altText={alt} onClose={closeModal} />
      )}
    </>
  );
};

export default ImageGalleryItem;

import React from 'react';
import styles from './ImageGallery.module.css'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image, index) => (
        <ImageGalleryItem key={index} src={image.src} alt={image.alt} />
      ))}
    </ul>
  );
};

export default ImageGallery;

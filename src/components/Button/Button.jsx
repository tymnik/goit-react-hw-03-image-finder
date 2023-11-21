import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, loadMore }) => {
  return loadMore ? (
    <button onClick={onClick} className={styles.loadMoreButton}>
      Load More
    </button>
  ) : null;
};

export default Button;

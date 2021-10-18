import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ alt, src, onClick, srcBigImg }) {
  return (
    <li className={s.item} onClick={onClick}>
      <img src={src} alt={alt} data-modal={srcBigImg} className={s.image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  srcBigImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

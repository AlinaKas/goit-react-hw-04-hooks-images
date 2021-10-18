import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className={s.list}>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          alt={tags}
          src={webformatURL}
          srcBigImg={largeImageURL}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.prototype = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  onClick: PropTypes.func.isRequired,
};

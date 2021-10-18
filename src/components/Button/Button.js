import React from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ loadImages }) {
  return (
    <button type="button" className={s.btn} onClick={loadImages}>
      Load more...
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};

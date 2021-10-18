import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

function LoaderSpinner() {
  return (
    <Loader
      className={s.loader}
      type="Oval"
      color="#00BFFF"
      height={120}
      width={120}
    />
  );
}

export default LoaderSpinner;

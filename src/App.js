import s from './App.module.css';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imagesAPI from './services/imagesApi';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import LoaderSpinner from './components/Loader';
import Container from './components/Container';
import defaultImage from './images/default.png';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    imagesAPI
      .fetchImages(searchQuery, page)
      .then(({ hits }) => {
        // console.log({ hits });
        if (hits.length === 0) {
          return setError(`No images for your request ${searchQuery}`);
        }
        setImages([...images, ...hits]);
        setPage(page);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [searchQuery, page]);

  // Сабмит формы и очистка
  const getSearchValue = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  // Загрузка дальнейших картинок

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(state => state + 1);
    scrollPage();
  };

  //Скролл при подгрузке картинок
  const scrollPage = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  //Модалка
  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const openModal = e => {
    setModalImage(() => e.target.dataset.modal);
    setAlt(() => e.target.alt);
    toggleModal();
  };

  // РЕНДЕР СТРАНИЦЫ

  // const { images, error, isLoading, modalImage, alt, showModal } = this.state;
  return (
    <Container>
      <div className={s.App}>
        <Searchbar onSubmitForm={getSearchValue} />
        {isLoading && <LoaderSpinner />}
        {images.length > 0 && !error && (
          <>
            <ImageGallery onClick={openModal} images={images} />
            <Button loadImages={onLoadMore} />
          </>
        )}
        {showModal && (
          <Modal onClose={toggleModal} src={modalImage} alt={alt} />
        )}
        {error && <p className={s.error}>{error}</p>}
        {error && (
          <div>
            <img src={defaultImage} alt="error" className={s.defaultImage} />
          </div>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    </Container>
  );
}

export default App;

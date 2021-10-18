import s from './App.module.css';
import React, { Component } from 'react';
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

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    error: null,
    modalImage: '',
    alt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchQuery;
    const nextSearch = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      this.setState({ isLoading: true });

      imagesAPI
        .fetchImages(nextSearch, nextPage)
        .then(({ hits }) => {
          // console.log({ hits });

          if (hits.length === 0) {
            return this.setState({
              status: 'rejected',
              error: `No images for your request ${nextSearch}`,
            });
          }
          this.setState(({ images, page }) => ({
            images: [...images, ...hits],
            page: page,
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  // Сабмит формы и очистка
  getSearchValue = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1, error: null });
  };

  // Загрузка дальнейших картинок

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    this.scrollPage();
  };

  //Скролл при подгрузке картинок
  scrollPage = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  //Модалка
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    this.setState(() => ({
      modalImage: e.target.dataset.modal,
      alt: e.target.alt,
    }));
    this.toggleModal();
  };

  // РЕНДЕР СТРАНИЦЫ

  render() {
    const { images, error, isLoading, modalImage, alt, showModal } = this.state;
    return (
      <Container>
        <div className={s.App}>
          <Searchbar onSubmitForm={this.getSearchValue} />
          {isLoading && <LoaderSpinner />}
          {images.length > 0 && !error && (
            <>
              <ImageGallery onClick={this.openModal} images={images} />
              <Button loadImages={this.onLoadMore} />
            </>
          )}
          {showModal && (
            <Modal onClose={this.toggleModal} src={modalImage} alt={alt} />
          )}
          {error && <p className={s.error}>{error}</p>}
          {error && (
            <div>
              <img src={defaultImage} alt={error} className={s.defaultImage} />
            </div>
          )}
          <ToastContainer autoClose={3000} />
        </div>
      </Container>
    );
  }
}
export default App;

import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import apiService from './services/apiService';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import s from './App.module.css';
import FallbackContainer from './components/FallbackContainer/FallbackContainer';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (!searchValue) {
      return;
    } else if (searchValue) {
      setPage(1);
      setItems(null);
      setStatus(Status.PENDING);
      apiService(searchValue, 1)
        .then(items => {
          setItems(items);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    } else if (page !== 1) {
      apiService(searchValue, page)
        .then(items => {
          setItems(...items);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }
  }, [page, searchValue]);

  function handleSubmit(searchValue) {
    setSearchValue(searchValue);
  }

  function handleLoadMore() {
    setPage(prevState => {
      return prevState + 1;
    });
  }

  function toggleModal() {
    setShowModal(prevState => {
      return !prevState;
    });
  }

  function showLargeImage(largeImage) {
    setLargeImage(largeImage);
    toggleModal();
  }

  return (
    <div className={s.app}>
      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={largeImage} alt="Full size" />
        </Modal>
      )}

      <Searchbar onSubmitGet={handleSubmit} />
      {items && <ImageGallery items={items} showFull={showLargeImage} />}

      {status === Status.PENDING && (
        <FallbackContainer>
          <Loader type="Oval" color="#00BFFF" height={150} width={150} />
        </FallbackContainer>
      )}

      {status === Status.RESOLVED && <Button loadMore={handleLoadMore} />}

      {status === Status.REJECTED && <p>{error.message}</p>}
    </div>
  );
}

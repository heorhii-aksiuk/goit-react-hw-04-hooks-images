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
const { IDLE, PENDING, RESOLVED, REJECTED } = Status;

export default function App() {
  const startPage = 1;
  const [status, setStatus] = useState(IDLE);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(startPage);
  const [items, setItems] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchValue.trim()) {
      setStatus(IDLE);
    } else {
      setStatus(PENDING);
      apiService(searchValue, page)
        .then(newItems => {
          if (page === startPage) {
            setItems(newItems);
          } else {
            setItems(prevState => {
              return [...prevState, ...newItems];
            });
          }
          setStatus(RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(REJECTED);
        });
    }
  }, [page, searchValue]);

  function handleSubmit(searchValue) {
    setSearchValue(searchValue);
    setPage(startPage);
    setItems(null);
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

      {status === PENDING && (
        <FallbackContainer>
          <Loader type="Oval" color="#00BFFF" height={150} width={150} />
        </FallbackContainer>
      )}

      {status === RESOLVED && <Button loadMore={handleLoadMore} />}

      {status === REJECTED && <p>{error.message}</p>}
    </div>
  );
}

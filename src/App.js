import React, { Component } from 'react';
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

class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    items: null,
    error: null,
    status: Status.IDLE,
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevState.searchValue;
    const currentRequest = this.state.searchValue.trim();
    const prevPage = prevState.page;
    const currentPage = this.state.page;
    const firstPage = 1;

    if (currentRequest === '') {
      return;
    } else if (currentRequest !== prevRequest) {
      this.setState({
        page: firstPage,
        items: null,
        status: Status.PENDING,
      });
      apiService(currentRequest, firstPage)
        .then(items =>
          this.setState({
            items,
            status: Status.RESOLVED,
          }),
        )
        .catch(error =>
          this.setState({
            error,
            status: Status.REJECTED,
          }),
        );
    } else if (currentPage !== firstPage && currentPage !== prevPage) {
      apiService(currentRequest, currentPage)
        .then(newItems =>
          this.setState({
            items: [...this.state.items, ...newItems],
            status: Status.RESOLVED,
          }),
        )
        .catch(error =>
          this.setState({
            error,
            status: Status.REJECTED,
          }),
        );
    }
  }

  handleSubmit = searchValue => {
    this.setState({ searchValue });
  };

  handleLoadMore = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  showLargeImage = largeImage => {
    this.setState({ largeImage });
    this.toggleModal();
  };

  render() {
    const { items, status, showModal, largeImage } = this.state;
    return (
      <div className={s.app}>
        {showModal && (
          <Modal closeModal={this.toggleModal}>
            <img src={largeImage} alt="Full size" />
          </Modal>
        )}

        <Searchbar onSubmitGet={this.handleSubmit} />
        {items && <ImageGallery items={items} showFull={this.showLargeImage} />}

        {status === Status.PENDING && (
          <FallbackContainer>
            <Loader type="Oval" color="#00BFFF" height={150} width={150} />
          </FallbackContainer>
        )}

        {status === Status.RESOLVED && (
          <Button loadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}

export default App;

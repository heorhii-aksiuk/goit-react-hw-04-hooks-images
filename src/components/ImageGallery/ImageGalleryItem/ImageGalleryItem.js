import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  };

  render() {
    const { webformatURL, largeImageURL, showFull, tags } = this.props;
    return (
      <li className={s.item}>
        <img
          className={s.image}
          onClick={() => showFull(largeImageURL)}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;

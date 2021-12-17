import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    ),
  };

  render() {
    const { items, showFull } = this.props;
    return (
      <ul className={s.imageGallery}>
        {items.map(item => (
          <ImageGalleryItem
            key={item.id}
            showFull={showFull}
            webformatURL={item.webformatURL}
            largeImageURL={item.largeImageURL}
            tags={item.tags}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;

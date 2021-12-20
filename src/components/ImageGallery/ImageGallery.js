import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ items, showFull }) {
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

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

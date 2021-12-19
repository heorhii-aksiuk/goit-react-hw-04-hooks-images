import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  showFull,
  tags,
}) {
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

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  showFull: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};

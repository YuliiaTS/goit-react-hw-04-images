import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webSrc, alt, toggleModal }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        onClick={toggleModal}
        className={s.ImageGalleryItem_image}
        src={webSrc}
        alt={alt}
        width="200"
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  webSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
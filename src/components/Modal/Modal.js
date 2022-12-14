import { useEffect } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({imageSelected, onClose}) {

  const { largeImageURL, tags } = imageSelected;

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const onKeyEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyEscape);
   
    return () => {
      window.removeEventListener('keydown', onKeyEscape);
    };
    }, [onClose]
  );

  return (
    <div className={s.Overlay} onClick={onOverlayClick}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imageSelected: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

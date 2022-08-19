import { useState, useEffect } from 'react';
import { fetchImg } from '../servises/api';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './Gallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export function App() {
  const [imgName, setImgName] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [status, setStatus] = useState('idle');
  const [fullGallery, setFullGallery] = useState([]);

  const onFormSubmit = imgForSubmit => {
    if (imgForSubmit === imgName) {
      return;
    }
    setImgName(imgForSubmit);
    setPage(1);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setImageSelected({ largeImageURL, tags });
  };

  useEffect(() => {
    if (!imgName) {
      return;
    }

    setStatus('pending');
    fetchImg(imgName, page).then(imgArray => {
      const newImgArray = imgArray.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => {
          return { id, tags, webformatURL, largeImageURL };
        }
      );

      if (imgArray.hits.length === 0) {
        alert(`No images found for your request`);
      }

      setFullGallery(prevSet => [...prevSet, ...newImgArray]);
      setStatus('resolved');

      if (page * 12 === imgArray.totalHits) {
        setStatus('idle');
      }
    });
  }, [imgName, page]);

  const closeModal = () => {
    setShowModal(false);
  };

  const onClickLoadMore = () => {
    setPage(prevSetPage => prevSetPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={onFormSubmit} />
      <ImageGallery fullGallery={fullGallery} toggleModal={toggleModal} />
      {showModal && (
        <Modal imageSelected={imageSelected} onClose={closeModal} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <Button onButtonClick={onClickLoadMore} />}
    </>
  );
}
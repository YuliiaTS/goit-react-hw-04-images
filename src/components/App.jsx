import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './Gallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export class App extends Component {
  state = {
    imgName: '',
    page: 1,
    showModal: false,
    imageSelected: null,
    status: 'idle',
    fullGallery: [],
  };
  
  onFormSubmit = imgName => {
    if (imgName === this.state.imgName) {
      return;
    }

    this.setState({
      imgName,
      page: 1,
    });
  };


  fetchImg = async (imgName, page) => {
    const response = await fetch(
      `https://pixabay.com/api/?q=${imgName}&page=${page}&key=28165538-7e7426cdce48f868d39c42e82&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (response.ok) {
      return response.json();
    }
    return await Promise.reject(new Error(`Not found ${imgName}`));
  };

  componentDidUpdate(prevProps, prevState) {
    const { imgName, page, fullGallery } = this.state;

    if (prevState.imgName !== imgName || prevState.page !== page) {
      this.galleryClean(prevState);
      this.setState({ status: 'pending' });
      this.fetchImg(imgName, page).then(imgArray => {
        const newImgArray = imgArray.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return { id, tags, webformatURL, largeImageURL };
          }
        );

        this.setState(({ fullGallery }) => ({
          fullGallery: [...fullGallery, ...newImgArray],
          status: 'resolved',
        }));

        if (fullGallery.length + 12 === imgArray.totalHits) {
          this.setState({ status: 'idle' });
        }

        if (imgArray.hits.length === 0) {
          alert (`No images found for your request`);
        }

      });
    }
  }

  galleryClean = prevState => {
    const { imgName } = this.state;
    const prevImgName = prevState.imgName;

    if (prevImgName !== imgName) {
      this.setState(() => ({
        fullGallery: [],
      }));
    }
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));

    this.setState({ imageSelected: { largeImageURL, tags } });
  };

  onClickLoadMore = () => {
    this.setState(state => {
      return { page: state.page + 1 };
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };
  
  render() {
    const { showModal, imageSelected, status, fullGallery } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery
          fullGallery={fullGallery}
          toggleModal={this.toggleModal}
        />
        {showModal && (
          <Modal imageSelected={imageSelected} onClose={this.closeModal} />
        )}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <Button onButtonClick={this.onClickLoadMore} />}
      </>
    );
  }
}

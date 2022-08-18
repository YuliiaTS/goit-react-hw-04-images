import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
    render() {
        const { toggleModal, fullGallery } = this.props;

        return (
            <ul className={s.ImageGallery}>
              {fullGallery.map(img => {
                const { id, webformatURL, tags, largeImageURL } = img;
                return (
                  <ImageGalleryItem
                    toggleModal={() => toggleModal(largeImageURL, tags)}
                    key={id}
                    webSrc={webformatURL}
                    alt={tags}
                  />
                );
              })}
            </ul>
          );
    }
}

ImageGallery.propTypes = 
{fullGallery: PropTypes.arrayOf(
    PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        })
    ).isRequired,
    toggleModal: PropTypes.func.isRequired,
};
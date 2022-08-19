import { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';


export default function Searchbar({ onSubmit }) {

  const [searchingImg, setSearchingImg] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (searchingImg.trim() !== '') {
      onSubmit(searchingImg);
    }
    setSearchingImg('');
  };

  const handleInputChange = e => {
    setSearchingImg(e.target.value.toLowerCase());
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
;
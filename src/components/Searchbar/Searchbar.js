import React, { Component } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchingImg: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchingImg.trim() !== '') {
      this.props.onSubmit(this.state.searchingImg);
    }
    this.setState({ searchingImg: '' });
  };

  handleInputChange = e => {
    this.setState({
      searchingImg: e.target.value.toLowerCase(),
    });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

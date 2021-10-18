import React, { Component } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchChange = e => {
    this.setState({
      searchQuery: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.info('Enter your request', {
        theme: 'dark',
      });
      return;
    }
    this.props.onSubmitForm(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <>
        <header className={s.searchbar}>
          <form className={s.form} onSubmit={this.handleSearchSubmit}>
            <button
              type="submit"
              className={s.button}
              onClick={this.handleSearchSubmit}
            ></button>

            <input
              className={s.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;

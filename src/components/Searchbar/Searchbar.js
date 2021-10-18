import React, { useState } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Searchbar({ onSubmitForm }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.info('Enter your request', {
        theme: 'dark',
      });
    }
    onSubmitForm(searchQuery);
    setSearchQuery('');
  };

  return (
    <>
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleSearchSubmit}>
          <button
            type="submit"
            className={s.button}
            onClick={handleSearchSubmit}
          ></button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
      </header>
    </>
  );
}

export default Searchbar;

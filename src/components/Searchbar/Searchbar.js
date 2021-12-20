import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmitGet }) {
  const [value, setValue] = useState('');

  function handleChange({ target }) {
    setValue(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitGet(value);
  }

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <BsSearch />
        </button>
        <input
          onChange={handleChange}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmitGet: PropTypes.func.isRequired,
};

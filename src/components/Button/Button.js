import React, { Component } from 'react';
import s from './Button.module.css';

export default class Button extends Component {
  render() {
    const { loadMore } = this.props;
    return (
      <button className={s.button} onClick={loadMore} type="button">
        Load more
      </button>
    );
  }
}

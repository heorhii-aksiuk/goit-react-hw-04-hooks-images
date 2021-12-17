import React, { Component } from 'react';
import s from './Modal.module.css';

export default class Modal extends Component {
  render() {
    const { closeModal, children } = this.props;
    return (
      <div onClick={closeModal} className={s.overlay}>
        <div className={s.modal}>{children}</div>
      </div>
    );
  }
}

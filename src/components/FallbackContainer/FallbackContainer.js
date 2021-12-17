import React, { Component } from 'react';
import s from './FallbackContainer.module.css';

export default class FallbackContainer extends Component {
  render() {
    const { children } = this.props;
    return <div className={s.container}>{children}</div>;
  }
}

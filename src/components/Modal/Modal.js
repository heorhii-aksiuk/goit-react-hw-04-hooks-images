import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default function Modal({ closeModal, children }) {
  return (
    <div onClick={closeModal} className={s.overlay}>
      <div className={s.modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

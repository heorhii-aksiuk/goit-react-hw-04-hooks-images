import PropTypes from 'prop-types';
import s from './FallbackContainer.module.css';

export default function FallbackContainer({ children }) {
  return <div className={s.container}>{children}</div>;
}

FallbackContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

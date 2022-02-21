import './atom.styles.scss';

export function Description({ children, customClass = '' }) {
  return <p className={`description ${customClass}`}>{children}</p>;
}

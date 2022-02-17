import './atom.styles.scss';

export function Heading({ children, customClass = '' }) {
  return <h1 className={`heading ${customClass}`}>{children}</h1>;
}

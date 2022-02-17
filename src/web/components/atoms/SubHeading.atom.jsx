import './atom.styles.scss';

export function SubHeading({ children, customClass = '' }) {
  return <h1 className={`sub-heading ${customClass}`}>{children}</h1>;
}

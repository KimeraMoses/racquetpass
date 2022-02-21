import './MenuButton.styles.scss'

export const MenuButton = ({children}) => {
  return (
    <button className="menu-button">
      {children}
    </button>
  );
};

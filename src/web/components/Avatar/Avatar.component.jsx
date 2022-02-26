import './Avatar.styles.scss';

export const Avatar = ({ img, height, width }) => {
  return (
    <div className="avatar" style={{ height, width }}>
      <img src={img} alt="player" />
    </div>
  );
};

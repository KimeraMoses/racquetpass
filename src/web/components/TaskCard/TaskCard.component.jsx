import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './TaskCard.styles.scss';

export const TaskCard = ({ src, title, desc, name }) => {
  return (
    <div className="task-card">
      <div className="flex items-start justify-between">
        <div className="flex items-start justify-between task-card__details">
          <img alt="title" src={src} />
          <div className="info">
            <p className="title">{title}</p>
            <p className="sub-title">{desc}</p>
          </div>
        </div>
        <div className="name">{name}</div>
      </div>
    </div>
  );
};

TaskCard.defaultProps = {
  src: 'img/tasks/ImagesampleTask.png',
};

TaskCard.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
};

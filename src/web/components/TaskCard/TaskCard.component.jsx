import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './TaskCard.styles.scss';

export const TaskCard = ({ src, title, desc }) => {
  return (
    <Link to="/Tasks/Details" className="task-card">
      <div className="row">
        <img alt="title" src={src} />
        <div className="info">
          <p className="title">{title}</p>
          <p className="sub-title">{desc}</p>
        </div>
      </div>
    </Link>
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

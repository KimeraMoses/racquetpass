import './Modal.styles.scss';

export const Modal = ({
  heading = 'Mains and Crosses',
  text = 'Mains are the vertical strings and crosses are the horizontal strings. Some players like to use different strings or tensions between the two.',
  closeText = 'Got it',
  showModal,
  handleShow = () => {},
}) => {
  return (
    <div className={`modal ${showModal ? 'modal-show' : ''}`}>
      <div className="modal__inner">
        <div className="modal__inner-heading">{heading}</div>
        <div className="modal__inner-text">{text}</div>
        <div className="modal__inner-closeText" onClick={handleShow}>
          {closeText}
        </div>
      </div>
    </div>
  );
};

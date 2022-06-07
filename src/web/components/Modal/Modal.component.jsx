import { useEffect } from 'react';
import './Modal.styles.scss';

export const Modal = ({
  heading = 'Mains and Crosses',
  text = 'Mains are the vertical strings and crosses are the horizontal strings. Some players like to use different strings or tensions between the two.',
  closeText = 'Got it',
  showModal,
  customButtons,
  handleShow = () => {},
}) => {
  useEffect(() => {
    if (showModal) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [showModal]);

  return (
    <div className={`modal ${showModal ? 'modal-show' : ''}`}>
      <div className="modal__inner">
        <div className="modal__inner-heading">{heading}</div>
        <div className="modal__inner-text">{text}</div>
        {customButtons ? (
          <>{customButtons}</>
        ) : (
          <div className="modal__inner-closeText" onClick={handleShow}>
            {closeText}
          </div>
        )}
      </div>
    </div>
  );
};

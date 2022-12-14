import { useState } from 'react';
import { BackButton, Heading, StepButton, Modal } from 'web/components';
import './RemoveRequest.styles.scss';

const contactList = [
  {
    title: 'Emial',
    text: 'joesTennisPro@gmail.com',
  },
  {
    title: 'Phone',
    text: '(123) 4567-8910',
  },
  {
    title: 'Shop Name',
    text: 'Joe’s Tennis Pro',
  },
  {
    title: 'Address',
    text: `123 NE Street St Seattle, WA 98101`,
  },
];
export function RemoveRequest({ t, setCurrentScreen }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const ModalBottom = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          justifyContent: 'right',
        }}
      >
        <div onClick={handleShow}>Cancel</div>
        <div
          onClick={() => setCurrentScreen('payment')}
          style={{ color: '#EA5353' }}
        >
          Remove
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal
        showModal={show}
        handleShow={handleShow}
        heading="Remove this shop?"
        text="This will remove this shop from RacquetPass, preventing them from using the RacquetPass portal."
        closeText={<ModalBottom />}
      />
      <div className="remove-req">
        <div>
          <div className="remove-req__header">
            <BackButton onClick={() => setCurrentScreen('payment')} />
            <Heading>{t('adminRequestTitle')}</Heading>
          </div>
          <div className="remove-req__content">
            <div className="remove-req__content-info">
              <img src="/img/admin/info-circle.png" alt="info" />
              <div className="remove-req__content-info-desc">
                {t('adminInfo')}
              </div>
            </div>
            <div className="remove-req__content-heading">
              <Heading>{t('ShopContactHeading')}</Heading>
            </div>
            <div className="remove-req__content-text">
              {contactList.map(({ title, text }) => (
                <>
                  <div>
                    <div
                      className="admi-contact__content-text-heading"
                      key={title}
                    >
                      {title}
                    </div>
                    <div className="remove-req__content-text-txt">{text}</div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="remove-req__buttons">
          <StepButton danger onClick={handleShow}>
            Remove Shop from RacquetPass
          </StepButton>
        </div>
      </div>
    </>
  );
}

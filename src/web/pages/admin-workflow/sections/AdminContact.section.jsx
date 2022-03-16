import { BackButton, Heading, StepButton } from 'web/components';
import './AdminContact.styles.scss';

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

export function AdminContact({ t, setCurrentScreen }) {
  return (
    <>
      <div className="admin-contact">
        <div>
          <div className="admin-contact__header">
            <BackButton onClick={() => setCurrentScreen('request')} />
            <Heading>{t('adminRequestTitle')}</Heading>
          </div>
          <div className="admin-contact__content">
            <div className="admin-contact__content-heading">
              <Heading>{t('ShopContactHeading')}</Heading>
            </div>
            <div className="admin-contact__content-text">
              {contactList.map(({ title, text }) => (
                <>
                  <div>
                    <div
                      className="admi-contact__content-text-heading"
                      key={title}
                    >
                      {title}
                    </div>
                    <div className="admin-contact__content-text-txt">
                      {text}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="admin-contact__buttons">
          <StepButton>Remove</StepButton>
          <StepButton danger>Deny</StepButton>
        </div>
      </div>
    </>
  );
}

import { Fragment } from 'react';

import {
  BackButton,
  Heading,
  HeadingButton,
  RequestCard,
} from 'web/components';
import './AdminRequest.styles.scss';

const requests = [
  {
    title: `Joe's Tennis Pro`,
    text: 'JoesTennisPro@gmail.com',
  },
  {
    title: `Joe's Tennis Pro`,
    text: 'JoesTennisPro@gmail.com',
  },
  {
    title: `Joe's Tennis Pro`,
    text: 'JoesTennisPro@gmail.com',
  },
];

export function AdminRequest({ t, setCurrentScreen }) {
  return (
    <>
      <div className="admin-request">
        <div className="admin-request__header">
          <div className="admin-request__header-heading">
            <BackButton onClick={() => setCurrentScreen('default')} />
            <Heading>{t('adminRequestHeading')}</Heading>
          </div>
          <div>
            <HeadingButton text="Export" />
          </div>
        </div>
        <div className="admin-request__content">
          {requests.map((request, index) => (
            <Fragment key={index}>
              <RequestCard
                string={request}
                t={t}
                onClick={() => {
                  setCurrentScreen('contact');
                }}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

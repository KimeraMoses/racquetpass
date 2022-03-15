import {
  BackButton,
  Heading,
  HeadingButton,
  RequestCard,
} from 'web/components';
import './AdminRequest.styles.scss';

export function AdminRequest({ t }) {
  return (
    <>
      <div className="admin-request">
        <div className="admin-request__header">
          <div className="admin-request__header-heading">
            <BackButton />
            <Heading>{t('adminRequestHeading')}</Heading>
          </div>
          <div>
            <HeadingButton text="Export" />
          </div>
        </div>
        <div className="admin-request__content">
          <RequestCard t={t} />
          <RequestCard t={t} />
          <RequestCard t={t} />
          <RequestCard t={t} />
        </div>
      </div>
    </>
  );
}

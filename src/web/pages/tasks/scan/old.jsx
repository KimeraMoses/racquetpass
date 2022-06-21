import React from 'react';
import { withNamespaces } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { HeadingButton } from 'web/components';
import './index.styles.scss';

function Scan({ t }) {
  const navigate = useNavigate();
  return (
    <div className="scan-task-container">
      <div className="header-row">
        <HeadingButton drawer onClick={() => navigate('/inventory')} />
        <h1 className="header-row-heading">{t('taskScanHeading')}</h1>
      </div>
      <div className="scan-task-body">
        <div className="heading-row">
          <p className="title">{t('taskScanTitle')}</p>
          <p className="desc">{t('taskScanDesc')}</p>
        </div>
        <div className="scan-qr-container">
          <Link to="/Tasks/Scanned" className="img-container">
            <img alt="Scan QR" src="../img/tasks/scanqr.png" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withNamespaces()(Scan);

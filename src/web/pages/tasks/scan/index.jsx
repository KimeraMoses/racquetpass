import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import './index.styles.scss';

function Scan({ t }) {
  return (
    <div className='scan-task-container'>
      <div className='header-row'>
				<MenuButton>
          <img alt="Menu Icon" src="../svg/hamburgerMenu.svg" />
        </MenuButton>
        <h1 className='header-row-heading'>{t('taskScanHeading')}</h1>
      </div>
			<div className='scan-task-body'>
				<div className='heading-row'>
					<p className='title'>{t('taskScanTitle')}</p>
					<p className='desc'>{t('taskScanDesc')}</p>
				</div>
				<div className='scan-qr-container'>
					<a href="/Tasks/Scanned" className='img-container'>
						<img alt="Scan QR" src="../img/tasks/scanqr.png" />
					</a>
				</div>
			</div>
    </div>
  );
}

export default withNamespaces()(Scan);

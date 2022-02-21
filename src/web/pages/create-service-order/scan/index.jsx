import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import './index.styles.scss';

function ScanOrder({ t }) {
  return (
    <div className='scan-order-container'>
      <div className='header-row'>
				<MenuButton>
          <a href="/CreateOrder/Locker"><img alt="Left Arrow" src="../svg/arrowLeft.svg" /></a>
        </MenuButton>
        <h1 className='header-row-heading'>{t('orderScanHeading')}</h1>
      </div>
			<div className='scan-order-body'>
				<div className='heading-row'>
					<p className='title'>{t('orderScanTitle')}</p>
					<p className='desc'>{t('orderScanDesc')}</p>
				</div>
				<div className='scan-qr-container'>
					<a href="/CreateOrder/Scanned" className='scan-link'>Scan</a>
					<div className='img-container'>
						<img alt="Scan QR" src="../img/tasks/scanqr.png" />
					</div>
				</div>
			</div>
    </div>
  );
}

export default withNamespaces()(ScanOrder);

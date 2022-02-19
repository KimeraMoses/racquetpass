import React from 'react';
import { withNamespaces } from 'react-i18next';
import { CustomButton } from 'web/components';
import { MenuButton } from 'web/components';
import './index.styles.scss';

function OrderScanned({ t }) {
  return (
    <div className='scanned-order-container'>
      <div>
        <div className='header-row'>
					<MenuButton>
						<a href="/CreateOrder/Scan"><img alt="Left Arrow" src="../svg/arrowLeft.svg" /></a>
					</MenuButton>
          <h1 className='header-row-heading'>{t('createOrderScannedHeading')}</h1>
        </div>
				<div className='heading-row'>
					<p className='title'>{t('orderScanTitle')}</p>
					<p className='desc'>{t('orderScanDesc')}</p>
				</div>

				<div className='scanned-card'>
					<div className='card-line'></div>
					<div className='title'>{t('orderScannedTitle')}</div>

          <div className='racquet-details'>
            <div className='racquet-label'>{t('orderScannedBrandHeading')}</div>
            <div className='racquet-desc'>{t('orderScannedBrandDesc')}</div>
            <div className='racquet-label'>{t('orderScannedModelHeading')}</div>
            <div className='racquet-desc'>{t('orderScannedModelDesc')}</div>
            <div className='racquet-label'>{t('orderScannedStringHeading')}</div>
            <div className='racquet-desc'>{t('orderScannedStringDesc')}</div>
          </div>
					<div className='scan-msg'>
						{t('orderScannedMsg')}
						<a className='link' href="/">{t('orderRescan')}</a>
					</div>
				</div>
      </div>

      <div className='btn-container'>
				<CustomButton size="lg" btn="primary"><a href="/CreateOrder/Details">{t('orderScannedComplete')}</a></CustomButton>
      </div>
    </div>
  );
}

export default withNamespaces()(OrderScanned);

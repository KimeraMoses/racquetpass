import React from 'react';
import { withNamespaces } from 'react-i18next';
import { CustomButton } from 'web/components';
import { ServiceOrderStatus } from 'web/components';
import './index.styles.scss';

function OrderScanned({ t }) {
  return (
    <div className='order-scanned-container'>
      <div>
        <div className='header-row'>
          <h1 className='header-row-heading'>{t('taskScannedHeading')}</h1>
        </div>

				<div className='scanned-card'>
					<div className='card-line'></div>
					<div className='title'>{t('taskScannedTitle')}</div>
					<div className='status-container'>
						<ServiceOrderStatus state="partial" status={true} t={t}>
							<img alt="Menu Icon" src="../svg/calender.svg" />
						</ServiceOrderStatus>
					</div>

          <div className='racquet-info'>
            <img className='img' alt="racquet" src='../img/tasks/racquet.png'/>
            <div className='brand'>
              <div className='model'>{t('taskScannedBrand')}</div>
              <div className='brand-title'>{t('taskScannedBrandTitle')}</div>
            </div>
          </div>

          <div className='racquet-details'>
            <div className='racquet-label'>{t('taskScannedMainsHeading')}</div>
            <div className='racquet-desc'>{t('taskScannedMainsDesc')}</div>
            <div className='racquet-label'>{t('taskScannedCrossesHeading')}</div>
            <div className='racquet-desc'>{t('taskScannedCrossesDesc')}</div>
          </div>
					<div className='scan-msg'>
						{t('taskScannedMsg')}
						<a className='link' href="/">{t('taskRescan')}</a>
					</div>
				</div>
      </div>

      <div className='btn-container'>
				<CustomButton size="lg" btn="primary">{t('taskScannedComplete')}</CustomButton>
        <CustomButton size="lg" btn="secondary">{t('taskScannedComplete')}</CustomButton>
      </div>
    </div>
  );
}

export default withNamespaces()(OrderScanned);

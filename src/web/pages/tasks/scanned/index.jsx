import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import { TaskStatus } from 'web/components';
import './index.styles.scss';

function Scanned({ t }) {
  return (
    <div className='task-scanned-container'>
      <div>
        <div className='header-row'>
          <MenuButton>
            <a href="/Tasks/Scan">
              <img alt="Menu Icon" src="../svg/arrowLeft.svg" />
            </a>
          </MenuButton>
          <h1 className='header-row-heading'>{t('taskScannedHeading')}</h1>
        </div>

				<div className='scanned-card'>
					<div className='card-line'></div>
					<div className='title'>{t('taskScannedTitle')}</div>
					<div className='status-container'>
						<TaskStatus>          
							<img className='icon' alt="calender" src='../svg/calender.svg' />
							{t('taskScannedDueDate')}
						</TaskStatus> 
					</div>

          <div className='racquet-info'>
            <img className='img' alt="racquet" src='../img/tasks/racquet.png'/>
            <div className='brand'>
              <div className='model'>{t('taskScannedBrand')}</div>
              <div className='brand-title'>{t('taskScannedBrandTitle')}</div>
            </div>
          </div>

          <div className='string-details'>
            <div className='string-label'>{t('taskScannedMainsHeading')}</div>
            <div className='string-desc'>{t('taskScannedMainsDesc')}</div>
            <div className='string-label'>{t('taskScannedCrossesHeading')}</div>
            <div className='string-desc'>{t('taskScannedCrossesDesc')}</div>
          </div>
					<div className='scan-msg'>
						{t('taskScannedMsg')}
						<a className='link' href="/">{t('taskRescan')}</a>
					</div>
				</div>
      </div>

      <div>
        <CustomButton size="lg" btn="primary">{t('taskScannedComplete')}</CustomButton>
      </div>
    </div>
  );
}

export default withNamespaces()(Scanned);

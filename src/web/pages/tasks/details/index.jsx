import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import { TaskStatus } from 'web/components';
import './index.styles.scss';
          
function Details({ t }) {
  return (
    <div className='task-detail-container'>
      <div>
        <div className='header-row'>
          <MenuButton>
            <a href="/tasks">
              <img alt="Menu Icon" src="../svg/arrowLeft.svg" />
            </a>
          </MenuButton>
          <h1 className='header-row-heading'>{t('taskHeading')}</h1>
        </div>
        <div className='status-container'>
          {/* due task */}
          {/* <TaskStatus>          
            <img className='icon' alt="calender" src='../svg/calender.svg' />
            {t('taskOpenedDueDate')}
          </TaskStatus> */}
          {/* completed task */}
          <TaskStatus status>          
            <img className='icon' alt="tick" src='../svg/tick.svg' />
            {t('taskCompleted')}
          </TaskStatus>
        </div>
        <div className='detail-body-container'>
          <div className='racquet-info'>
            <img className='img' alt="racquet" src='../img/tasks/racquet.png'/>
            <div className='brand'>
              <div className='model'>{t('taskOpenedBrand')}</div>
              <div className='title'>{t('taskOpenedBrandTitle')}</div>
            </div>
          </div>
          <div className='string-details'>
            <div className='title'>{t('taskOpenedStringTitle')}</div>
            <div className='string-label'>{t('taskOpenedStringMainsHeading')}</div>
            <div className='string-desc'>{t('taskOpenedStringMainsDesc')}</div>
            <div className='string-label'>{t('taskOpenedStringCrossesHeading')}</div>
            <div className='string-desc'>{t('taskOpenedStringCrossesDesc')}</div>
          </div>
          <div className='player-details'>
            <div className='title-row'>
              <div className='title'>{t('taskOpenedPlayerTitle')}</div>
              <a href="/" className='link'>{t('taskOpenedPlayerProfile')}</a>
            </div>
            <div className='player-label'>{t('taskOpenedPlayerNameHeading')}</div>
            <div className='player-desc'>{t('taskOpenedPlayerName')}</div>
            <div className='player-label'>{t('taskOpenedPlayerPhoneHeading')}</div>
            <div className='player-desc'>
              <a href="/">{t('taskOpenedPlayerPhone')}</a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <CustomButton size="lg" btn="secondary">{t('taskReopened')}</CustomButton>
      </div>
    </div>
  );
}

export default withNamespaces()(Details);

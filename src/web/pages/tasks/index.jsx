import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import { TaskCard } from 'web/components';
import './index.styles.scss';

function Tasks({ t }) {
  return (
    <div className='tasks-container'>
      <div className='header-row'>
			  <MenuButton>
          <img alt="Menu Icon" src="svg/hamburgerMenu.svg" />
        </MenuButton>
        <h1 className='header-row-heading'>{t('taskHeading')}</h1>
        <CustomButton size='sm' btn='white'><a href='/Tasks/Scan'>{t('taskScan')}</a></CustomButton>
      </div>
      <div className='tasks-body'>
        <div className='task-row'>
          <p className='title'>{t('taskTitle')}</p>
          <a href="/" className='link'>{t('taskShowCompleted')}</a>
        </div>
        <div className='task-row'>
          <p className='tasks-info'>{t('taskDueToday')}</p>
          <div className='badge'>3</div>
        </div>
        <div className='cards-container'>
          <TaskCard title={t('taskCardHeading')} desc={t('taskCardDesc')}></TaskCard>
          <TaskCard title={t('taskCardHeading')} desc={t('taskCardDesc')}></TaskCard>
          <TaskCard title={t('taskCardHeading')} desc={t('taskCardDesc')}></TaskCard>
        </div>
        <div className='task-row'>
          <p className='tasks-info'>{t('taskDueWeek')}</p>
          <div className='badge'>8</div>
        </div>
        <div className='cards-container'>
          <TaskCard title={t('taskCardHeading')} desc={t('taskCardDesc')}></TaskCard>
          <TaskCard title={t('taskCardHeading')} desc={t('taskCardDesc')}></TaskCard>
          <TaskCard title={t('taskCardHeading')} desc={t('taskCardDesc')}></TaskCard>
          <TaskCard title={t('taskCardHeading')} desc={t('taskCardDesc')}></TaskCard>
          <TaskCard title={t('taskCardHeading')} desc={t('taskCardDesc')}></TaskCard>
          <TaskCard title={t('taskCardHeading')} desc={t('taskCardDesc')}></TaskCard>
          <TaskCard title={t('taskCardHeading')} desc={t('taskCardDesc')}></TaskCard>
          <TaskCard title={t('taskCardHeading')} desc={t('taskCardDesc')}></TaskCard>
        </div>
      </div>
    </div>
  );
}

export default withNamespaces()(Tasks);

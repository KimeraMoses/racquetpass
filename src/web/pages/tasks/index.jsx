import React from 'react';
import { withNamespaces } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { HeadingButton, CustomButton, TaskCard } from 'web/components';
import './index.styles.scss';

function Tasks({ t }) {
  const navigate = useNavigate();
  return (
    <div className="tasks-container">
      <div className="header-row">
        <HeadingButton
          drawer
          onClick={() => navigate('/inventory?backFrom=tasks')}
        />
        <h1 className="header-row-heading">{t('taskHeading')}</h1>
        <CustomButton size="sm" btn="white">
          <a href="/Tasks/Scan">{t('taskScan')}</a>
        </CustomButton>
      </div>
      <div className="tasks-body">
        <div id="due-tasks">
          <div className="task-row">
            <p className="title">{t('taskTitle')}</p>
            <p className="link" onClick={showCompletedTasks}>
              {t('taskShowCompleted')}
            </p>
          </div>
          <div className="task-row">
            <p className="tasks-info">{t('taskDueToday')}</p>
            <div className="badge">3</div>
          </div>
          <div className="cards-container">
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
          </div>
          <div className="task-row">
            <p className="tasks-info">{t('taskDueWeek')}</p>
            <div className="badge">8</div>
          </div>
          <div className="cards-container">
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
          </div>
        </div>
        <div id="completed-tasks">
          <div className="task-row">
            <p className="title">{t('taskCompleted')}</p>
            <a className="link" onClick={showDueTasks}>
              {t('taskHideCompleted')}
            </a>
          </div>
          <div className="task-row">
            <p className="tasks-info">{t('taskDueWeek')}</p>
            <div className="badge">11</div>
          </div>
          <div className="cards-container">
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
            <TaskCard
              title={t('taskCardHeading')}
              desc={t('taskCardDesc')}
            ></TaskCard>
          </div>
        </div>
      </div>
    </div>
  );
}
function showCompletedTasks() {
  document.getElementById('due-tasks').style.display = 'none';
  document.getElementById('completed-tasks').style.display = 'block';
}
function showDueTasks() {
  document.getElementById('due-tasks').style.display = 'block';
  document.getElementById('completed-tasks').style.display = 'none';
}

export default withNamespaces()(Tasks);

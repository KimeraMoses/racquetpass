import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import { TaskStatus } from 'web/components';
import { StepButton } from 'web/components/Buttons/StepButton.componet';
import { SubmitButton } from 'web/components/Buttons/SubmitButton.component';
import './index.styles.scss';

function Scanned({ t }) {
  return (
    <div className="task-scanned-container">
      <div>
        <div className="header-row">
          <MenuButton>
            <a href="/Tasks/Scan">
              <img alt="Menu Icon" src="../svg/arrowLeft.svg" />
            </a>
          </MenuButton>
          <h1 className="header-row-heading">
            We found an order associated with this QR code!
          </h1>
        </div>

        <div className="scanned-card">
          <div className="card-line"></div>
          <div className="title">Order #312</div>
          <div className="status-container">
            <TaskStatus>
              <img className="icon" alt="calender" src="../svg/calender.svg" />
              {t('taskScannedDueDate')}
            </TaskStatus>
          </div>

          <div className="racquet-info">
            <img className="img" alt="racquet" src="../img/tasks/racquet.png" />
            <div className="brand">
              <div className="model">{t('taskScannedBrand')}</div>
              <div className="brand-title">{t('taskScannedBrandTitle')}</div>
            </div>
          </div>

          <div className="string-details grid grid-cols-[3fr_1fr] mb-[0px]">
            <div>
              <div className="string-label">{t('taskScannedMainsHeading')}</div>
              <div className="string-desc">Luxilon Alu Rough 1.6 G</div>
            </div>
            <div>
              <div className="string-label">Tension</div>
              <div className="string-desc">42 lbs</div>
            </div>
            <div>
              <div className="string-label">
                {t('taskScannedCrossesHeading')}
              </div>
              <div className="string-desc">Luxilon Alu Rough 1.6 G</div>
            </div>
            <div>
              <div className="string-label">Tension</div>
              <div className="string-desc">42 lbs</div>
            </div>
            <div>
              <div>
                <div className="string-label">Player Name</div>
                <div className="string-desc">Rafael Nadal</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scan-msg">
        <a className="link" href="/">
          {t('taskRescan')}
        </a>
      </div>

      <div>
        <CustomButton size="lg" btn="primary">
          View Details
        </CustomButton>
        <SubmitButton outlined className="mt-[12px]">
          Contact Player
        </SubmitButton>
      </div>
    </div>
  );
}

export default withNamespaces()(Scanned);

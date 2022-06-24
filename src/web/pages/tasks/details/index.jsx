import React, { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { TaskStatus } from 'web/components';
import { SubmitButton } from 'web/components/Buttons/SubmitButton.component';
import { Modal } from 'web/components/index';
import { Link } from 'react-router-dom';
import './index.styles.scss';

function Details({ t }) {
  const [show, setShow] = useState(false);
  const [complete, setComplete] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  return (
    <div className="task-detail-container">
      <Modal
        heading="Reopen this task to fix your mistake"
        showModal={show}
        text={
          <div className="mt-[20px] mb-[32px] flex flex-col gap-[20px]">
            <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
              If you made a mistake, reopen this task to give yourself time to
              fix it. This will text the player that their order is still in
              progress.
            </p>

            <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
              Once you are done fixing your mistake, mark the task as completed.
            </p>
          </div>
        }
        customButtons={
          <div className="flex justify-end gap-[12px] items-center">
            <div
              className="text-[#EA5353] text-[18px] font-medium"
              onClick={() => setShow(false)}
            >
              Cancel
            </div>
            <div
              className="text-[#304FFE] text-[18px] font-medium"
              onClick={() => {
                setShow(false);
                setJustCompleted(false);
                setComplete(false);
              }}
            >
              Reopen Task
            </div>
          </div>
        }
      />
      {/* <div> */}
      <div className="header-row">
        <MenuButton>
          <Link to="/tasks/scan">
            <img alt="Menu Icon" src="../svg/arrowLeft.svg" />
          </Link>
        </MenuButton>
        <h1 className="header-row-heading">Order #312</h1>
      </div>
      <div className="detail-body-container">
        <div className="status-container">
          {complete ? (
            <TaskStatus status>
              <img className="icon" alt="tick" src="../svg/tick.svg" />
              {t('taskCompleted')}
            </TaskStatus>
          ) : (
            <TaskStatus>
              <img className="icon" alt="calender" src="../svg/calender.svg" />
              {t('taskScannedDueDate')}
            </TaskStatus>
          )}
        </div>
        <div className="racquet-info">
          <img className="img" alt="racquet" src="../img/tasks/racquet.png" />
          <div className="brand">
            <div className="model">{t('taskOpenedBrand')}</div>
            <div className="title">{t('taskOpenedBrandTitle')}</div>
          </div>
        </div>

        <div className="string-details-details">
          <div className="font-semibold text-[24px] text-[#3c3c3c]">
            Desired String Settings
          </div>
          <div className="grid grid-cols-[3fr_1fr] mb-[0px]">
            <div>
              <div className="string-label">{t('taskScannedMainsHeading')}</div>
              <div className="string-desc-details">Luxilon Alu Rough 1.6 G</div>
            </div>
            <div>
              <div className="string-label">Tension</div>
              <div className="string-desc-details">42 lbs</div>
            </div>
            <div className="col-span-full text-[12px] text-[#545454] font-medium mt-[5px] mb-[20px]">
              This player should've brought these strings. Contact them if they
              forgot to or didn't bring enough.
            </div>
            <div>
              <div className="string-label">
                {t('taskScannedCrossesHeading')}
              </div>
              <div className="string-desc-details">Luxilon Alu Rough 1.6 G</div>
            </div>
            <div>
              <div className="string-label">Tension</div>
              <div className="string-desc-details">42 lbs</div>
            </div>
            <div className="col-span-full text-[12px] text-[#545454] font-medium mt-[5px] mb-[20px]">
              This player should've brought these strings. Contact them if they
              forgot to or didn't bring enough.
            </div>
          </div>
        </div>

        <div className="player-details">
          <div className="title-row">
            <div className="title">{t('taskOpenedPlayerTitle')}</div>
          </div>
          <div className="player-label">{t('taskOpenedPlayerNameHeading')}</div>
          <div className="player-desc-details">{t('taskOpenedPlayerName')}</div>
          <div className="mt-[8px] text-[#545454] text-[12px] font-medium">
            If this is missing from the racquet's QR sticker, make sure to write
            it in.
          </div>
          <div className="player-label mt-[14px]">
            {t('taskOpenedPlayerPhoneHeading')}
          </div>
          <div className="player-desc text-[#304FFE]">
            <a href="tel:(123) 456-7890">(123) 456-7890</a>
          </div>
        </div>

        <div className="string-details-details">
          <div className="font-semibold text-[24px] text-[#3c3c3c]">
            Order Details
          </div>
          <div className="grid grid-cols-[1fr_1fr] mb-[0px]">
            <div>
              <div className="string-label">Order Number</div>
              <div className="string-desc-details">312</div>
            </div>

            <div>
              <div className="string-label">Price</div>
              <div className="string-desc-details">$50.00</div>
            </div>
          </div>
        </div>

        <div>
          {complete && !justCompleted ? (
            <div
              className="text-[16px] text-[#304fee] font-semibold text-center mt-[40px]"
              onClick={() => setShow(true)}
            >
              Tap here if you made a mistake stringing this racquet
            </div>
          ) : complete && justCompleted ? (
            <div className="just-completed-box flex items-center gap-[14px] mt-[40px]">
              <div className="just-completed-box__text">
                Completed task and notified Rafael Nadal
              </div>
              <div
                className="just-completed-box__undo"
                onClick={() => setComplete(false)}
              >
                Undo
              </div>
            </div>
          ) : (
            <SubmitButton
              className="mt-[40px]"
              onClick={() => {
                setComplete(true);
                setJustCompleted(true);
                setTimeout(() => {
                  setJustCompleted(false);
                }, 15000);
              }}
            >
              Complete Order
            </SubmitButton>
          )}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default withNamespaces()(Details);

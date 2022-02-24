import { Field } from 'redux-form';
import { Link } from 'react-router-dom';

import {
  Heading,
  HeadingButton,
  CustomInput,
  Description,
  SubmitButton
} from 'web/components';
import './EditRacquetInfo.styles.scss';


export function EditRacquetInfo({ t }) {
  return (
    <>
      <div className="edit">
        <div className="edit__header">
          <div className="edit__header-heading">
            <Heading>{t('editRacquetInfo')}</Heading>
          </div>
          <HeadingButton close />
        </div>

        <div className="edit__info-buttons">Two Buttons</div>

        <div className="edit__image">
          <img src="/img/orderWithoutAccount/racquet.png" alt="image" />
        </div>
        <div className="edit__form">
          <Field
            name="brand"
            label="Brand"
            type="text"
            component={CustomInput}
          />
          <Field
            name="model"
            label="Model"
            type="text"
            component={CustomInput}
          />
          <Field
            name="nickname"
            label="Nickname (Optional)"
            placeholder="Nickname"
            type="text"
            component={CustomInput}
          />
        </div>

        <div className="edit__qr">
          <Description customClass="edit__qr-text">{t('cofigQR')}</Description>
          <Link to="#" className="edit__qr-link">
            {t('configWhatLink')}
          </Link>
        </div>
        <div className="edit__qrImage">
          <button className="edit__qrImage-button">
            <img
              src="/img/configureRacquet/camera.png"
              alt="camera"
              className="edit__qrImage-button-img"
            />
          </button>
          <div>
            <Description>{t('configQRText')}</Description>
            <Description>{t('configQRText1')}</Description>
          </div>
        </div>
        <div className="edit__button">
          <SubmitButton>{t('stringDetailsSave')}</SubmitButton>
        </div>
      </div>
    </>
  );
}

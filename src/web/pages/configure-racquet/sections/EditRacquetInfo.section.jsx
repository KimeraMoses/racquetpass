import { Field } from 'redux-form';
import { Link } from 'react-router-dom';

import {
  Heading,
  HeadingButton,
  CustomInput,
  Description,
  SubmitButton,
  FileInput,
  CustomSelect,
} from 'web/components';
import './EditRacquetInfo.styles.scss';

export function EditRacquetInfo({ t, setStep, setStrings, change }) {
  return (
    <>
      <div className="edit-racquet">
        <div className="edit-racquet__header">
          <div className="edit-racquet__header-heading">
            <Heading>{t('editRacquetInfo')}</Heading>
          </div>
          <HeadingButton close onClick={() => setStep(5)} />
        </div>

        <div
          className="edit-racquet__info-buttons"
          onClick={() => setStrings(true)}
        >
          <div className="edit-racquet__info-button edit-racquet__info-button-active">
            Basic Info
          </div>
          <div className="edit-racquet__info-button">Strings</div>
        </div>

        <div className="edit-racquet__image">
          <Field
            name="racquetImage"
            label="Picture (optional)"
            type="file"
            accept="image/*"
            background={'/img/orderWithoutAccount/racquet.png'}
            component={FileInput}
            change={change}
          />
        </div>
        <div className="edit-racquet__form">
          <Field
            name="brand"
            label="Brand"
            placeholder="Select"
            component={CustomSelect}
            options={[
              { label: 'Brand 1', value: 'b1' },
              { label: 'Brand 2', value: 'b2' },
              { label: 'Brand 3', value: 'b3' },
              { label: 'Brand 4', value: 'b4' },
            ]}
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

        <div className="edit-racquet__qr">
          <Description customClass="edit-racquet__qr-text">
            {t('configQR')}
          </Description>
          <Link to="#" className="edit-racquet__qr-link">
            {t('configWhatLink')}
          </Link>
        </div>
        <div className="edit-racquet__qrImage">
          <button className="edit-racquet__qrImage-button">
            <img
              src="/img/configureRacquet/camera.png"
              alt="camera"
              className="edit-racquet__qrImage-button-img"
            />
          </button>
          <div className="edit-racquet__qrImage-text">
            <Description>{t('configQRText')}</Description>
            <Description>{t('configQRText1')}</Description>
          </div>
        </div>
        <div className="edit-racquet__button">
          <SubmitButton onClick={() => setStep(5)}>
            {t('stringDetailsSave')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}

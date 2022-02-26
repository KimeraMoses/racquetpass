import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import {
  Heading,
  HeadingButton,
  CustomInput,
  Description,
  SubmitButton,
  FileInput,
} from 'web/components';
import './AboutRacquet.styles.scss';

export function AboutRacquet({ t, setStep, change }) {
  return (
    <>
      <div className="about">
        <div className="about__header">
          <div className="about__header-heading">
            <Heading>{t('configHeading')}</Heading>
          </div>
          <HeadingButton close onClick={() => setStep(1)} />
        </div>

        <div className="about__image">
          <Field
            name="racquetImage"
            label="Picture (optional)"
            type="file"
            accept="image/*"
            component={FileInput}
            change={change}
          />
        </div>
        <div className="about__form">
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

        <div className="about__qr">
          <Description customClass="about__qr-text">
            {t('configQR')}
          </Description>
          <Link to="#" className="about__qr-link">
            {t('configWhatLink')}
          </Link>
        </div>
        <div className="about__qrImage">
          <button className="about__qrImage-button">
            <img
              src="/img/configureRacquet/camera.png"
              alt="camera"
              className="about__qrImage-button-img"
            />
          </button>
          <div className="about__qrImage-text">
            <Description>{t('configQRText')}</Description>
            <Description>{t('configQRText1')}</Description>
          </div>
        </div>
        <div className="about__button">
          <SubmitButton
            onClick={() => {
              setStep(4);
            }}
          >
            {t('odrNext')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}

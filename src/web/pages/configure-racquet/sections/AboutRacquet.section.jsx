import { Field } from 'redux-form';
import { Link } from 'react-router-dom';

import {
  Heading,
  HeadingButton,
  CustomInput,
  Description,
  SubmitButton,
} from 'web/components';
import './AboutRacquet.styles.scss';

export function AboutRacquet({ t }) {
  return (
    <>
      <div className="about">
        <div className="about__header">
          <div className="about__header-heading">
            <Heading>{t('configHeading')}</Heading>
          </div>
          <HeadingButton close />
        </div>

        <div className="about__image">picture upload</div>
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
          <Description customClass="about__qr-text">{t('cofigQR')}</Description>
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
          <div>
            <Description>{t('configQRText')}</Description>
            <Description>{t('configQRText1')}</Description>
          </div>
        </div>
        <div className="about__button">
          <SubmitButton>{t('odrNext')}</SubmitButton>
        </div>
      </div>
    </>
  );
}

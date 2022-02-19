import { Field } from 'redux-form';

// Custom Components
import {
  Heading,
  Description,
  HeadingButton,
  CustomInputNumber,
  InfoButton,
  CustomOrderSelect,
  CustomSwitch,
} from 'web/components';

// Styles
import './SelectStringWithMainCross.styles.scss';

export function SelectStringWithMainCross({ t, backward }) {
  return (
    <>
      <div className="select-string-mc">
        <div className="select-string-mc__heading">
          <Heading customClass="select-string-mc__heading-text">
            {t('odrSelect')}
          </Heading>
          <HeadingButton close onClick={backward} />
        </div>
        <div className="select-string-mc__text-container">
          <Description customClass="select-string-mc__text-container-text">
            {t('odrSelectDesc')}
          </Description>
        </div>
        <div className="select-string-mc__main-info">
          <div className="select-string-mc__main-info-heading">
            <Heading>{t('odrMain')}</Heading>
            <InfoButton />
          </div>
          <div className="select-string-mc__main-info-select">
            <CustomOrderSelect label="String Type" />
          </div>
          <div className="select-string-mc__main-info-number">
            <Field
              name="mains-tension"
              label="Tension"
              type="number"
              link={{ text: 'Change Units', path: '#' }}
              component={CustomInputNumber}
            />
          </div>
        </div>
        <div className="select-string-mc__crosses-info">
          <div className="select-string-mc__crosses-info-heading">
            <Heading>{t('odrcross')}</Heading>
            <InfoButton />
          </div>
          <div className="select-string-mc__crosses-info-select">
            <CustomOrderSelect label="String Type" />
          </div>
          <div className="select-string-mc__crosses-info-number">
            <Field
              name="crosses-tension"
              label="Tension"
              type="number"
              link={{ text: 'Change Units', path: '#' }}
              component={CustomInputNumber}
            />
          </div>
        </div>
        <div className="select-string-mc__hybrid-settings">
          <div className="select-string-mc__hybrid-settings-text">
            Use Hybrid Settings
          </div>
          <div className="select-string-mc__hybrid-settings-switch">
            <Field name="hybrid" component={CustomSwitch} />
          </div>
        </div>
        <div className="select-string-mc__total-price">
          <h3 className="select-string-mc__total-price-heading">Total Price</h3>
          <p className="select-string-mc__total-price-value">$0</p>
        </div>
      </div>
    </>
  );
}

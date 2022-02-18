import { useRef, useState } from 'react';
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
import './SelectString.styles.scss';

export function SelectString({ t }) {
  return (
    <>
      <div className="select-string">
        <div className="select-string__heading">
          <Heading customClass="select-string__heading-text">
            {t('odrSelect')}
          </Heading>
          <HeadingButton close />
        </div>
        <div className="select-string__text-container">
          <Description customClass="select-string__text-container-text">
            {t('odrSelectDesc')}
          </Description>
        </div>
        <div className="select-string__main-info">
          <div className="select-string__main-info-select">
            <CustomOrderSelect label="String Type" />
          </div>
          <div className="select-string__main-info-number">
            <Field
              name="mains-tension"
              label="Tension"
              type="number"
              link={{ text: 'Change Units', path: '#' }}
              component={CustomInputNumber}
            />
          </div>
        </div>
        <div className="select-string__hybrid-settings">
          <div className="select-string__hybrid-settings-text">
            Use Hybrid Settings
          </div>
          <div className="select-string__hybrid-settings-switch">
            <Field name="hybrid" component={CustomSwitch} />
          </div>
        </div>
        <div className="select-string__total-price">
          <h3 className="select-string__total-price-heading">Total Price</h3>
          <p className="select-string__total-price-value">$0</p>
        </div>
      </div>
    </>
  );
}

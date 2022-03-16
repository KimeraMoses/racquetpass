import { Field } from 'redux-form';
import { useSelector } from 'react-redux';
// Custom Components
import {
  Heading,
  Description,
  HeadingButton,
  CustomInputNumber,
  InfoButton,
  CustomOrderSelect,
  CustomSwitch,
  CustomInput,
  CustomSelect,
} from 'web/components';

// Styles
import './SelectStringWithMainCross.styles.scss';

export function SelectStringWithMainCross({
  t,
  backward,
  setStep,
  setMainCross,
  setMain,
  setCross,
}) {
  const main = useSelector((state) => state?.form?.signup?.values?.main);
  const cross = useSelector((state) => state?.form?.signup?.values?.cross);
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
          </div>
          <div className="select-string-mc__main-info-select">
            <CustomOrderSelect
              label="String Type"
              link="Select"
              value={main?.name}
              onSelectClick={() => {
                setMain(true);
                setCross(false);
                setMainCross({ current: 'search' });
              }}
            />
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
          </div>
          <div className="select-string-mc__crosses-info-select">
            <CustomOrderSelect
              label="String Type"
              link="Select"
              value={cross?.name}
              onSelectClick={() => {
                setMain(false);
                setCross(true);
                setMainCross({ current: 'search' });
              }}
            />
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
            <CustomSwitch
              handleChange={() => {
                setMain(false);
                setCross(false);
                setStep(2);
              }}
              checked={true}
            />
            <InfoButton />
          </div>
        </div>
        <div className="select-string-mc__total-price">
          <h3 className="select-string-mc__total-price-heading">Total Price</h3>
          <p className="select-string-mc__total-price-value">$0</p>
        </div>
        <div className="select-string__recquet-heading">
          <Heading>{t('odrdetailHeading')} (Optional)</Heading>
          <Description>{t('odrAboutDesc')}</Description>
        </div>
        <div className="select-string__recquet-form">
          <Field
            name="brand"
            label="Brand"
            placeholder="Selec a racquet brand"
            component={CustomSelect}
            options={[
              { label: 'Babolat', value: 'Babolat' },
              { label: 'Wilson', value: 'Wilson' },
              { label: 'Head', value: 'Head' },
              { label: 'Prince', value: 'Prince' },
              { label: 'Yonex', value: 'Yonex' },
              { label: 'Volkl', value: 'Volkl' },
              { label: 'Dunlop', value: 'Dunlop' },
              { label: 'Technifibre', value: 'Technifibre' },
              { label: 'Prokennex', value: 'Prokennex' },
              { label: 'Solinco', value: 'Solinco' },
              { label: 'Gamma', value: 'Gamma' },
              { label: 'Lacoste', value: 'Lacoste' },
              { label: 'Donnay', value: 'Donnay' },
              { label: 'Other', value: 'Other' },
            ]}
          />
          <Field
            name="model"
            label="Model (Optional)"
            placeholder="Model"
            type="text"
            component={CustomInput}
          />
        </div>
      </div>
    </>
  );
}

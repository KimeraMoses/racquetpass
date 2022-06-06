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
import { FileInput } from 'web/components/formFields/index';
import { useState } from 'react';
import { Modal } from 'web/components/index';

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

  const [modal, setModal] = useState(false);
  return (
    <>
      <Modal
        showModal={modal}
        handleShow={() => setModal(!modal)}
        heading="Use hybrid strings for further customization"
        text={
          <div className="flex flex-col gap-[24px] mt-[18px]">
            <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
              Enable “use hybrid strings” to use different strings for mains and
              crosses.
            </p>
            <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
              Mains are the vertical strings and crosses are the horizontal
              strings.
            </p>
          </div>
        }
        closeText="Got it"
      />
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
            <InfoButton onClick={() => setModal(!modal)} />
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
          <div className="select-string-odr__recquet-form-pic-box">
            <Field
              name="image"
              label="Picture (optional)"
              component={FileInput}
            />
            <Description>
              Adding a picture makes it easy for your stringer to pick out your
              racquet from others.
            </Description>
          </div>
        </div>
      </div>
    </>
  );
}

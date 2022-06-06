import { useState } from 'react';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';
// Custom Components
import {
  Heading,
  Description,
  CustomSelect,
  CustomInputNumber,
  InfoButton,
  CustomOrderSelect,
  CustomSwitch,
  CustomInput,
  Modal,
  BackButton,
  FileInput,
} from 'web/components';

// Styles
import './SelectString.styles.scss';

export function SelectString({ t, backward, setStringsCurrent, setStep }) {
  const [modal, setModal] = useState(false);

  const handleShow = () => {
    setModal((modal) => !modal);
  };

  const brand = useSelector((state) => state?.form?.signup?.values?.brand);

  return (
    <>
      <div className="select-string-odr">
        <Modal
          showModal={modal}
          handleShow={handleShow}
          heading="Use hybrid strings for further customization"
          text={
            <div className="flex flex-col gap-[24px] mt-[18px]">
              <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
                Enable “use hybrid strings” to use different strings for mains
                and crosses.
              </p>
              <p className="text-[rgba(51,51,51,0.8)] text-[14px]">
                Mains are the vertical strings and crosses are the horizontal
                strings.
              </p>
            </div>
          }
          closeText="Got it"
        />
        <div className="select-string-odr__heading">
          <BackButton onClick={backward} />
          <Heading>{t('odrSelect')}</Heading>
        </div>
        <div className="select-string-odr__text-container">
          <Description customClass="select-string-odr__text-container-text">
            {t('selectStringDesc')}
          </Description>
        </div>
        <div className="select-string-odr__main-info">
          <div className="select-string-odr__main-info-select">
            <CustomOrderSelect
              label="String Type"
              link="Select"
              value={brand?.name}
              onSelectClick={() => setStringsCurrent('search')}
            />
          </div>
          <div className="select-string-odr__main-info-number">
            <Field
              name="mains-tension"
              label="Tension"
              type="number"
              link={{ text: 'Change Units to kg', path: '#' }}
              component={CustomInputNumber}
            />
          </div>
        </div>
        <div className="select-string-odr__hybrid-settings">
          <div className="select-string-odr__hybrid-settings-text">
            Use Hybrid Settings
          </div>
          <div className="select-string-odr__hybrid-settings-switch">
            <CustomSwitch
              handleChange={() => {
                setStep(3);
                setStringsCurrent('initial');
              }}
              checked={false}
            />
            <InfoButton onClick={handleShow} />
          </div>
        </div>
        {/* <div className="select-string-odr__total-price">
          <h3 className="select-string-odr__total-price-heading">
            Total Price
          </h3>
          <p className="select-string-odr__total-price-value">$0</p>
        </div> */}
        <div className="select-string-odr__recquet-heading">
          <Heading>{t('odrdetailHeading')}</Heading>
          <Description>{t('orderRecquetDesc')}</Description>
        </div>
        <div className="select-string-odr__recquet-form">
          <Field
            name="sport"
            label="Sport"
            placeholder="Select a sport"
            component={CustomSelect}
            options={[{ label: 'Babolat', value: 'Babolat' }]}
          />
          <Field
            name="brand"
            label="Brand"
            placeholder="Select a racquet brand"
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
            label="Model"
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

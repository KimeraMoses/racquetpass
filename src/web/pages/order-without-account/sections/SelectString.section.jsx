import { useState } from 'react';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';
// Custom Components
import {
  Heading,
  Description,
  CustomInputNumber,
  InfoButton,
  CustomOrderSelect,
  CustomSwitch,
  CustomInput,
  Modal,
} from 'web/components';

// Styles
import './SelectString.styles.scss';

export function SelectString({ t, setStringsCurrent, setStep }) {
  const [modal, setModal] = useState(false);

  const handleShow = () => {
    setModal((modal) => !modal);
  };
  console.log(modal);

  const brand = useSelector((state) => state?.form?.signup?.values?.brand);

  return (
    <>
      <div className="select-string">
        <Modal showModal={modal} handleShow={handleShow} />
        <div className="select-string__heading">
          <Heading customClass="select-string__heading-text">
            {t('odrSelect')}
          </Heading>
        </div>
        <div className="select-string__text-container">
          <Description customClass="select-string__text-container-text">
            {t('orderSelectStringTxt')}
          </Description>
        </div>
        <div className="select-string__main-info">
          <div className="select-string__main-info-select">
            <CustomOrderSelect
              label="String Type"
              link="Select"
              value={brand?.name}
              onSelectClick={() => setStringsCurrent('search')}
            />
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
            <CustomSwitch
              handleChange={() => {
                setStep(6);
                setStringsCurrent('initial');
              }}
              checked={false}
            />
            <InfoButton onClick={handleShow} />
          </div>
        </div>
        <div className="select-string__total-price">
          <h3 className="select-string__total-price-heading">Total Price</h3>
          <p className="select-string__total-price-value">$0</p>
        </div>
        <div className="select-string__recquet-heading">
          <Heading>{t('odrdetailHeading')}</Heading>
          <Description>{t('orderRecquetDesc')}</Description>
        </div>
        <div className="select-string__recquet-form">
          <CustomOrderSelect
            label="String Type"
            link="Select"
            value={brand?.name}
            onSelectClick={() => setStringsCurrent('search')}
          />
          <Field
            name="model"
            label="Model"
            type="text"
            component={CustomInput}
          />
        </div>
      </div>
    </>
  );
}

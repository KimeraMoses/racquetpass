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
  CustomSelect,
} from 'web/components';

// Styles
import './SelectStringWithMainCross.styles.scss';
import { FileInput } from 'web/components/formFields/index';
import { useState } from 'react';
import { Modal } from 'web/components/index';
import { BackButton } from 'web/components/Buttons/BackButton.component';

const required = (value) => (value ? undefined : 'Required');

export function SelectStringWithMainCross({
  t,
  backward,
  setStep,
  setMainCross,
  setMain,
  setCross,
  change,
}) {
  const [mainsTension, setMainsTension] = useState(50);
  const [crossesTension, setCrossesTension] = useState(50);

  const main = useSelector((state) => state?.form?.signup?.values?.main);
  const cross = useSelector((state) => state?.form?.signup?.values?.cross);

  const [modal, setModal] = useState(false);

  const racquetSport = useSelector(
    (state) => state?.form?.signup?.values?.racquetSport
  );
  const racquetBrand = useSelector(
    (state) => state?.form?.signup?.values?.racquetBrand
  );

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
      <div className="select-string-mc max-w-[450px] m-[0_auto]">
        <div className="select-string-mc__heading justify-start gap-[16px]">
          <BackButton onClick={backward} />
          <Heading customClass="select-string-mc__heading-text">
            {t('odrSelect')}
          </Heading>
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
              placeholder="Select a String Type"
              placeholderBold
              link={
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjc4IDYuNDY2NjdMOS40MzMzIDEwLjgxMzNDOC45MTk5NyAxMS4zMjY3IDguMDc5OTcgMTEuMzI2NyA3LjU2NjY0IDEwLjgxMzNMMy4yMTk5NyA2LjQ2NjY3IiBzdHJva2U9IiMyOTJEMzIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
                  alt="down-arrow"
                />
              }
              onSelectClick={() => {
                setMain(true);
                setCross(false);
                setMainCross({ current: 'search' });
              }}
              value={main?.name}
            />
          </div>
          <div className="select-string-mc__main-info-number">
            {/* <Field
              name="mains-tension"
              label="Tension"
              type="number"
              link={{ text: 'Change units to kg', path: '#' }}
              component={CustomInputNumber}
            /> */}
            <CustomInputNumber
              // {...props}
              label="Tension"
              value={mainsTension}
              onChange={(e) => {
                setMainsTension(e.target.value);
              }}
              link={{ text: 'Change units to kg', path: '#' }}
              type="number"
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
              placeholder="Select a String Type"
              placeholderBold
              link={
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjc4IDYuNDY2NjdMOS40MzMzIDEwLjgxMzNDOC45MTk5NyAxMS4zMjY3IDguMDc5OTcgMTEuMzI2NyA3LjU2NjY0IDEwLjgxMzNMMy4yMTk5NyA2LjQ2NjY3IiBzdHJva2U9IiMyOTJEMzIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
                  alt="down-arrow"
                />
              }
              value={cross?.name}
              onSelectClick={() => {
                setMain(false);
                setCross(true);
                setMainCross({ current: 'search' });
              }}
            />
          </div>
          <div className="select-string-mc__crosses-info-number">
            <CustomInputNumber
              label="Tension"
              value={crossesTension}
              onChange={(e) => {
                setCrossesTension(e.target.value);
              }}
              link={{ text: 'Change units to kg', path: '#' }}
              type="number"
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
        {/* Racquet Details Section */}
        <div className="select-string-odr__recquet-heading">
          <Heading>{t('odrdetailHeading')}</Heading>
          <Description>{t('orderRecquetDesc')}</Description>
        </div>
        <div className="select-string-odr__recquet-form">
          <Field
            name="racquetSport"
            label="Sport"
            placeholder="Select a sport"
            component={(props) => {
              return (
                <CustomSelect
                  {...props}
                  customOnChange={(option) => {
                    change('racquetSport', option?.value);
                  }}
                  value={
                    racquetSport
                      ? { label: racquetSport, value: racquetSport }
                      : null
                  }
                />
              );
            }}
            validate={required}
            options={[
              { label: 'Tennis', value: 'Tennis' },
              { label: 'Squash', value: 'Squash' },
              { label: 'Badminton', value: 'Badminton' },
              { label: 'Other', value: 'Other' },
            ]}
          />
          <Field
            name="racquetBrand"
            label="Brand"
            placeholder="Select a racquet brand"
            validate={required}
            component={(props) => {
              return (
                <CustomSelect
                  {...props}
                  customOnChange={(option) => {
                    change('racquetBrand', option?.value);
                  }}
                  value={
                    racquetBrand
                      ? { label: racquetBrand, value: racquetBrand }
                      : null
                  }
                />
              );
            }}
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
            name="racquetModel"
            label="Model"
            validate={required}
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

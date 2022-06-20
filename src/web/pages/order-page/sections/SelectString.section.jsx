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

const required = (value) => (value ? undefined : 'Required');

export function SelectString({
  t,
  backward,
  setStringsCurrent,
  setStep,
  change,
  backFromReview,
  setBackFromReview,
}) {
  const [modal, setModal] = useState(false);

  const handleShow = () => {
    setModal((modal) => !modal);
  };

  const brand = useSelector((state) => state?.form?.signup?.values?.brand);

  const [mainsTension, setMainsTension] = useState(150);

  // useEffect(() => {
  //   change('mains-tension', mainsTension);
  // }, [mainsTension, change]);

  const racquetSport = useSelector(
    (state) => state?.form?.signup?.values?.racquetSport
  );
  const racquetBrand = useSelector(
    (state) => state?.form?.signup?.values?.racquetBrand
  );

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
          <BackButton
            onClick={() => {
              if (backFromReview) {
                setStep(6);
                setBackFromReview(false);
              } else {
                backward();
              }
            }}
          />
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
              placeholder="Select a String Type"
              placeholderBold
              link={
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjc4IDYuNDY2NjdMOS40MzMzIDEwLjgxMzNDOC45MTk5NyAxMS4zMjY3IDguMDc5OTcgMTEuMzI2NyA3LjU2NjY0IDEwLjgxMzNMMy4yMTk5NyA2LjQ2NjY3IiBzdHJva2U9IiMyOTJEMzIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
                  alt="down-arrow"
                />
              }
              value={brand?.name}
              onSelectClick={() => setStringsCurrent('search')}
            />
          </div>
          <div className="select-string-odr__main-info-number">
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
            {/* <Field
              name="mains-tension"
              component={(props) => (
              )} /> */}
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
                  value={{ label: racquetSport, value: racquetSport }}
                />
              );
            }}
            validate={required}
            options={[
              { label: 'Tennis', value: 'Tennis' },
              { label: 'Squash', value: 'Squash' },
              { label: 'Bedminton', value: 'Bedminton' },
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
                  value={{ label: racquetBrand, value: racquetBrand }}
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

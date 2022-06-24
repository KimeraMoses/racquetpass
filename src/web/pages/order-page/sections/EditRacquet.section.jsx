import { Field } from 'redux-form';
import { useSelector } from 'react-redux';
// Custom Components
import {
  Heading,
  Description,
  CustomSelect,
  CustomInput,
  FileInput,
} from 'web/components';

// Styles
import './EditRacquet.styles.scss';
import { HeadingButton } from 'web/components/Buttons/HeadingButton.component';

const required = (value) => (value ? undefined : 'Required');

export function EditRacquet({ t, setStep, change }) {
  const racquetSport = useSelector(
    (state) => state?.form?.signup?.values?.racquetSport
  );
  const racquetBrand = useSelector(
    (state) => state?.form?.signup?.values?.racquetBrand
  );

  return (
    <>
      <div className="edit-racquet-order-review">
        <div className="edit-racquet-order-review__heading flex items-center justify-between">
          <Heading>Edit Racquet Settings</Heading>
          <HeadingButton text="Cancel" onClick={() => setStep(6)} />
        </div>
        <div className="edit-racquet-order-review__recquet-form">
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
          <div className="edit-racquet-order-review__recquet-form-pic-box">
            <Field
              name="image"
              label="Picture (optional)"
              component={FileInput}
            />
            <Description>
              Adding a picture helps your stringer quickly find your racquet.
            </Description>
          </div>
        </div>
      </div>
    </>
  );
}

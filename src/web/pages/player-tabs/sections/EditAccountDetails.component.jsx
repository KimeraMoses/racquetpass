import {
  Heading,
  HeadingButton,
  SubmitButton,
  CustomInput,
} from 'web/components';
import { Field } from 'redux-form';
import './EditAccountDetails.styles.scss';

export const EditAccountDetails = ({ t, setCurrent }) => {
  return (
    <div className="edit-account-details">
      <div>
        <div className="edit-account-details__menu-bar">
          <div className="edit-account-details__menu-bar-drawer-title">
            <Heading>Edit Account Details</Heading>
          </div>
          <div className="edit-account-details__menu-bar-scan">
            <HeadingButton close onClick={() => setCurrent('accountDetails')} />
          </div>
        </div>

        <div className="edit-account-details__form">
          <Field
            name="firstName"
            label="First Name"
            type="text"
            component={CustomInput}
          />
          <Field
            name="lastName"
            label="Last Name"
            type="text"
            component={CustomInput}
          />
          <Field
            name="email"
            label="Email"
            type="text"
            component={CustomInput}
          />
          <Field
            name="mobile"
            label="Mobile Number"
            type="text"
            component={CustomInput}
          />
          <div className="edit-account-details__form-el">
            <h4 className="edit-account-details__form-el-heading">Password</h4>
            <div className="edit-account-details__form-el-field">
              <p className="edit-account-details__form-el-field-text">
                ••••••••••••
              </p>
              <HeadingButton text={'Reset'} />
            </div>
          </div>
        </div>
      </div>

      <div className="edit-account-details__btn">
        <SubmitButton onClick={() => setCurrent('accountDetails')}>
          Save Changes
        </SubmitButton>
      </div>
    </div>
  );
};

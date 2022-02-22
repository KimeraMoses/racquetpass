import { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { StepButton, SubmitButton } from 'web/components';
import {
  ScanDetails,
  RacquetDetails,
  SelectShop,
  Contact,
  VerifyPhone,
  ReviewOrder,
} from './sections';

import './orderWithoutAccount.styles.scss';

let OrderWithoutAccount = ({ t }) => {
  return (
    <div className="without-account">
      {/* <ScanDetails t={t} /> */}
      {/* <RacquetDetails t={t} /> */}
      {/* <SelectShop t={t} /> */}
      {/* <Contact t={t} /> */}
      {/* <VerifyPhone t={t} /> */}
      <ReviewOrder t={t} />
    </div>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

OrderWithoutAccount = reduxForm({
  // a unique name for the form
  form: '',
  onSubmit,
})(OrderWithoutAccount);

export default withNamespaces()(OrderWithoutAccount);

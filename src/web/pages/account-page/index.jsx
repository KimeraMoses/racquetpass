import { reduxForm } from 'redux-form';
import { withNamespaces } from 'react-i18next';
import { SelectAccount, AccountDetails, CreatePassword } from './sections';

import './accountPage.styles.scss';

let CreateAccount = ({ t }) => {
  return (
    <>
      <div className="create-account">
        <SelectAccount t={t} />
        {/* <AccountDetails t={t} /> */}
        {/* <CreatePassword t={t} /> */}
      </div>
    </>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

CreateAccount = reduxForm({
  // a unique name for the form
  form: 'signup',
  onSubmit,
})(CreateAccount);

export default withNamespaces()(CreateAccount);

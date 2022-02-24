import { useState } from 'react';
import { reduxForm } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import {
  Locker,
  AboutRacquet,
  StringDetails,
  StringType,
  EditRacquetInfo,
  EditStringInfo,
  ReviewRacquet,
} from './sections';

import './configure-racquet.styles.scss';

function ConfigureRacquet({ t, handleSubmit }) {
  return (
    <>
      <form onSubmit={handleSubmit} className="configure-racquet">
        {/* <Locker t={t} /> */}
        {/* <AboutRacquet t={t} /> */}
        {/* <StringDetails t={t} /> */}
        {/* <StringType t={t} /> */}
        {/* <EditRacquetInfo t={t} /> */}
        {/* <EditStringInfo t={t} /> */}
        {/* <ReviewRacquet t={t} /> */}
      </form>
    </>
  );
}

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

ConfigureRacquet = reduxForm({
  // a unique name for the form
  form: 'racquetDetails',
  onSubmit,
})(ConfigureRacquet);

export default withNamespaces()(ConfigureRacquet);

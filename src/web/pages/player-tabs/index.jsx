import { useState } from 'react';
import { reduxForm } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import {
  AccountButton,
  SubHeading,
  BackButton,
  Heading,
  CustomInput,
  SubmitButton,
} from 'web/components';
import './player-tabs.styles.scss';

function PlayerTabs({ t, handleSubmit }) {
  const navigate = useNavigate();
  return (
    <>
      <form onSubmit={handleSubmit} className="player-tabs">
        <div>Player Tabs</div>
      </form>
    </>
  );
}

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

PlayerTabs = reduxForm({
  // a unique name for the form
  form: 'player',
  onSubmit,
})(PlayerTabs);

export default withNamespaces()(PlayerTabs);

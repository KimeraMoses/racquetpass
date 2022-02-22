import { useState } from 'react';
import { reduxForm } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import './player-tabs.styles.scss';
import { Locker } from './sections';

function PlayerTabs({ t, handleSubmit }) {
  const navigate = useNavigate();
  return (
    <>
      <form onSubmit={handleSubmit} className="player-tabs">
        <div>
          <Locker t={t} />
        </div>
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

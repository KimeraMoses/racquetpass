import { useState } from 'react';
import { reduxForm } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import './player-tabs.styles.scss';
import {
  Locker,
  Drawer,
  PlayerProfile,
  EditProfile,
  AccountDetails,
  EditAccountDetails,
  OrderDetails,
  PaymentMethod,
  CardDetails,
  AddCard,
} from './sections';

function PlayerTabs({ t, handleSubmit }) {
  const navigate = useNavigate();
  return (
    <>
      <form onSubmit={handleSubmit} className="player-tabs">
        <div>
          {/* <Locker t={t} /> */}
          {/* <Drawer t={t} /> */}
          {/* <PlayerProfile t={t} /> */}
          {/* <EditProfile t={t} /> */}
          {/* <AccountDetails t={t} /> */}
          {/* <EditAccountDetails t={t} /> */}
          {/* <OrderDetails t={t} /> */}
          {/* <PaymentMethod t={t} /> */}
          {/* <CardDetails t={t} /> */}
          <AddCard t={t} />
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

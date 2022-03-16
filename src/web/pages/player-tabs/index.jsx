import { useState, useMemo } from 'react';
import { reduxForm } from 'redux-form';
import { useLocation } from 'react-router-dom';
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
  ProShop,
  EditShop,
  SearchShop,
} from './sections';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function PlayerTabs({ t, handleSubmit, change }) {
  let query = useQuery();
  const backFromConfig = query.get('configBack');
  const [current, setCurrent] = useState(backFromConfig ? 'locker' : 'shop');

  return (
    <>
      <form onSubmit={handleSubmit} className="player-tabs">
        <div>
          {current === 'drawer' && <Drawer t={t} setCurrent={setCurrent} />}
          {current === 'locker' && <Locker t={t} setCurrent={setCurrent} />}
          {current === 'shop' && <ProShop t={t} setCurrent={setCurrent} />}
          {current === 'shop-search' && (
            <SearchShop t={t} setCurrent={setCurrent} />
          )}
          {current === 'edit-shop' && (
            <EditShop t={t} setCurrent={setCurrent} />
          )}
          {current === 'profile' && (
            <PlayerProfile t={t} setCurrent={setCurrent} />
          )}
          {current === 'editProfile' && (
            <EditProfile t={t} setCurrent={setCurrent} change={change} />
          )}
          {current === 'accountDetails' && (
            <AccountDetails t={t} setCurrent={setCurrent} />
          )}
          {current === 'editAccount' && (
            <EditAccountDetails t={t} setCurrent={setCurrent} />
          )}
          {current === 'orderDetails' && (
            <OrderDetails t={t} setCurrent={setCurrent} />
          )}
          {current === 'payment' && (
            <PaymentMethod t={t} setCurrent={setCurrent} />
          )}
          {current === 'cardDetails' && (
            <CardDetails t={t} setCurrent={setCurrent} />
          )}
          {current === 'addCard' && <AddCard t={t} setCurrent={setCurrent} />}
        </div>
        {/* <SearchShop t={t} /> */}
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

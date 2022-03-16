import { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { reduxForm } from 'redux-form';

import {
  InventoryDashboard,
  SearchInventory,
  AddForm,
  EditForm,
  ProShop,
  EditShop,
  RequestChange,
  CancelRequest,

  // Payment Screens
  SetupPayment,
  Choose,
  AddCard,
  AddBank,
} from './sections';

import './inventory.styles.scss';

let Inventory = ({ t }) => {
  const [currentScreen, setCurrentScreen] = useState('');
  const [isReceive, setIsReceive] = useState(false);
  const getCurrentScreen = () => {
    switch (currentScreen) {
      case 'inventory':
        return <SearchInventory t={t} setCurrentScreen={setCurrentScreen} />;
      case 'add':
        return <AddForm t={t} setCurrentScreen={setCurrentScreen} />;
      case 'edit':
        return <EditForm t={t} setCurrentScreen={setCurrentScreen} />;
      case 'proshop':
        return <ProShop t={t} setCurrentScreen={setCurrentScreen} />;
      case 'editShop':
        return <EditShop t={t} setCurrentScreen={setCurrentScreen} />;
      case 'editShopName':
        return <RequestChange t={t} setCurrentScreen={setCurrentScreen} />;
      case 'editShopAddress':
        return (
          <RequestChange t={t} setCurrentScreen={setCurrentScreen} isAddress />
        );
      case 'modifyShopName':
        return <CancelRequest t={t} setCurrentScreen={setCurrentScreen} />;
      case 'modifyShopAddress':
        return (
          <CancelRequest t={t} setCurrentScreen={setCurrentScreen} isAddress />
        );
      case 'payment':
        return (
          <SetupPayment
            t={t}
            setCurrentScreen={setCurrentScreen}
            setIsReceive={setIsReceive}
          />
        );
      case 'choose':
        return (
          <Choose
            t={t}
            setCurrentScreen={setCurrentScreen}
            isReceive={isReceive}
          />
        );
      case 'addCard':
        return <AddCard t={t} setCurrentScreen={setCurrentScreen} />;
      case 'addBank':
        return <AddBank t={t} setCurrentScreen={setCurrentScreen} />;
      default:
        return <InventoryDashboard t={t} setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <div className="inventory">
      <form className="inventory-form">{getCurrentScreen()}</form>
    </div>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

Inventory = reduxForm({
  // a unique name for the form
  form: 'inventory',
  onSubmit,
})(Inventory);

export default withNamespaces()(Inventory);

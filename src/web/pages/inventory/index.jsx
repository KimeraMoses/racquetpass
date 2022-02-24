import { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { reduxForm } from 'redux-form';

import {
  InventoryDashboard,
  SearchInventory,
  ItemForm,
  ProShop,
  EditShop,
  RequestChange,
  CancelRequest,
} from './sections';

import './inventory.styles.scss';

let Inventory = ({ t }) => {
  return (
    <div className="inventory">
      <form className="inventory-form">
        <InventoryDashboard t={t} />
        {/* <SearchInventory t={t} /> */}
        {/* <ItemForm t={t} /> */}
        {/* <ProShop t={t} /> */}
        {/* <EditShop t={t} /> */}
        {/* <RequestChange t={t} /> */}
        {/* <CancelRequest t={t} /> */}
      </form>
    </div>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

Inventory = reduxForm({
  // a unique name for the form
  form: '',
  onSubmit,
})(Inventory);

export default withNamespaces()(Inventory);

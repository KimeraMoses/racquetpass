import React from 'react';
import { withNamespaces } from 'react-i18next';
import {
  AdminDashboard,
  AdminRequest,
  AdminContact,
  AdminPayment,
  RemoveRequest,
  SetupPayment,
  BankForm,
} from './sections';
import './index.styles.scss';

function AdminWorkflow({ t }) {
  return (
    <>
      <div className="admin">
        {/* <AdminDashboard t={t} /> */}
        {/* <AdminRequest t={t} /> */}
        {/* <AdminContact t={t} /> */}
        {/* <AdminPayment t={t} /> */}
        {/* <RemoveRequest t={t} /> */}
        {/* <SetupPayment t={t} /> */}
        <BankForm t={t} />
      </div>
    </>
  );
}

export default withNamespaces()(AdminWorkflow);

import React, { useState } from 'react';
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

let AdminWorkflow = ({ t }) => {
  const [currentScreen, setCurrentScreen] = useState('');

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case 'request':
        return <AdminRequest t={t} setCurrentScreen={setCurrentScreen} />;
      case 'payment':
        return <AdminPayment t={t} setCurrentScreen={setCurrentScreen} />;
      case 'contact':
        return <AdminContact t={t} setCurrentScreen={setCurrentScreen} />;
      case 'setup':
        return <SetupPayment t={t} setCurrentScreen={setCurrentScreen} />;
      case 'addaccount':
        return <BankForm t={t} setCurrentScreen={setCurrentScreen} />;
      case 'remove':
        return <RemoveRequest t={t} setCurrentScreen={setCurrentScreen} />;
      default:
        return <AdminDashboard t={t} setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <>
      <div className="admin">
        {getCurrentScreen()}

        {/* <AdminDashboard t={t} /> */}
        {/* <AdminRequest t={t} /> */}
        {/* <AdminContact t={t} setCurrentScreen={setCurrentScreen} /> */}
        {/* <AdminPayment t={t} /> */}
        {/* <RemoveRequest t={t} /> */}
        {/* <SetupPayment t={t} /> */}
        {/* <BankForm t={t} /> */}
      </div>
    </>
  );
};

export default withNamespaces()(AdminWorkflow);

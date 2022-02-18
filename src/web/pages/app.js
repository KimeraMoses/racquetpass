import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Page404 from './page-404';
import Order from './order-page';
import Tasks from './tasks';
import Scan from './tasks/scan'
import Details from './tasks/details'
import Scanned from './tasks/scanned'
import BusinessAccount from './business-account';
import CreateBusinessAccount from './business-account/create';
import CreatePassword from './business-account/create-password';
import VerifyPhone from './business-account/verify-phone';
import VerifyBusiness from './business-account/verify-business';
import BusinessDetails from './business-account/business-details';
import ProfileInfo from './business-account/profile-info';
import ViewServiceOrder from './view-service-order';
import OrderDetails from './view-service-order/details';
import OrderScanned from './view-service-order/scanned';

function Routers() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/Tasks" element={<Tasks />} />
          <Route path="/Tasks/Scan" element={<Scan />} />
          <Route path="/Tasks/Scanned" element={<Scanned />} />
          <Route path="/Tasks/Details" element={<Details />} />
          <Route path="/BusinessAccount" element={<BusinessAccount />} />
          <Route path="/BusinessAccount/Create" element={<CreateBusinessAccount />} />
          <Route path="/BusinessAccount/CreatePassword" element={<CreatePassword />} />
          <Route path="/BusinessAccount/VerifyPhone" element={<VerifyPhone />} />
          <Route path="/BusinessAccount/VerifyBusiness" element={<VerifyBusiness />} />
          <Route path="/BusinessAccount/BusinessDetails" element={<BusinessDetails />} />
          <Route path="/BusinessAccount/ProfileInfo" element={<ProfileInfo />} />
          <Route path="/ServiceOrder/View" element={<ViewServiceOrder />} />
          <Route path="/ServiceOrder/Details" element={<OrderDetails />} />
          <Route path="/ServiceOrder/Scanned" element={<OrderScanned />} />
        </Routes>
      </Router>
    </>
  );
}

export default Routers;

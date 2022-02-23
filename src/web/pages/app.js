import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Page404 from './page-404';
import Order from './order-page';
import Tasks from './tasks';
import Scan from './tasks/scan';
import Details from './tasks/details';
import Scanned from './tasks/scanned';
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
import CreateOrder from './create-service-order';
import ScanOrder from './create-service-order/scan';
import ScannedOrder from './create-service-order/scanned';
import CreateOrderDetails from './create-service-order/details';
import CreateOrderPayment from './create-service-order/payment';
import StringDetails from './create-service-order/string-details';
import Shop from './create-service-order/shop';
import ShopSearching from './create-service-order/shop-searching';
import OrderSubmitted from './create-service-order/submitted';
import CreateAccount from './account-page';
import OrderWithoutAccount from './order-without-account';
import Inventory from './inventory';

function Routers() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/Tasks" element={<Tasks />} />
          <Route path="/Tasks/Scan" element={<Scan />} />
          <Route path="/Tasks/Scanned" element={<Scanned />} />
          <Route path="/Tasks/Details" element={<Details />} />
          <Route path="/BusinessAccount" element={<BusinessAccount />} />
          <Route
            path="/BusinessAccount/Create"
            element={<CreateBusinessAccount />}
          />
          <Route
            path="/BusinessAccount/CreatePassword"
            element={<CreatePassword />}
          />
          <Route
            path="/BusinessAccount/VerifyPhone"
            element={<VerifyPhone />}
          />
          <Route
            path="/BusinessAccount/VerifyBusiness"
            element={<VerifyBusiness />}
          />
          <Route
            path="/BusinessAccount/BusinessDetails"
            element={<BusinessDetails />}
          />
          <Route
            path="/BusinessAccount/ProfileInfo"
            element={<ProfileInfo />}
          />
          <Route path="/ServiceOrder/View" element={<ViewServiceOrder />} />
          <Route path="/ServiceOrder/Details" element={<OrderDetails />} />
          <Route path="/ServiceOrder/Scanned" element={<OrderScanned />} />
          <Route path="/CreateOrder/Locker" element={<CreateOrder />} />
          <Route path="/CreateOrder/Scan" element={<ScanOrder />} />
          <Route path="/CreateOrder/Scanned" element={<ScannedOrder />} />
          <Route path="/CreateOrder/Details" element={<CreateOrderDetails />} />
          <Route path="/CreateOrder/Payment" element={<CreateOrderPayment />} />
          <Route
            path="/CreateOrder/StringDetails"
            element={<StringDetails />}
          />
          <Route path="/CreateOrder/Shop" element={<Shop />} />
          <Route
            path="/CreateOrder/ShopSearching"
            element={<ShopSearching />}
          />
          <Route path="/CreateOrder/Submitted" element={<OrderSubmitted />} />
          <Route
            path="/order-without-account"
            element={<OrderWithoutAccount />}
          />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </Router>
    </>
  );
}

export default Routers;

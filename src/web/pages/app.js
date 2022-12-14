import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Forgot from "./forgot";
import ResetPassword from "./reset-password";
import Page404 from "./page-404";
import Order from "./order-page";
import Tasks from "./tasks";
import Scan from "./tasks/scan";
import Details from "./tasks/details";
import Scanned from "./tasks/scanned";
import CreateBusinessAccount from "./business-account/create";
import CreatePassword from "./business-account/create-password";
import VerifyPhone from "./business-account/verify-phone";
import VerifyBusiness from "./business-account/verify-business";
import BusinessDetails from "./business-account/business-details";
import ProfileInfo from "./business-account/profile-info";
import ThankYou from "./business-account/Thank-you/";
import ViewServiceOrder from "./view-service-order";
import OrderScanned from "./view-service-order/scanned";
import CreateOrder from "./create-service-order";
import ScanOrder from "./create-service-order/scan";
import ScannedOrder from "./create-service-order/scanned";
import CreateOrderDetails from "./create-service-order/details";
import CreateOrderPayment from "./create-service-order/payment";
import StringDetails from "./create-service-order/string-details";
import Shop from "./create-service-order/shop";
import ShopSearching from "./create-service-order/shop-searching";
import OrderSubmitted from "./create-service-order/submitted";
// import OrderWithoutAccount from "./order-without-account";
import Inventory from "./inventory";
import PlayerTabs from "./player-tabs";
import ConfigureRacquet from "./configure-racquet";
import AdminWorkflow from "./admin-workflow";
import { CustomDrawer } from "web/components";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AutoAuthenticate } from "web/store/Actions/authActions";
import RedirectPage from "./home/RedirectPage";
import OrderDetails from "./order-page/sections/OrderDetails.section";
import DoneSection from "./order-page/sections/Done.section";
import "react-toastify/dist/ReactToastify.css";
import ResetShopPassword from "./inventory/sections/reset-password/index";
import OrderFlow from "./order-flow/index";

import BrandSearchResultsSection from "./order-flow/sections/BrandSearchResults.section";
import ShopSearchResultsSection from "./order-flow/sections/ShopSearchResults.section";
import DidntGetTextSection from "./order-flow/sections/DidntGetText.section";
import VerifyPhoneSection from "./order-flow/sections/VerifyPhone.section";

function Routers() {
  const { show } = useSelector((state) => state?.drawer);
  const initialValues = useSelector((state) => state.business.businessData);
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const hasValues = initialValues?.hasOwnProperty("firstName");
  useEffect(() => {
    AutoAuthenticate(dispatch);
  }, [dispatch]);

  return (
    <>
      <Router>
        <ToastContainer />
        <CustomDrawer show={show} />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/tasks" /> : <Home />}
          />
          <Route path="/code/:uuid" element={<RedirectPage />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/tasks" /> : <Login />}
          />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/reset-password" element={<ResetShopPassword />} />
          {/* <Route path="/order" element={<Order />} /> */}
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/order/done" element={<DoneSection />} />
          <Route
            path="/tasks"
            element={isAuthenticated ? <Tasks /> : <Navigate to="/" />}
          />
          <Route
            path="/tasks/scan"
            element={!isAuthenticated ? <Navigate to="/" /> : <Scan />}
          />
          <Route
            path="/tasks/scanned"
            element={!isAuthenticated ? <Navigate to="/" /> : <Scanned />}
          />
          <Route
            path="/tasks/details"
            element={!isAuthenticated ? <Navigate to="/" /> : <Details />}
          />
          <Route
            path="/BusinessAccount/Create"
            element={<CreateBusinessAccount initialValues={initialValues} />}
          />
          <Route
            path="/BusinessAccount/BusinessDetails"
            element={
              !hasValues ? (
                <Navigate to="/BusinessAccount/Create" />
              ) : (
                <BusinessDetails initialValues={initialValues} />
              )
            }
          />
          <Route
            path="/BusinessAccount/CreatePassword"
            element={
              !hasValues ? (
                <Navigate to="/BusinessAccount/Create" />
              ) : (
                <CreatePassword initialValues={initialValues} />
              )
            }
          />
          <Route path="/BusinessAccount/Thanks" element={<ThankYou />} />

          <Route
            path="/BusinessAccount/VerifyPhone"
            element={<VerifyPhone />}
          />
          <Route
            path="/BusinessAccount/VerifyBusiness"
            element={<VerifyBusiness />}
          />
          <Route
            path="/BusinessAccount/ProfileInfo"
            element={<ProfileInfo />}
          />
          {/* <Route path="/ServiceOrder/View" element={<ViewServiceOrder />} />
          <Route path="/ServiceOrder/Details" element={<OrderDetails />} />
          <Route path="/ServiceOrder/Scanned" element={<OrderScanned />} />
          <Route path="/CreateOrder/Locker" element={<CreateOrder />} />
          <Route path="/CreateOrder/Scan" element={<ScanOrder />} />
          <Route path="/CreateOrder/Scanned" element={<ScannedOrder />} />
          <Route path="/CreateOrder/Details" element={<CreateOrderDetails />} />
          <Route path="/CreateOrder/Payment" element={<CreateOrderPayment />} /> */}
          {/* <Route
            path="/CreateOrder/StringDetails"
            element={<StringDetails />}
          /> */}
          {/* <Route path="/CreateOrder/Shop" element={<Shop />} /> */}
          {/* <Route
            path="/CreateOrder/ShopSearching"
            element={<ShopSearching />}
          /> */}
          {/* <Route path="/CreateOrder/Submitted" element={<OrderSubmitted />} /> */}
          <Route path="/order-flow/*" element={<OrderFlow />} />
          <Route
            path="/order/select-strings"
            element={<BrandSearchResultsSection />}
          />
          <Route
            path="/order/select-shop"
            element={<ShopSearchResultsSection />}
          />
          <Route path="/order/resend-text" element={<DidntGetTextSection />} />
          <Route path="/order/reverify" element={<VerifyPhoneSection />} />
          {/* <Route path="scan" element={<ScanSectionSection />} />
            <Route path="scanned" element={<ScanSuccessSection />} />
            <Route
              path="select-strings"
              element={<SelectStringWithMainCrossSection />}
            /> */}
          {/* <Route
            path="/order-without-account"
            element={<OrderWithoutAccount />}
          /> */}
          <Route
            path="/inventory"
            element={!isAuthenticated ? <Navigate to="/" /> : <Inventory />}
          />
          {/* <Route path="/player-tabs" element={<PlayerTabs />} /> */}
          {/* <Route path="/configure-racquet" element={<ConfigureRacquet />} /> */}
          {/* <Route
            path="/admin"
            element={isAuthenticated ? <Navigate to="/" /> : <AdminWorkflow />}
          /> */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default Routers;

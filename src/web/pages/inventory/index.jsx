import { useEffect, useMemo, useState } from "react";
import { withNamespaces } from "react-i18next";
import { reduxForm } from "redux-form";
import {
  SearchInventory,
  AddForm,
  EditForm,
  ProShop,
  RequestChange,
  CancelRequest,
  // Payment Screens
  SetupPayment,
  Choose,
  AddCard,
  AddBank,
  ItemDetails,
} from "./sections";

import "./inventory.styles.scss";
import { useLocation } from "../../../../node_modules/react-router-dom/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchShopDetails } from "web/store/Actions/shopActions";
import EditShop from "./sections/EditShop.section";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

let Inventory = ({ t, change }) => {
  // const [showDrawer, setShowDrawer] = useState(false);
  const [isReceive, setIsReceive] = useState(false);
  const query = useQuery();
  const active = query.get("active");
  const { token, user } = useSelector((state) => state.auth);
  const shop = useSelector((state) => state.shop.shop);
  const [currentScreen, setCurrentScreen] = useState(active);

  const shopDetails = {
    shop: shop && shop?.name,
    email: shop && shop?.email,
    ["phone-number"]: shop && shop?.phone,
    ["delivery-days"]: shop && shop?.etimated_delivery_time,
    ["labor-price"]: shop && shop?.labor_price,
    address: shop && shop?.address?.street,
    shopcity: shop && shop?.address?.city,
    apt: shop && shop?.address?.apartment,
    ["shop-state"]: shop && shop?.address?.state,
    ["zip-code"]: shop && shop?.address?.zip_code,
    country: shop && shop?.country,
  };

  useEffect(() => {
    setCurrentScreen(active);
  }, [active]);

  useEffect(() => {
    dispatch(fetchShopDetails(token, user && user.shop));
  }, [token]);

  const dispatch = useDispatch();

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case "inventory":
        return (
          <SearchInventory
            t={t}
            setCurrentScreen={setCurrentScreen}
            setDrawer={() => dispatch({ type: "SHOW_DRAWER" })}
          />
        );
      case "add":
        return (
          <AddForm t={t} setCurrentScreen={setCurrentScreen} change={change} />
        );
      case "edit":
        return (
          <EditForm t={t} setCurrentScreen={setCurrentScreen} change={change} />
        );
      case "detail":
        return <ItemDetails t={t} setCurrentScreen={setCurrentScreen} />;
      case "proshop":
        return (
          <ProShop
            t={t}
            setCurrentScreen={setCurrentScreen}
            setDrawer={() => dispatch({ type: "SHOW_DRAWER" })}
          />
        );
      case "editShop":
        return (
          <EditShop
            t={t}
            setCurrentScreen={setCurrentScreen}
            change={change}
            initialValues={shopDetails}
            hasOwnStrings={shop && shop?.allow_own_strings}
          />
        );
      case "editShopName":
        return <RequestChange t={t} setCurrentScreen={setCurrentScreen} />;
      case "editShopAddress":
        return (
          <RequestChange t={t} setCurrentScreen={setCurrentScreen} isAddress />
        );
      case "modifyShopName":
        return <CancelRequest t={t} setCurrentScreen={setCurrentScreen} />;
      case "modifyShopAddress":
        return (
          <CancelRequest t={t} setCurrentScreen={setCurrentScreen} isAddress />
        );
      case "payment":
        return (
          <SetupPayment
            t={t}
            setCurrentScreen={setCurrentScreen}
            setDrawer={() => dispatch({ type: "SHOW_DRAWER" })}
            setIsReceive={setIsReceive}
          />
        );
      case "choose":
        return (
          <Choose
            t={t}
            setCurrentScreen={setCurrentScreen}
            isReceive={isReceive}
          />
        );
      case "addCard":
        return <AddCard t={t} setCurrentScreen={setCurrentScreen} />;
      case "addBank":
        return <AddBank t={t} setCurrentScreen={setCurrentScreen} />;
      default:
        return (
          <SearchInventory
            t={t}
            setCurrentScreen={setCurrentScreen}
            setDrawer={() => dispatch({ type: "SHOW_DRAWER" })}
          />
        );
    }
  };

  return (
    <div className="inventory">
      {/* <CustomDrawer
        setShow={setShowDrawer}
        show={showDrawer}
        setCurrentScreen={setCurrentScreen}
        activeLink={active}
      /> */}
      <form className="inventory-form">{getCurrentScreen()}</form>
    </div>
  );
};

// const onSubmit = (values, dispatch) => {
//   // dispatch(    // your submit action //      );
//   console.log(values);
// };

Inventory = reduxForm({
  // a unique name for the form
  form: "inventory",
  // onSubmit,
})(Inventory);

export default withNamespaces()(Inventory);

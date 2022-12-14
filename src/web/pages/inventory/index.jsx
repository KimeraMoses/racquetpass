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
  const [isReceive, setIsReceive] = useState(false);
  const query = useQuery();
  const active = query.get("active");
  const user = useSelector((state) => state.auth.user);
  const shop = useSelector((state) => state.shop.shop);
  const string = useSelector(
    (state) => state?.form?.inventory?.values?.current_string
  );

  const initialValues = {
    string_id: string && string.id,
    "edit-name": string && string?.name,
    "edit-type": string && string?.type,
    "edit-brand": string && string?.brand,
    "edit-model": string && string?.model,
    itemPrice: string && string?.price,
    type: string && string.hybrid_type,
    in_stock: string && string.in_stock,
    size: string && string?.size,
    tension: string && string?.tension,
  };
  const [currentScreen, setCurrentScreen] = useState(active);
  // const phoneFormater = (phone) => {
  //   const newPhone = phone?.replace("+", "")?.substring(1);
  //   return newPhone;
  // };

  const shopDetails = {
    shop: shop && shop?.name,
    email: shop && shop?.email,
    // "phone-number": phoneFormater(shop && shop?.phone),
    "phone-number": shop && shop?.phone,
    "delivery-days": shop && shop?.estimated_delivery_time,
    "labor-price": shop && shop?.labor_price,
    address: shop && shop?.address?.street,
    shopcity: shop && shop?.address?.city,
    apt: shop && shop?.address?.apartment,
    "shop-state": shop && shop?.address?.state,
    "zip-code": shop && shop?.address?.zip_code,
    country: shop && shop?.country,
    tax: shop && shop?.tax,
    isPercentage: shop && shop?.is_tax_percentage,
  };

  useEffect(() => {
    setCurrentScreen(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    dispatch(fetchShopDetails(user && user.shop));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const dispatch = useDispatch();

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case "inventory":
        return (
          <SearchInventory
            t={t}
            setCurrentScreen={setCurrentScreen}
            setDrawer={() => dispatch({ type: "SHOW_DRAWER" })}
            change={change}
          />
        );
      case "add":
        return (
          <AddForm t={t} setCurrentScreen={setCurrentScreen} change={change} />
        );
      case "edit":
        return (
          <EditForm
            t={t}
            setCurrentScreen={setCurrentScreen}
            change={change}
            initialValues={initialValues}
          />
        );
      case "detail":
        return (
          <ItemDetails
            t={t}
            setCurrentScreen={setCurrentScreen}
            change={change}
          />
        );
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
            change={change}
          />
        );
    }
  };

  return (
    <div className="inventory">
      <form className="inventory-form">{getCurrentScreen()}</form>
    </div>
  );
};

Inventory = reduxForm({
  form: "inventory",
})(Inventory);

export default withNamespaces()(Inventory);

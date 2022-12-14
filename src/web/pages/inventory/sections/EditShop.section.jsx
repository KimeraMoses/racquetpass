import { Field, reduxForm } from "redux-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { withNamespaces } from "react-i18next";
import {
  Heading,
  HeadingButton,
  CustomInput,
  Description,
  CustomSwitch,
  CustomSelect,
  SubmitButton,
  CustomPhoneInput,
  CustomZIPInput,
} from "web/components";
import "./EditShop.styles.scss";
import { useEffect, useState } from "react";
import { CustomCurrencyInput } from "web/components/formFields/CustomCurrencyInput/CustomCurrencyInput.component";
import { useDispatch } from "react-redux";
import { editBusinessDetails } from "web/store/Actions/businessActions";

const required = (value) => (value ? undefined : "This field is required");
const email = (value) => {
  if (
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
      value
    )
  ) {
    return undefined;
  } else {
    return "Please enter a valid email";
  }
};
// Phone Validation
const formats = "(999) 999-9999|(999)999-9999|999-999-9999|9999999999";
const r = RegExp(
  "^(" + formats.replace(/([()])/g, "\\$1").replace(/9/g, "\\d") + ")$"
);
const phoneValidation = (value) => {
  if (r.test(value) === true) {
    if (value.length < 9 || value.length > 14) {
      return "Please enter value between 9 and 14";
    } else {
      return undefined;
    }
  } else {
    return "Please enter a valid phone number";
  }
};
// ZIP Validation
// const zipValidation = (value) => {
//   if (value?.length !== 5) {
//     return "Please enter a standard 5 digits zip code";
//   } else {
//     return undefined;
//   }
// };

let EditShop = ({
  t,
  setCurrentScreen,
  change,
  hasOwnStrings,
  initialValues,
}) => {
  const [isPercentage, setPercentage] = useState(initialValues?.isPercentage);
  const [labor, setLabor] = useState(initialValues["labor-price"]);
  const [tax, setTax] = useState(
    initialValues["tax"] > 0.0 ? initialValues["tax"] : ""
  );
  const [delivery, setDelivery] = useState(initialValues["delivery-days"]);
  const [ownStrings, setOwnStrings] = useState(hasOwnStrings);
  const [deliveryError, setDeliveryError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/states.json")
      .then((res) => res.json())
      .then((data) => setStates(data));
  }, []);
  // const shopNameEdited = true;
  // const shopAddressEdited = false;
  const phoneNumber = useSelector(
    (state) => state?.form?.inventory?.values?.["phone-number"]
  );

  const state = useSelector((state) => state?.form?.inventory)?.values?.[
    "shop-state"
  ];
  const zipCode = useSelector(
    (state) => state?.form?.inventory?.values?.["zip-code"]
  );
  const errors = useSelector((state) => state?.form?.inventory?.syncErrors);
  const values = useSelector((state) => state?.form?.inventory?.values);
  const formSubmitHandler = async () => {
    setIsLoading(true);
    const address = {
      street: values.address,
      city: values.shopcity,
      state: states?.find((state) => state?.value === values["shop-state"])
        ?.label,
      zip_code: values["zip-code"],
      apartment: values.apt,
    };
    try {
      await dispatch(
        editBusinessDetails(
          user && user.shop,
          values.shop,
          values.email,
          values["phone-number"],
          parseInt(delivery),
          parseFloat(labor),
          parseFloat(tax),
          values.country,
          ownStrings,
          address,
          isPercentage
        )
      );
      setIsLoading(false);
      setCurrentScreen("proshop");
    } catch (err) {
      setIsLoading(false);
      if (!window.navigator.onLine) {
        return toast.error(
          "Failed to save changes, Please check your internet!"
        );
      }
    }
  };
  return (
    <>
      <div className="edit">
        <div className="edit__heading">
          <Heading>Edit My Pro Shop Info</Heading>
          <HeadingButton
            text="Cancel"
            onClick={() => setCurrentScreen("proshop")}
          />
        </div>

        <div className="max-w-[450px] m-[0_auto]">
          <div className="edit__services-heading">
            <Heading>{t("orderOpenedHeading")}</Heading>
          </div>
          <div className="edit__services-form">
            <CustomInput
              // type="number"
              value={delivery}
              customOnChange={(e) => {
                const value = e.target.value;
                if (isNaN(Number(value))) {
                  setDeliveryError({
                    error: "Please enter a number",
                    touched: true,
                  });
                  setDelivery(value);
                } else {
                  setDeliveryError({
                    error: "",
                    touched: true,
                  });
                  setDelivery(value);
                }
              }}
              customOnBlur={(e) => {
                if (e?.target?.value) {
                  change("delivery-days", e?.target?.value);
                } else {
                  setDeliveryError({
                    error: "This field is required!",
                    touched: true,
                  });
                }
              }}
              meta={deliveryError}
              hidePostFix
              label="Estimated delivery time (# of days)"
              name="delivery-time"
              min="0"
              autoCapitalize={false}
              inputmode="numeric"
              pattern="[0-9]*"
              title="Non-negative integral number"
            />
            <CustomCurrencyInput
              value={labor}
              label="Labor Price"
              name="labor-price"
              validate={required}
              customOnChange={(value) => {
                setLabor(value);
              }}
              change={change}
              error="This field is required!"
              required={true}
            />
          </div>
          <div className="mt-[12px] mb-[12px] text-[10px] text-[#838383] font-semibold">
            This is how much you charge for the labor of restringing a racquet.
            It will be added to the cost of strings to determine the price of a
            service order.
          </div>

          {/* <CustomCurrencyInput
            value={tax}
            label="Tax"
            name="tax"
            validate={required}
            change={change}
            error="This field is required!"
            required={true}
            customOnChange={(value) => {
              setTax(value);
            }}
            link={{
              text: `${
                isPercentage ? "Switch to dollars" : "Switch to percentage"
              }`,
              isPercentage: isPercentage,
              onClick: () => setPercentage((prevState) => !prevState),
            }}
          /> */}
          <div className="edit__service-switch flex justify-between mt-[26px]">
            <Description>{t("shopString")}</Description>
            <CustomSwitch
              handleChange={(checked) => {
                setOwnStrings(checked);
              }}
              checked={ownStrings}
            />
          </div>
          <div className="mt-[6px] text-[10px] text-[#838383] font-semibold">
            {t("editShopNewTxt")}
          </div>
          <div className="edit__contact-heading">
            <Heading>{t("ShopContactHeading")}</Heading>
          </div>
          <div className="edit__contact-form">
            <Field
              name="shop"
              label="Shop Name"
              type="text"
              validate={required}
              component={CustomInput}
            />
            <Field
              name="email"
              label="Email"
              type="email"
              validate={[required, email]}
              component={CustomInput}
            />
            <CustomPhoneInput
              change={change}
              name="phone-number"
              label="Phone Number"
              value={phoneNumber}
              validate={required}
            />
          </div>
          <div className="edit__address-heading">
            <Heading>{t("orderOpenedShopAddressHeading")}</Heading>
          </div>
          <div className="edit__address-form">
            <Field
              name="address"
              label="Street Address"
              type="text"
              validate={required}
              component={CustomInput}
            />
            <Field
              name="apt"
              label="Apt, suite, etc (optional)"
              type="email"
              component={CustomInput}
            />
            <Field
              name="country"
              label="Country"
              type="text"
              validate={required}
              component={CustomInput}
            />
            <div className="edit__address-form-city">
              <Field
                name="shopcity"
                label="Shop City"
                type="text"
                validate={required}
                component={CustomInput}
              />
              <CustomSelect
                name="shop-state"
                options={states}
                // value={values && values["shop-state"]}
                defaultValue={values && values["shop-state"]}
                label="State"
                placeholder="Select"
                validate={required}
                customOnChange={(option) => {
                  change("shop-state", option?.value);
                }}
                showInitials
              />
            </div>
            <CustomZIPInput
              name="zip-code"
              label="ZIP Code"
              change={change}
              value={zipCode}
            />
          </div>
          <div className="edit__button">
            <SubmitButton
              onClick={formSubmitHandler}
              disabled={
                errors ||
                !phoneNumber ||
                !delivery ||
                !labor ||
                !state ||
                !zipCode ||
                isLoading ||
                phoneValidation(phoneNumber) !== undefined
              }
            >
              {isLoading ? "Saving..." : t("stringDetailsSave")}
            </SubmitButton>
          </div>
        </div>
      </div>
    </>
  );
};

EditShop = reduxForm({
  // a unique name for the form
  form: "inventory",
})(EditShop);

export default withNamespaces()(EditShop);

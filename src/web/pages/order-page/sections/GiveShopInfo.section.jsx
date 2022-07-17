import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Field, reset } from "redux-form";
import { toast } from "react-toastify";
// Custom Components
import {
  Heading,
  Description,
  BackButton,
  CustomInput,
  CustomSelect,
  CustomPhoneInput,
} from "web/components";
import { StepButton } from "web/components/Buttons/StepButton.componet";

// Styles
import "./GiveShopInfo.styles.scss";
import { useDispatch } from "react-redux";
import { sendShopInquiry } from "web/store/Actions/shopActions";

// Phone Validation
const formats = "(999) 999-9999|(999)999-9999|999-999-9999|9999999999";
const r = RegExp(
  "^(" + formats.replace(/([()])/g, "\\$1").replace(/9/g, "\\d") + ")$"
);
const phoneValidation = (value) => {
  if (value?.length > 0) {
    if (r.test(value) === true) {
      if (value?.length < 9 || value?.length > 14) {
        return "Please enter value between 9 and 14 digits.";
      } else {
        return undefined;
      }
    } else {
      return "Please enter a valid phone number.";
    }
  } else {
    return undefined;
  }
};

const required = (value) => (value ? undefined : "Required");

export function GiveShopInfo({ t, setShopCurrent, setStep, change }) {
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("/states.json")
      .then((res) => res.json())
      .then((data) => setStates(data));
  }, []);

  const errors = useSelector((state) => state?.form?.signup?.syncErrors);
  const values = useSelector((state) => state?.form?.signup?.values);
  const phoneNumber = useSelector(
    (state) => state?.form?.["signup"]?.values?.["shop-phone-number"]
  );
  const state = useSelector(
    (state) => state?.form?.["signup"]?.values?.["shop-state"]
  );

  const formSubmitHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        sendShopInquiry(
          values["shop-name"],
          values["shop-city"],
          values["shop-state"],
          values["shop-phone-number"],
          values["shop-search"]
        )
      );
      setIsLoading(false);
      dispatch(reset("signup"));
      setShopCurrent("thanks");
      toast.success("Your message has been sent successfuly");
    } catch (err) {
      setIsLoading(false);
      if (window.navigator.onLine) {
        return toast.error("Failed to send message, Please try again later!");
      }
      toast.error("Failed to send message, Please check your internet!");
    }
  };

  return (
    <>
      <div className="find-shop-section">
        <div className="find-shop-section__heading">
          <BackButton onClick={() => setShopCurrent("search")} />
          <Heading customClass="phone-section__heading-text">
            {t("odrShop")}
          </Heading>
        </div>
        <div className="max-w-[450px] m-[0_auto]">
          <div className="find-shop-section__text-container">
            <Description customClass="find-shop-section__text-container-text">
              {t("odrShopText")}
            </Description>
          </div>
          <div className="find-shop-section__form-container">
            <Field
              name="shop-name"
              label="Shop Name"
              type="text"
              component={CustomInput}
              validate={required}
            />
            <div className="grid grid-cols-[2fr_1fr] items-center gap-[10px]">
              <Field
                name="shop-city"
                label="Shop City"
                type="text"
                component={CustomInput}
                validate={required}
              />
              <CustomSelect
                name="shop-state"
                options={states}
                label="State"
                placeholder="Select"
                customOnChange={(option) => {
                  change("shop-state", option?.value);
                }}
                showInitials
              />
            </div>
            <CustomPhoneInput
              change={change}
              name="shop-phone-number"
              label="Your Phone Number (Optional)"
              value={phoneNumber}
              optional
            />
          </div>
          <Description customClass="find-shop-section__form-text">
            {t("odrMsg")}
          </Description>
          <div className="find-shop-section__button mt-[50px]">
            <StepButton
              className="find-shop-section__button-btn"
              disabled={
                errors ||
                !state ||
                phoneValidation(phoneNumber) !== undefined ||
                isLoading
              }
              onClick={formSubmitHandler}
            >
              {isLoading ? "Submitting..." : "Submit Form"}
            </StepButton>
          </div>
        </div>
      </div>
    </>
  );
}

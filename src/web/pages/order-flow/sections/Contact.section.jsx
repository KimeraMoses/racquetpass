import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
// Custom Components
import {
  Heading,
  Description,
  CustomInput,
  CustomPhoneInput,
} from "web/components";
import { useNavigate } from "react-router-dom";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { withNamespaces } from "react-i18next";
// Styles
import "./Contact.styles.scss";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";
import { useDispatch } from "react-redux";
import {
  getOrderContact,
  setBackFromPreview,
} from "web/store/Slices/shopSlice";
import { useEffect } from "react";
import { useState } from "react";
import { sendVerificationCode } from "web/store/Actions/shopActions";

const required = (value) => (value ? undefined : "Required");

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

function Contact({ t, change, error }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isNew, setIsNew] = useState(false);
  const backFromReview = useSelector((state) => state?.shop?.backFromPreview);
  const phoneNumber = useSelector(
    (state) => state?.form?.contacts?.values?.["phone-number"]
  );
  const values = useSelector((state) => state?.form?.contacts?.values);
  const userContacts = useSelector((state) => state?.shop?.contacts);
  const hasContacts = !!useSelector(
    (state) => state?.shop?.contacts["first-name"]
  );

  let isVerifiedObj = JSON.parse(localStorage.getItem("_rpe_"));
  const order = JSON.parse(localStorage.getItem("_rapo_"));

  useEffect(() => {
    if (userContacts && Object.keys(userContacts)?.length !== 0) {
      change("first-name", userContacts && userContacts["first-name"]);
      change("last-name", userContacts && userContacts["last-name"]);
      change("phone-number", userContacts && userContacts["phone-number"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContacts]);

  useEffect(() => {
    //LOADING STORED STATE
    if (order?.contact && Object.keys(order?.contact).length !== 0) {
      const contactValues = {
        "first-name": order?.contact["first-name"],
        "last-name": order?.contact["last-name"],
        "phone-number": order?.contact["phone-number"],
      };

      dispatch(getOrderContact(contactValues));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendCodeVericationHandler = async () => {
    setIsLoading(true);
    const newValues = {
      "first-name": values["first-name"],
      "last-name": values["last-name"],
      "phone-number": values["phone-number"],
    };
    const orderState = {
      ...order,
      contact: newValues,
    };
    localStorage.setItem("_rapo_", JSON.stringify(orderState));
    if (backFromReview && phoneNumber === userContacts["phone-number"]) {
      dispatch(setBackFromPreview(false));
      dispatch(getOrderContact(newValues));
      navigate("/order-flow/review");
      return setIsLoading(false);
    }
    if (isVerifiedObj?.e === values["phone-number"] && isVerifiedObj?.isV) {
      dispatch(getOrderContact(newValues));
      navigate("/order-flow/review");
      return setIsLoading(false);
    } else {
      try {
        await dispatch(
          sendVerificationCode(values["phone-number"], navigate, newValues)
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (
      backFromReview &&
      phoneNumber !== userContacts["phone-number"] &&
      phoneNumber?.length === 14
    ) {
      setIsNew(true);
    } else {
      setIsNew(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, userContacts]);

  return (
    <div>
      <div className="contact-section-odr max-w-[450px] m-[0_auto]">
        <div className="contact-section-odr__heading">
          <BackButton
            onClick={() => {
              if (backFromReview) {
                navigate("/order-flow/review");
                dispatch(setBackFromPreview(false));
              } else {
                navigate("/order-flow/strings");
              }
            }}
          />
          <Heading customClass="contact-section-odr__heading-text">
            {backFromReview ? "Edit Contact Info" : t("odrStayHeading")}
          </Heading>
        </div>
        {backFromReview ? (
          <></>
        ) : (
          <div className="contact-section-odr__text-container">
            <Description customClass="contact-section-odr__text-container-text">
              {t("odrStayDesc")}
            </Description>
          </div>
        )}
        <div className="contact-section-odr__form-container">
          <Field
            name="first-name"
            label="First Name"
            type="text"
            validate={required}
            component={CustomInput}
          />
          <Field
            name="last-name"
            label="Last Name"
            type="text"
            validate={required}
            component={CustomInput}
          />
          <CustomPhoneInput
            change={change}
            name="phone-number"
            label="Phone Number"
            value={phoneNumber}
          />
          <Description>{t("selectStringContact")}</Description>
        </div>
      </div>
      <div className="order-page__button-container max-w-[450px] w-full mr-[auto] ml-[auto] mb-4">
        <SubmitButton
          disabled={
            (values && !values["first-name"]) ||
            (values && !values["last-name"]) ||
            (values && !values["phone-number"]) ||
            phoneValidation(values && values["phone-number"]) !== undefined
          }
          onClick={sendCodeVericationHandler}
          // onClick={() => {
          //   console.log(values);
          //   dispatch(
          //     getOrderContact({
          //       "first-name": values["first-name"],
          //       "last-name": values["last-name"],
          //       "phone-number": values["phone-number"],
          //     })
          //   );
          //   if (backFromReview) {
          //     if (phoneNumber !== userContacts["phone-number"]) {
          //       return navigate("/order-flow/verify");
          //     }
          //     navigate("/order-flow/review");
          //     dispatch(setBackFromPreview(false));
          //   } else {
          //     navigate("/order-flow/verify");
          //   }
          // }}
        >
          {isLoading
            ? "Sending Code..."
            : backFromReview
            ? "Save Changes"
            : "Verify"}
        </SubmitButton>
      </div>
      {isNew && (
        <div className="changed-number-alert max-w-[450px] w-full mr-[auto] ml-[auto] mt-4">
          <Description>
            Since you changed your phone number, you'll be asked to verify it
            again
          </Description>
        </div>
      )}
    </div>
  );
}
Contact = reduxForm({
  form: "contacts",
})(Contact);

export default withNamespaces()(Contact);

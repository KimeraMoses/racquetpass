import { useEffect, useRef, useState } from "react";
import { withNamespaces } from "react-i18next";
import { reduxForm } from "redux-form";
import { useNavigate } from "react-router-dom";
import { StepButton, Progress } from "web/components";
import {
  ScanSection,
  ScanNotFound,
  ScanSuccess,
  SelectShop,
  ShopSearchResults,
  GiveShopInfo,
  Thanks,
  Contact,
  VerifyPhone,
  SelectString,
  BrandSearchResults,
  SelectStringWithMainCross,
  ReviewOrder,
  Done,
  OrderDetails,
  EditRacquet,
  DidntGetText,
} from "./sections";

import {
  createNewRacquet,
  editRacquetDetails,
} from "../../store/Actions/racquetActions";

import "./order.styles.scss";
import { useSelector } from "react-redux";
import { VerifyResend } from "./sections/VerifyResend.section";
import Recaptcha from "web/components/Google-Recaptcha/Recaptcha";
import { useDispatch } from "react-redux";
import {
  codeVerification,
  createOrder,
  sendVerificationCode,
} from "web/store/Actions/shopActions";
// import { toast } from "react-toastify";

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
    return "Please enter a valid phone number.";
  }
};

let OrderPage = ({ t, handleSubmit, change }) => {
  const refRecaptcha = useRef(null);
  const [step, setStep] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [steps, setSteps] = useState({
    active: "",
    content: ["QR", "Strings", "Contact", "Review"],
  });
  const [shop, setShop] = useState({ current: "search" });
  const [scan, setScan] = useState({ current: "initial" });
  const [strings, setStrings] = useState({ current: "initial" });
  const [mainCross, setMainCross] = useState({ current: "initial" });
  const [main, setMain] = useState(false);
  const [cross, setCross] = useState(false);
  const [done, setDone] = useState(false);
  const [backFromReview, setBackFromReview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const racquet = useSelector((state) => state.racquet?.racquet);
  const hasRaquet = !!useSelector((state) => state.racquet?.racquet?.id);

  const errors = useSelector((state) => state?.form?.signup?.syncErrors);
  const values = useSelector((state) => state?.form?.signup?.values);

  const NewRacquetHandler = async () => {
    setIsLoading(true);
    let mainObj = {};
    let crossObj = {};

    if (step === 2) {
      mainObj = {
        string_id: values?.brand?.string_id,
        tension: values?.brand?.tension,
      };
      crossObj = {
        string_id: values?.brand?.string_id,
        tension: values?.brand?.tension,
      };
    } else {
      mainObj = {
        string_id: values?.main?.string_id,
        tension: values?.main?.tension,
      };
      crossObj = {
        string_id: values?.cross?.string_id,
        tension: values?.cross?.tension,
      };
    }

    const data = {
      qr_code: values["raquet-details-from-qr"],
      brand: values?.racquetBrand,
      model: values?.racquetModel,
      image_url: values?.racquetImage ? values?.racquetImage : "",
      mains: mainObj,
      crosses: crossObj,
      sport: values?.racquetSport,
      owner: values?.ownerName,
    };
    try {
      await dispatch(
        hasRaquet
          ? editRacquetDetails(data, racquet && racquet?.id)
          : createNewRacquet(data)
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  let isVerifiedObj = JSON.parse(localStorage.getItem("_rpe_"));

  const sendCodeVericationHandler = async () => {
    //Logic for sending code here
    setIsLoading(true);
    if (isVerifiedObj?.e === values?.email && isVerifiedObj?.isV) {
      setIsLoading(false);
      return setIsVerified(true);
    } else {
      try {
        await dispatch(sendVerificationCode(values.email));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const codeverificationHandler = async () => {
    //Logic for verifying code here
    setIsLoading(true);
    if (isVerifiedObj?.email === values?.email && isVerifiedObj?.isV) {
      setIsLoading(false);
      return setIsVerified(true);
    } else {
      try {
        await dispatch(
          codeVerification(+values["verification-code"], values?.email)
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    goToTop();
  }, [step, strings, mainCross, done, scan, shop]);

  useEffect(() => {
    switch (step) {
      case 1:
        setSteps((s) => {
          return { ...s, active: "QR" };
        });
        break;
      case 2:
        setSteps((s) => {
          return { ...s, active: "Strings" };
        });
        break;
      case 3:
        setSteps((s) => {
          return { ...s, active: "Strings" };
        });
        break;
      case 4:
        setSteps((s) => {
          return { ...s, active: "Contact" };
        });
        break;
      case 5:
        setSteps((s) => {
          return { ...s, active: "Contact" };
        });
        break;
      case 6:
        setSteps((s) => {
          return { ...s, active: "Review" };
        });
        break;
      case 7:
        setSteps((s) => {
          return { ...s, active: "Review" };
        });
        break;
      default:
        setSteps((steps) => steps);
    }
  }, [step]);

  // Function to move search forward
  const scanForward = (scan) => {
    if (scan) {
      setScan({ current: "found" });
    } else {
      setScan({ current: "notFound" });
    }
  };

  const setShopCurrent = (current) => {
    if (current) {
      setShop({ current });
    }
  };

  const setStringsCurrent = (current) => {
    if (current) {
      setStrings({ current });
    }
  };

  const forward = () => {
    if (step === 2) {
      setStep(4);
    } else {
      setStep((step) => step + 1);
    }
  };

  const backward = () => {
    if (step === 1 && scan.current !== "initial") {
      setScan({ current: "initial" });
    } else if (step === 0) {
      navigate("/");
    } else {
      setStep((step) => step - 1);
    }
  };

  const getCurrentScanScreen = () => {
    switch (scan.current) {
      case "initial":
        return (
          <ScanSection
            t={t}
            change={change}
            scanForward={scanForward}
            backward={backward}
            setStep={setStep}
            backFromReview={backFromReview}
            setBackFromReview={setBackFromReview}
          />
        );
      case "found":
        return (
          <ScanSuccess
            t={t}
            change={change}
            backward={backward}
            setStep={setStep}
            backFromReview={backFromReview}
            setBackFromReview={setBackFromReview}
          />
        );
      case "notFound":
        return (
          <ScanNotFound
            t={t}
            backward={backward}
            setStep={setStep}
            backFromReview={backFromReview}
            setBackFromReview={setBackFromReview}
          />
        );
      default:
        return <>Check current scan</>;
    }
  };

  const getCurrentShopScreen = () => {
    switch (shop.current) {
      case "initial":
        return (
          <SelectShop
            t={t}
            setShopCurrent={setShopCurrent}
            backward={backward}
          />
        );
      case "search":
        return (
          <ShopSearchResults
            t={t}
            setShopCurrent={setShopCurrent}
            setStep={setStep}
            backFromReview={backFromReview}
            forward={forward}
            change={change}
            setBackFromReview={setBackFromReview}
          />
        );
      case "find":
        return (
          <GiveShopInfo
            t={t}
            setShopCurrent={setShopCurrent}
            setStep={setStep}
            change={change}
          />
        );
      case "thanks":
        return <Thanks />;
      default:
        return <>Check current shop</>;
    }
  };

  const getCurrentStringsScreen = () => {
    switch (strings.current) {
      case "initial":
        return (
          <SelectString
            t={t}
            setStringsCurrent={setStringsCurrent}
            backward={backward}
            setStep={setStep}
            step={step}
            change={change}
            backFromReview={backFromReview}
            setBackFromReview={setBackFromReview}
          />
        );
      case "search":
        return (
          <BrandSearchResults
            t={t}
            main={main}
            cross={cross}
            setStringsCurrent={setStringsCurrent}
            change={change}
            strings={strings}
            mainCross={mainCross}
            setMainCross={setMainCross}
          />
        );
      default:
        return <>Check current string</>;
    }
  };
  const getCurrentMainCross = () => {
    switch (mainCross.current) {
      case "initial":
        return (
          <SelectStringWithMainCross
            t={t}
            backward={backward}
            setStep={setStep}
            setMainCross={setMainCross}
            setMain={setMain}
            setCross={setCross}
            step={step}
            change={change}
            backFromReview={backFromReview}
            setBackFromReview={setBackFromReview}
          />
        );
      case "search":
        return (
          <BrandSearchResults
            t={t}
            main={main}
            cross={cross}
            setStringsCurrent={setStringsCurrent}
            change={change}
            strings={strings}
            mainCross={mainCross}
            setMainCross={setMainCross}
          />
        );
      default:
        return <>Check current main cross</>;
    }
  };

  const getActiveSection = () => {
    switch (step) {
      case 0:
        return getCurrentShopScreen();
      case 1:
        return getCurrentScanScreen();
      case 2:
        return getCurrentStringsScreen();
      case 3:
        return getCurrentMainCross();
      case 4:
        return (
          <Contact
            t={t}
            backward={backward}
            change={change}
            setStep={setStep}
            setBackFromReview={setBackFromReview}
            backFromReview={backFromReview}
          />
        );
      case 5:
        return (
          <VerifyPhone
            t={t}
            backward={backward}
            change={change}
            setStep={setStep}
          />
        );
      case 6:
        return (
          <ReviewOrder
            t={t}
            setBackFromReview={setBackFromReview}
            backward={backward}
            setStep={setStep}
            setDone={setDone}
          />
        );
      case 7:
        return <Done t={t} setStep={setStep} setDone={setDone} />;
      case 8:
        return <OrderDetails t={t} setStep={setStep} setDone={setDone} />;
      case 9:
        return (
          <DidntGetText
            t={t}
            backward={backward}
            change={change}
            setStep={setStep}
            setBackFromReview={setBackFromReview}
            backFromReview={setBackFromReview}
          />
        );
      case 10:
        return <VerifyResend t={t} setStep={setStep} change={change} />;
      case 20:
        return <EditRacquet t={t} setStep={setStep} change={change} />;
      default:
        return <>Undetected Step</>;
    }
  };
  console.log("current step", step);
  console.log("has value", !!values?.brand?.string_id);

  return (
    <>
      {step === 7 ||
      step === 0 ||
      step === 8 ||
      step === 9 ||
      step === 20 ||
      done ||
      mainCross.current === "search" ||
      strings.current === "search" ||
      backFromReview ? (
        <></>
      ) : (
        <Progress steps={steps} />
      )}
      <div
        className={`order-page ${done ? "order-page-done" : ""} ${
          step === 0 ? "order-page-zero" : ""
        }`}
      >
        <form onSubmit={handleSubmit} className="order-page__form">
          <div>{getActiveSection()}</div>
          {done ||
          shop.current === "find" ||
          shop.current === "thanks" ||
          mainCross.current === "search" ||
          strings.current === "search" ||
          step === 6 ||
          step === 0 ||
          (step === 1 && scan.current === "initial") ||
          step === 8 ? (
            <></>
          ) : (
            <div className="order-page__button-container max-w-[450px] w-full mr-[auto] ml-[auto]">
              <StepButton
                onClick={() => {
                  if (step === 2 || step === 3) {
                    NewRacquetHandler();
                  }
                  if (step === 4) {
                    sendCodeVericationHandler();
                  }
                  if (step === 5) {
                    codeverificationHandler();
                  }
                  if (backFromReview) {
                    setStep(6);
                    setBackFromReview(false);
                  } else {
                    if (!isLoading) forward();
                  }
                }}
                disabled={
                  step === 0 ||
                  errors ||
                  (step === 2 && !values?.racquetModel) ||
                  (step === 2 && !values?.brand?.string_id) ||
                  (step === 3 && !values?.mains && !values?.cross) ||
                  (step === 4 &&
                    (!values?.["phone-number"] ||
                      phoneValidation(values?.["phone-number"]) !==
                        undefined)) ||
                  (step === 5 &&
                    (!values?.["verification-code"] ||
                      values?.["verification-code"]?.length !== 6))
                }
                type="button"
              >
                {step === 1 && backFromReview
                  ? "Change to this racquet"
                  : (step === 4 || step === 2 || step === 3) && backFromReview
                  ? "Save Changes"
                  : t("odrNext")}
              </StepButton>
            </div>
          )}
          <Recaptcha refRecaptcha={refRecaptcha} />
        </form>
      </div>
    </>
  );
};

const onSubmit = async (values, dispatch) => {
  console.log(values);
  const data = {
    racquet_id: values?.racquetId,
    shop_id: values?.shop?.shop_id,
    first_name: values["first-name"],
    last_name: values["last-name"],
    phone_number: values["phone-number"],
    email: values.email,
  };
  try {
    await dispatch(createOrder(data));
  } catch (error) {
    console.log("Failed to send order");
  }
};

OrderPage = reduxForm({
  form: "signup",
  onSubmit,
})(OrderPage);

export default withNamespaces()(OrderPage);

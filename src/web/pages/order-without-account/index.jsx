import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { reduxForm } from "redux-form";
import { StepButton, Progress } from "web/components";

import {
  RacquetFound,
  RacquetNotFound,
  SelectShop,
  Contact,
  VerifyPhone,
  ReviewOrder,
  ScanSection,
  ShopSearchResults,
  GiveShopInfo,
} from "./sections";

import "./orderWithoutAccount.styles.scss";
import { SelectString } from "./sections/SelectString.section";
import { BrandSearchResults } from "./sections/BrandSearchResults.section";
import { SelectStringWithMainCross } from "./sections/SelectStringWithMainCross.section";

let OrderWithoutAccount = ({ t, change }) => {
  const [step, setStep] = useState(0);
  const [main, setMain] = useState(false);
  const [cross, setCross] = useState(false);
  const [steps, setSteps] = useState({
    active: "",
    content: ["Shop", "Strings", "Contact", "Review"],
  });
  const [strings, setStrings] = useState({ current: "initial" });
  const [mainCross, setMainCross] = useState({ current: "initial" });

  const [racquetFound, setRacquetFound] = useState(false);

  useEffect(() => {
    switch (step) {
      case 1:
        setSteps((s) => {
          return { ...s, active: "QR" };
        });
        break;
      case 2:
        setSteps((s) => {
          return { ...s, active: "Shop" };
        });
        break;
      case 3:
        setSteps((s) => {
          return { ...s, active: "Shop" };
        });
        break;
      case 4:
        setSteps((s) => {
          return { ...s, active: "Shop" };
        });
        break;
      case 5:
        setSteps((s) => {
          return { ...s, active: "Strings" };
        });
        break;
      case 6:
        setSteps((s) => {
          return { ...s, active: "Strings" };
        });
        break;
      case 7:
        setSteps((s) => {
          return { ...s, active: "Contact" };
        });
        break;
      case 8:
        setSteps((s) => {
          return { ...s, active: "Contact" };
        });
        break;
      case 9:
        setSteps((s) => {
          return { ...s, active: "Review" };
        });
        break;
      default:
        setSteps((steps) => steps);
    }
  }, [step]);

  const setStringsCurrent = (current) => {
    if (current) {
      setStrings({ current });
    }
  };

  const getCurrentStringsScreen = () => {
    switch (strings.current) {
      case "initial":
        return (
          <SelectString
            t={t}
            setStringsCurrent={setStringsCurrent}
            setStep={setStep}
            step={step}
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
            setStep={setStep}
            setMainCross={setMainCross}
            setMain={setMain}
            setCross={setCross}
            step={step}
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

  return (
    <>
      {step === 0 || step === 1 ? <></> : <Progress steps={steps} />}
      <div
        className={`without-account ${
          step === 0 || step === 1 ? "without-account-zero" : ""
        }`}
      >
        <div className="without-account__sections">
          {step === 0 ? (
            <ScanSection
              t={t}
              setRacquetFound={setRacquetFound}
              setStep={setStep}
              change={change}
            />
          ) : (
            <></>
          )}
          {step === 1 ? (
            racquetFound ? (
              <RacquetFound t={t} setStep={setStep} />
            ) : (
              <RacquetNotFound t={t} setStep={setStep} />
            )
          ) : (
            <></>
          )}
          {step === 2 ? <SelectShop t={t} setStep={setStep} /> : <></>}
          {step === 3 ? <ShopSearchResults t={t} setStep={setStep} /> : <></>}
          {step === 4 ? <GiveShopInfo t={t} setStep={setStep} /> : <></>}
          {step === 5 ? getCurrentStringsScreen() : <></>}
          {step === 6 ? getCurrentMainCross() : <></>}
          {step === 7 ? <Contact t={t} setStep={setStep} /> : <></>}
          {step === 8 ? <VerifyPhone t={t} setStep={setStep} /> : <></>}
          {step === 9 ? <ReviewOrder t={t} setStep={setStep} /> : <></>}
        </div>
        {step === 0 ||
        step === 1 ||
        step === 3 ||
        step === 4 ||
        step === 9 ||
        strings.current === "search" ||
        mainCross.current === "search" ? (
          <></>
        ) : (
          <div className="mt-[30px]">
            {/* <StepButton
              onClick={() => {
                if (step === 0) {
                  navigate('/');
                } else {
                  setStep((step) => step - 1);
                }
              }}
              outlined
              type="button"
            >
              Back
            </StepButton> */}
            <StepButton
              onClick={() => {
                if (step === 5) {
                  setStep(7);
                } else {
                  setStep((step) => step + 1);
                }
              }}
              disabled={step === 9 || step === 0 || step === 2}
              type="button"
            >
              Next
            </StepButton>
          </div>
        )}
      </div>
    </>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

OrderWithoutAccount = reduxForm({
  // a unique name for the form
  form: "orderWithoutAccount",
  onSubmit,
})(OrderWithoutAccount);

export default withNamespaces()(OrderWithoutAccount);

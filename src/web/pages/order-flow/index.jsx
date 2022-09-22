import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { change } from "redux-form";
import { useSelector } from "react-redux";
import { Outlet, useLocation, Route, Routes } from "react-router-dom";
import { Progress } from "web/components/index";
import ScanSectionSection from "./sections/ScanSection.section";
import ScanSuccessSection from "./sections/ScanSuccess.section";
import SelectStringWithMainCrossSection from "./sections/SelectStringWithMainCross.section";
import ContactSection from "./sections/Contact.section";
import VerifyPhoneSection from "./sections/VerifyPhone.section";
import ReviewOrderSection from "./sections/ReviewOrder.section";
import Recaptcha from "web/components/Google-Recaptcha/Recaptcha";
import { useRef } from "react";

const OrderFlow = () => {
  const location = useLocation();
  const [steps, setSteps] = useState({
    active: "",
    content: ["QR", "Strings", "Contact", "Review"],
  });
  const currentPath = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const refRecaptcha = useRef(null);

  useEffect(() => {
    switch (currentPath) {
      case "scan":
        setSteps({
          ...steps,
          active: "QR",
        });
        break;
      case "scanned":
        setSteps({
          ...steps,
          active: "QR",
        });
        break;
      case "strings":
        setSteps({
          ...steps,
          active: "Strings",
        });
        break;
      case "contacts":
        setSteps({
          ...steps,
          active: "Contact",
        });
        break;
      case "verify":
        setSteps({
          ...steps,
          active: "Contact",
        });
        break;
      case "review":
        setSteps({
          ...steps,
          active: "Review",
        });
        break;

      default:
        break;
    }
  }, [currentPath]);
  return (
    <>
      <Progress steps={steps} />
      <div className={`order-page`}>
        <Routes>
          <Route path="scan" element={<ScanSectionSection />} />
          <Route path="scanned" element={<ScanSuccessSection />} />
          <Route
            path="strings"
            element={<SelectStringWithMainCrossSection />}
          />
          <Route path="contacts" element={<ContactSection />} />
          <Route path="verify" element={<VerifyPhoneSection />} />
          <Route path="review" element={<ReviewOrderSection />} />
        </Routes>
        <Outlet />
      </div>
      <Recaptcha refRecaptcha={refRecaptcha} />
    </>
  );
};

export default OrderFlow;

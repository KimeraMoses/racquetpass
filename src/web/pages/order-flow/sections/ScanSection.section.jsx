import { useEffect, useState } from "react";
import { Field, reduxForm } from "redux-form";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Link, useNavigate } from "react-router-dom";
// Custom Components
import { Heading, Description, Modal } from "web/components";
import { withNamespaces } from "react-i18next";
// Styles
import "./ScanSection.styles.scss";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";
import { useDispatch, useSelector } from "react-redux";
import { fetchRacquetDetails } from "web/store/Actions/racquetActions";
import Loader from "web/components/Loader/Loader";
import { useCookies } from "react-cookie";
import { Button } from "web/components/Buttons/Button.component";
import { setBackFromPreview } from "web/store/Slices/shopSlice";
// import Images from "../../../../../public/img/orderpage/"

function ScanSection({ t, change }) {
  const [cookies, setCookie] = useCookies(["_rpo_"]);
  const [qrCode, setQrCode] = useState("");
  const [qrScanner, setQrScanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const backFromReview = useSelector((state) => state?.shop?.backFromPreview);
  const [permissionsDenied, setPermissionsDenied] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShow = () => {
    setShowModal((prev) => {
      return !prev;
    });
  };

  const fetchRacquet = async (rac_id) => {
    if (qrCode) {
      setIsLoading(true);
      await dispatch(
        fetchRacquetDetails(rac_id, navigate, !!cookies?._rpo_ ? false : true)
      );
      navigate("/order-flow/scanned");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRacquet(qrCode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCode]);

  useEffect(() => {
    if (qrCode) {
      setCookie("_rpos_", qrCode);
      change("raquet-details-from-qr", qrCode);
    }
  }, [qrCode, change]);

  console.log(qrCode);

  return (
    <>
      <div className="scan-section max-w-[450px] m-[0_auto]">
        <div className="scan-section__heading">
          <BackButton
            onClick={() => {
              if (backFromReview) {
                dispatch(setBackFromPreview(false));
                navigate("/order-flow/scanned");
              } else {
                navigate("/");
              }
            }}
          />
          <Heading>
            {backFromReview ? "Change Racquet" : t("scanQRHeading")}
          </Heading>
        </div>
        <div className="scan-section__text-container">
          <Description customClass="scan-section__text-container-text">
            {t("scanQRText")}
          </Description>
        </div>
        <div className="scan-section__link">
          <Modal
            showModal={showModal}
            handleShow={handleShow}
            heading="Don't have a QR sticker?"
            text={
              <div className="mt-[13px]">
                <p className="text-[14px] text-[rgba(51,_51,_51,_0.8)]">
                  You can get QR stickers at any pro shop or club that uses
                  RacquetPass.
                </p>
                <p className="mt-[8px]">
                  You can attach the sticker anywhere on your racquet - a good
                  place is on the inside of the throat.
                </p>
              </div>
            }
          />
          <Link
            onClick={() => setShowModal(true)}
            to="#"
            className="scan-section__link-txt"
          >
            {t("scanQRLinkTxt")}
          </Link>
        </div>
        <div
          className="scan-section__image-container"
          onClick={() => {
            if (!qrScanner) {
              setQrScanner((qrScanner) => !qrScanner);
              setPermissionsDenied(false);
            }
          }}
        >
          {qrScanner && !permissionsDenied ? (
            <>
              <BarcodeScannerComponent
                width={500}
                height={500}
                onError={(err) => {
                  if (err.name === "NotAllowedError") {
                    setPermissionsDenied(true);
                  }
                }}
                onUpdate={(err, result) => {
                  if (result) {
                    let code = result.text;
                    if (result.text.includes("http")) {
                      const codeWord = result.text.split("/");
                      code = codeWord[codeWord?.length - 1];
                    }
                    setQrCode(code);
                    setQrScanner(false);
                  } else {
                    setQrCode("");
                  }
                }}
              />
              <Field
                name="raquet-details-from-qr"
                style={{ visibility: "hidden" }}
                component="input"
              />
            </>
          ) : (
            <>
              <div></div>
              {permissionsDenied ? (
                <div className="px-[30px] text-center text-white text-[24px] font-bold">
                  Please allow camera permissions and scan again.
                </div>
              ) : isLoading ? (
                <div className="bg-white rounded-md text-white p-5 h-2/3 flex justify-center items-center w-4/5">
                  <Loader />
                </div>
              ) : (
                <>
                  <img src={"/img/orderpage/card.png"} alt="scan" />
                </>
              )}
              <div className="scan-section__image-container-button">Scan</div>
            </>
          )}
        </div>
        <div
          className={`scan-section__description ${
            !backFromReview ? "mb-[120px]" : ""
          }`}
        >
          <Description>{t("scanQRDesc")}</Description>
        </div>
      </div>
    </>
  );
}

ScanSection = reduxForm({
  form: "order-flow-scan",
  // onSubmit,
})(ScanSection);

export default withNamespaces()(ScanSection);
